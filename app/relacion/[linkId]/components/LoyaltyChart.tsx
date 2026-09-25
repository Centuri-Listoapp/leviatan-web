import { RelationshipInteraction } from "@/app/models/relationshipChart";
import { LOYALTY_THRESHOLDS, STATUS_INFO, formatDate } from "./loyalty";

const STEP = 110;
const PAD = { top: 36, right: 48, bottom: 78, left: 52 };
const PLOT_HEIGHT = 300;
const TICKS = [0, 25, 50, 75, 100];
const BANDS = [
  { from: LOYALTY_THRESHOLDS.green, to: 100, color: STATUS_INFO.GREEN.color },
  {
    from: LOYALTY_THRESHOLDS.yellow,
    to: LOYALTY_THRESHOLDS.green,
    color: STATUS_INFO.YELLOW.color,
  },
  { from: 0, to: LOYALTY_THRESHOLDS.yellow, color: STATUS_INFO.RED.color },
];

export default function LoyaltyChart({
  interactions,
}: {
  interactions: RelationshipInteraction[];
}) {
  const plotWidth = Math.max(640, interactions.length * STEP);
  const width = PAD.left + plotWidth + PAD.right;
  const height = PAD.top + PLOT_HEIGHT + PAD.bottom;
  const bottom = PAD.top + PLOT_HEIGHT;

  const y = (v: number) => PAD.top + PLOT_HEIGHT * (1 - v / 100);
  const x = (i: number) =>
    interactions.length === 1
      ? PAD.left + plotWidth / 2
      : PAD.left + STEP / 2 + (i * (plotWidth - STEP)) / (interactions.length - 1);

  const line = interactions
    .map((it, i) => `${i ? "L" : "M"}${x(i)},${y(it.loyaltyIndex)}`)
    .join(" ");

  return (
    <div className="rel-chart">
      <span className="rel-chart-axis-title">Índice de lealtad</span>
      <div className="rel-chart-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label="Evolución del índice de lealtad por interacción"
        >
          {BANDS.map((b) => (
            <rect
              key={b.from}
              x={PAD.left}
              y={y(b.to)}
              width={plotWidth}
              height={y(b.from) - y(b.to)}
              fill={b.color}
              opacity={0.12}
            />
          ))}

          {TICKS.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={PAD.left + plotWidth}
                y1={y(t)}
                y2={y(t)}
                className="rel-grid"
              />
              <text
                x={PAD.left - 10}
                y={y(t)}
                className="rel-tick"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {t}%
              </text>
            </g>
          ))}

          {interactions.map((it, i) => (
            <line
              key={it.id}
              x1={x(i)}
              x2={x(i)}
              y1={y(it.loyaltyIndex)}
              y2={bottom}
              className="rel-drop"
            />
          ))}

          <path d={line} className="rel-line" />

          {interactions.map((it, i) => {
            const color = STATUS_INFO[it.status].color;
            return (
              <g key={it.id}>
                <title>{`${it.label} · ${formatDate(it.date)} · ${it.loyaltyIndex}%`}</title>
                <circle
                  cx={x(i)}
                  cy={y(it.loyaltyIndex)}
                  r={8}
                  fill={color}
                  className="rel-dot"
                />
                <text
                  x={x(i)}
                  y={y(it.loyaltyIndex) - 16}
                  className="rel-value"
                  textAnchor="middle"
                >
                  {it.loyaltyIndex}%
                </text>
                <text x={x(i)} y={bottom + 20} className="rel-date" textAnchor="middle">
                  {formatDate(it.date)}
                </text>
                <foreignObject
                  x={x(i) - STEP / 2 + 4}
                  y={bottom + 28}
                  width={STEP - 8}
                  height={PAD.bottom - 28}
                >
                  <div className="rel-point-label">{it.label}</div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
