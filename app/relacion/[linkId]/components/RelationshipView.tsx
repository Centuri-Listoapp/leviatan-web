"use client";

import { FormEvent, useMemo, useState } from "react";
import { ClientError } from "graphql-request";
import generalService from "@/app/services/generalService";
import { RelationshipChart } from "@/app/models/relationshipChart";
import LeviatanLogo from "@/app/components/LeviatanLogo";
import LoyaltyChart, { ChartPoint } from "./LoyaltyChart";
import { LOYALTY_THRESHOLDS, STATUS_INFO, dayKey, statusFor } from "./loyalty";

const PERIODS = [
  { value: 0, label: "Toda la data" },
  { value: 12, label: "Últimos 12 meses" },
  { value: 6, label: "Últimos 6 meses" },
  { value: 3, label: "Últimos 3 meses" },
];

// Label que pone el back a las interacciones sin evento de relacionamiento.
const NO_EVENT_LABEL = "Interacción";

type View = "conversation" | "days" | "events";

const VIEWS: {
  value: View;
  label: string;
  hint: string;
  title: string;
  description: string;
  note: string;
  empty: string;
}[] = [
  {
    value: "conversation",
    label: "Toda la conversación",
    hint: "Cada interacción",
    title: "Evolución del relacionamiento",
    description: "Cada punto representa una interacción.",
    note: "El índice de cada interacción se calcula con los 5 KPI de relacionamiento.",
    empty: "interacciones",
  },
  {
    value: "days",
    label: "Días",
    hint: "Promedio por día",
    title: "Evolución del relacionamiento",
    description:
      "Cada punto representa el estado de la relación en un día de conversación.",
    note: "El índice de cada día se calcula con el promedio de los 5 KPI del día.",
    empty: "interacciones",
  },
  {
    value: "events",
    label: "Eventos",
    hint: "Casos y relacionales",
    title: "Evolución de los eventos",
    description:
      "Cada punto representa una actualización de un evento de relacionamiento.",
    note: "El índice de cada evento es el de la interacción en que se registró.",
    empty: "eventos",
  },
];

const LEGEND = [
  { ...STATUS_INFO.GREEN, range: `${LOYALTY_THRESHOLDS.green} – 100%` },
  {
    ...STATUS_INFO.YELLOW,
    range: `${LOYALTY_THRESHOLDS.yellow} – ${LOYALTY_THRESHOLDS.green - 1}%`,
  },
  { ...STATUS_INFO.RED, range: `0 – ${LOYALTY_THRESHOLDS.yellow - 1}%` },
];

const byDate = <T extends { date: string }>(items: T[], months: number) => {
  const sorted = [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  if (!months) return sorted;
  const from = new Date();
  from.setMonth(from.getMonth() - months);
  return sorted.filter((i) => new Date(i.date) >= from);
};

const groupByDay = (items: ChartPoint[]): ChartPoint[] => {
  const days = new Map<string, number[]>();
  for (const it of items) {
    const key = dayKey(it.date);
    days.set(key, [...(days.get(key) ?? []), it.loyaltyIndex]);
  }
  return [...days].map(([day, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return {
      id: day,
      date: `${day}T00:00:00Z`,
      loyaltyIndex: Math.round(avg),
      status: statusFor(avg),
      subtitle: `${values.length} ${values.length === 1 ? "interacción" : "interacciones"}`,
    };
  });
};

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
  const [view, setView] = useState<View>("conversation");

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

  const points = useMemo<ChartPoint[]>(() => {
    if (!chart) return [];
    const interactions = byDate(chart.interactions, months).map((i) => ({
      id: i.id,
      date: i.date,
      loyaltyIndex: i.loyaltyIndex,
      status: i.status,
      subtitle: i.label,
    }));
    if (view === "days") return groupByDay(interactions);
    if (view === "events")
      // Sin eventId en el back, el mismo texto de evento se toma como el mismo
      // caso. Aproximación: textos iguales de casos distintos se fusionan y un
      // caso redactado distinto por la IA queda partido.
      return interactions
        .filter((i) => i.subtitle !== NO_EVENT_LABEL)
        .map((i) => ({
          ...i,
          series: i.subtitle.trim().replace(/\s+/g, " ").toLowerCase(),
        }));
    return interactions;
  }, [chart, months, view]);

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
  const current = VIEWS.find((v) => v.value === view)!;
  const sourceCount =
    view === "events"
      ? chart.interactions.filter((i) => i.label !== NO_EVENT_LABEL).length
      : chart.interactions.length;

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

        <div className="rel-toolbar">
          <span className="rel-toolbar-label">Ver por:</span>
          <div className="rel-tabs" role="tablist">
            {VIEWS.map((v) => (
              <button
                key={v.value}
                type="button"
                role="tab"
                aria-selected={view === v.value}
                className="rel-tab"
                onClick={() => setView(v.value)}
              >
                <strong>{v.label}</strong>
                <span>{v.hint}</span>
              </button>
            ))}
          </div>
          <select
            className="rel-period"
            aria-label="Período de visualización"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rel-chart-card">
          <h3 className="rel-chart-title">{current.title}</h3>
          <p className="rel-chart-description">{current.description}</p>
          {points.length ? (
            <LoyaltyChart points={points} ariaLabel={current.title} />
          ) : (
            <p className="rel-empty">
              {sourceCount
                ? `No hay ${current.empty} en el período seleccionado.`
                : `Esta persona todavía no tiene ${current.empty} registrados.`}
            </p>
          )}
          <div className="rel-legend">
            <ul>
              {LEGEND.map((l) => (
                <li key={l.label}>
                  <i style={{ background: l.color }} />
                  <strong>{l.label}</strong>
                  <span>{l.range}</span>
                </li>
              ))}
            </ul>
            <p>{current.note}</p>
          </div>
        </div>

        <footer className="rel-footer">Cada conversación cuenta</footer>
      </section>
    </main>
  );
}
