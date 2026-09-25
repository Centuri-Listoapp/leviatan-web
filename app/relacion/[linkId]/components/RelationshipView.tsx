"use client";

import { FormEvent, useMemo, useState } from "react";
import { ClientError } from "graphql-request";
import generalService from "@/app/services/generalService";
import { RelationshipChart } from "@/app/models/relationshipChart";
import LeviatanLogo from "@/app/components/LeviatanLogo";
import LoyaltyChart from "./LoyaltyChart";
import { STATUS_INFO } from "./loyalty";

const PERIODS = [
  { value: 0, label: "Toda la data" },
  { value: 12, label: "Últimos 12 meses" },
  { value: 6, label: "Últimos 6 meses" },
  { value: 3, label: "Últimos 3 meses" },
];

const errorMessage = (error: unknown) => {
  const code =
    error instanceof ClientError
      ? error.response.errors?.[0]?.extensions?.code
      : undefined;
  if (code === "INVALID_CREDENTIALS")
    return "El ID de la grabación no corresponde a este enlace. Verifícalo en la columna ID_Elector de tu Excel.";
  if (code === "TOO_MANY_ATTEMPTS")
    return "Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.";
  return "No pudimos verificar el ID en este momento. Inténtalo de nuevo.";
};

const Brand = () => (
  <div className="rel-brand">
    <LeviatanLogo size={30} />
    <span className="rel-brand-tagline">Inteligencia social profunda</span>
  </div>
);

export default function RelationshipView({ linkId }: { linkId: string }) {
  const [recordingId, setRecordingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [chart, setChart] = useState<RelationshipChart>();
  const [months, setMonths] = useState(0);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const value = recordingId.trim();
    if (!value) return;
    setLoading(true);
    setError(undefined);
    try {
      const data = await generalService.getRelationshipChart(linkId, value);
      setChart(data.relationshipChart);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const interactions = useMemo(() => {
    if (!chart) return [];
    const sorted = [...chart.interactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    if (!months) return sorted;
    const from = new Date();
    from.setMonth(from.getMonth() - months);
    return sorted.filter((i) => new Date(i.date) >= from);
  }, [chart, months]);

  if (!chart) {
    return (
      <main className="rel-gate">
        <form className="rel-card rel-gate-card" onSubmit={onSubmit}>
          <Brand />
          <h1 className="rel-gate-title">Gráfico evolutivo de la relación</h1>
          <p className="rel-gate-text">
            Por seguridad, ingresa el ID de la grabación que aparece en tu Excel
            para ver el historial de interacciones.
          </p>
          <label className="rel-label" htmlFor="recordingId">
            ID de la grabación
          </label>
          <input
            id="recordingId"
            className="rel-input"
            value={recordingId}
            onChange={(e) => setRecordingId(e.target.value)}
            autoComplete="off"
            autoFocus
            required
          />
          {error && <p className="rel-error">{error}</p>}
          <button
            className="rel-button"
            type="submit"
            disabled={loading || !recordingId.trim()}
          >
            {loading ? "Verificando..." : "Ver gráfico"}
          </button>
        </form>
      </main>
    );
  }

  const status = chart.currentStatus && STATUS_INFO[chart.currentStatus];

  return (
    <main className="rel-main">
      <section className="rel-card">
        <header className="rel-header">
          <Brand />
          <div className="rel-heading">
            <h1>Gráfico evolutivo de la relación</h1>
            <p>Historial de interacciones</p>
          </div>
        </header>

        <div className="rel-summary">
          <div className="rel-person">
            <h2>{chart.person.fullName}</h2>
            <p>
              <span>ID: {chart.person.code}</span>
              {chart.person.votingCenterName && (
                <span>Centro de votación: {chart.person.votingCenterName}</span>
              )}
            </p>
          </div>

          <label className="rel-period">
            Período de visualización
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <div className="rel-kpis">
            <div>
              <span className="rel-kpi-label">Índice de lealtad actual</span>
              <strong className="rel-kpi-value">
                {chart.currentLoyaltyIndex ?? "—"}
                {chart.currentLoyaltyIndex !== null && "%"}
              </strong>
            </div>
            <div>
              <span className="rel-kpi-label">Estado actual</span>
              {status ? (
                <>
                  <span className="rel-status">
                    <i style={{ background: status.color }} />
                    <strong style={{ color: status.color }}>
                      {status.label}
                    </strong>
                  </span>
                  <span className="rel-kpi-hint">{status.hint}</span>
                </>
              ) : (
                <span className="rel-status">
                  <strong>Sin datos</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {interactions.length ? (
          <LoyaltyChart interactions={interactions} />
        ) : (
          <p className="rel-empty">
            {chart.interactions.length
              ? "No hay interacciones en el período seleccionado."
              : "Esta persona todavía no tiene interacciones registradas."}
          </p>
        )}

        <footer className="rel-footer">Cada conversación cuenta</footer>
      </section>
    </main>
  );
}
