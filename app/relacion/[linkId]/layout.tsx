import type { Metadata } from "next";
import "./relacion.css";

export const metadata: Metadata = {
  title: "Leviatan - Gráfico evolutivo de la relación",
  description: "Historial de interacciones e índice de lealtad",
  robots: { index: false, follow: false },
};

export default function RelacionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="rel-root">{children}</div>;
}
