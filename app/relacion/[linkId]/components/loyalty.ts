import { LoyaltyStatus } from "@/app/models/relationshipChart";

// Mismos umbrales que la Bitácora del Excel. Solo se usan para las franjas de
// fondo: el color de cada punto viene del `status` del back, que compara antes
// de redondear el índice.
export const LOYALTY_THRESHOLDS = { yellow: 34, green: 67 };

export const STATUS_INFO: Record<
  LoyaltyStatus,
  { label: string; hint: string; color: string }
> = {
  GREEN: { label: "Verde", hint: "Relación sólida", color: "#3f9e5a" },
  YELLOW: { label: "Amarillo", hint: "En observación", color: "#f2a81d" },
  RED: { label: "Rojo", hint: "Requiere atención", color: "#e0393e" },
};

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// "12 ene 2026", sin los "de" ni el punto de la abreviatura.
export const formatDate = (iso: string) =>
  dateFormatter
    .formatToParts(new Date(iso))
    .filter((p) => p.type !== "literal")
    .map((p) => p.value.replace(".", ""))
    .join(" ");

// Para índices que calculamos en el front (promedio por día): se compara antes
// de redondear, igual que el back.
export const statusFor = (value: number): LoyaltyStatus =>
  value >= LOYALTY_THRESHOLDS.green
    ? "GREEN"
    : value >= LOYALTY_THRESHOLDS.yellow
      ? "YELLOW"
      : "RED";

// Día calendario de la fecha en Bogotá (UTC-5, sin horario de verano), para
// que los mensajes de la noche no caigan en el día siguiente. Se devuelve como
// medianoche UTC para que `formatDate` lo muestre tal cual.
const BOGOTA_OFFSET_MS = -5 * 60 * 60 * 1000;
export const dayKey = (iso: string) =>
  new Date(new Date(iso).getTime() + BOGOTA_OFFSET_MS).toISOString().slice(0, 10);
