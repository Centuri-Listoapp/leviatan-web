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
