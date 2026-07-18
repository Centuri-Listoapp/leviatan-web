import Link from "next/link";
import "./home.css";
import LeviatanLogo from "./components/LeviatanLogo";
import LinkTermsConditions from "./components/LinkTermsConditions";
import DemoRequestButton from "./components/DemoRequestButton";
import {
  LeviatanMarkIcon,
  MissionIcon,
  VisionIcon,
  PersonFilledIcon,
  MicIcon,
  OrgChartIcon,
  ClockIcon,
  BarsIcon,
  PeopleIcon,
  TargetIcon,
  RocketIcon,
  EnvelopeIcon,
} from "./components/icons/LandingIcons";

const CONTACT_EMAIL = "equipoleviatania@gmail.com";
const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Solicitud%20de%20demo%20Leviat%C3%A1n`;

const permiteHacer = [
  "Construir y visualizar redes humanas y equipos.",
  "Coordinar actividades y dar seguimiento al cumplimiento de objetivos.",
  "Centralizar información relevante en un solo lugar.",
  "Medir indicadores y visualizar el progreso mediante paneles de control.",
  "Fortalecer la colaboración entre personas y equipos.",
  "Organizar iniciativas, proyectos y comunidades.",
  "Facilitar la comunicación y el seguimiento de tareas.",
  "Generar información útil para una mejor toma de decisiones.",
];

const beneficios = [
  {
    icon: OrgChartIcon,
    title: "Organización",
    text: "Estructura equipos, proyectos y comunidades de forma simple.",
  },
  {
    icon: ClockIcon,
    title: "Claridad",
    text: "Centraliza la información y toma decisiones con datos confiables.",
  },
  {
    icon: BarsIcon,
    title: "Eficiencia",
    text: "Automatiza procesos y ahorra tiempo en tareas operativas.",
  },
  {
    icon: PeopleIcon,
    title: "Colaboración",
    text: "Conecta personas y fortalece la comunicación en todos los niveles.",
  },
  {
    icon: TargetIcon,
    title: "Impacto",
    text: "Mide resultados, aprende y mejora continuamente tu gestión.",
  },
];

const avatarPositions = ["lv-a1", "lv-a2", "lv-a3", "lv-a4", "lv-a5", "lv-a6", "lv-a7"];

// Deterministic PRNG so the scattered dots render identically on server and client.
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FOCAL: [number, number] = [232, 150];
const GRID_COLS = [380, 420, 460, 500, 540];
const GRID_ROWS = [20, 60, 100, 140, 180, 220, 260, 300];

const rand = mulberry32(42);
const chaosDots: [number, number, number][] = Array.from({ length: 150 }, () => {
  const x = rand() * 224;
  const taper = 150 - (x / 224) * 138;
  const y = 150 + (rand() - 0.5) * 2 * taper;
  const r = 1.3 + rand() * 1.5;
  return [x, y, r];
});

const fanLines = GRID_ROWS.map((rowY) => {
  const [fx, fy] = FOCAL;
  const tx = GRID_COLS[0];
  const cx = fx + (tx - fx) * 0.62;
  const cy = fy + (rowY - fy) * 0.18;
  return `M${fx},${fy} Q${cx},${cy} ${tx},${rowY}`;
});

export default function Home() {
  return (
    <div className="lv-page">
      <header className="lv-header">
        <div className="lv-nav lv-container">
          <a href="#">
            <LeviatanLogo size={34} />
          </a>

          <nav className="lv-nav-links">
            <a href="#que-es">¿Qué es Leviatán?</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="lv-nav-cta">
            <DemoRequestButton className="lv-btn lv-btn-primary">
              Solicita una demo
            </DemoRequestButton>
          </div>
        </div>
      </header>

      <main>
        <section className="lv-hero" id="que-es">
          <div className="lv-container">
            <LeviatanMarkIcon size={64} className="lv-hero-icon" />

            <h1>
              Leviatán, organiza personas.
              <br />
              Comprende información. <span className="lv-accent">Decide mejor.</span>
            </h1>

            <p>
              Leviatán es una plataforma tecnológica que ayuda a
              organizaciones, equipos y comunidades a{" "}
              <strong>
                transformar información dispersa en conocimiento accionable.
              </strong>
            </p>
            <p>
              Gestiona personas, actividades y datos en un solo lugar y toma
              decisiones con claridad.
            </p>

            <DemoRequestButton className="lv-btn lv-btn-primary">
              Solicita una demo
            </DemoRequestButton>
          </div>
        </section>

        <section className="lv-quote-section">
          <div className="lv-quote-block">
            <span className="lv-quote-mark">&ldquo;</span>
            <h2>
              El problema no es la data,
              <br />
              es la dispersión de la misma.
            </h2>
          </div>

          <div className="lv-diagram-wrap">
            <svg viewBox="0 0 580 320" width="100%">
              <g fill="#0F2238">
                {chaosDots.map(([cx, cy, r], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} />
                ))}
              </g>
              <g stroke="#C9D3E4" strokeWidth="1" fill="none">
                {fanLines.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              <g stroke="#F1C88A" strokeWidth="1.4">
                {GRID_ROWS.map((y) => (
                  <line key={`h-${y}`} x1={GRID_COLS[0]} y1={y} x2={GRID_COLS[GRID_COLS.length - 1]} y2={y} />
                ))}
                {GRID_COLS.map((x) => (
                  <line key={`v-${x}`} x1={x} y1={GRID_ROWS[0]} x2={x} y2={GRID_ROWS[GRID_ROWS.length - 1]} />
                ))}
              </g>
              <g fill="#E08A2E">
                {GRID_ROWS.map((cy) =>
                  GRID_COLS.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)
                )}
              </g>
            </svg>
            <div className="lv-diagram-labels">
              <span>CAOS</span>
              <span className="lv-arrow" />
              <span>ORDEN</span>
            </div>
          </div>
        </section>

        <section className="lv-mv-section" id="funcionalidades">
          <div className="lv-mv-eyebrow">
            <b>02</b> / EJECUCIÓN SIN FRICCIÓN
          </div>

          <div className="lv-mv-grid lv-container">
            <div className="lv-mv-col">
              <div className="lv-mv-icon">
                <MissionIcon size={32} />
              </div>
              <h3>Nuestra misión</h3>
              <p>
                Potenciar el acceso a herramientas tecnológicas de alto nivel
                para que organizaciones, líderes y comunidades puedan
                coordinarse mejor, fortalecer sus relaciones y generar un
                impacto sostenible.
              </p>
            </div>

            <div className="lv-mv-divider" />

            <div className="lv-mv-col">
              <div className="lv-team-ring">
                <div className="lv-ring-circle lv-ring-outer" />
                <div className="lv-ring-circle lv-ring-inner" />
                {avatarPositions.map((pos) => (
                  <div key={pos} className={`lv-avatar ${pos}`}>
                    <PersonFilledIcon size={24} />
                  </div>
                ))}
                <div className="lv-avatar-center">
                  <MicIcon size={44} />
                </div>
              </div>
              <p className="lv-team-caption">
                Coordina actividades, asigna tareas, da seguimiento y mide
                resultados en tiempo real.
              </p>
            </div>

            <div className="lv-mv-divider" />

            <div className="lv-mv-col">
              <div className="lv-mv-icon">
                <VisionIcon size={32} />
              </div>
              <h3>Nuestra visión</h3>
              <p>
                Ser la plataforma de referencia para la organización y
                coordinación de equipos y comunidades, reconocida por
                transformar datos e interacción humana en decisiones más
                inteligentes, fortaleciendo el liderazgo y la colaboración en
                cualquier contexto.
              </p>
            </div>
          </div>
        </section>

        <section className="lv-features">
          <div className="lv-container">
            <h2>¿Qué permite hacer Leviatán?</h2>
            <div className="lv-features-grid">
              <div className="lv-radial">
                <div className="lv-radial-ring lv-r1" />
                <div className="lv-radial-ring lv-r2" />
                <div className="lv-radial-ring lv-r3" />
              </div>

              <div className="lv-feature-list">
                {permiteHacer.map((item, i) => (
                  <div key={i} className="lv-feature-item">
                    <span className="lv-feature-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lv-benefits" id="beneficios">
          <h2>Beneficios clave</h2>
          <div className="lv-benefits-grid lv-container">
            {beneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="lv-benefit">
                  <div className="lv-mv-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="lv-cta-banner" id="demo">
          <div className="lv-cta-left">
            <div className="lv-cta-rocket">
              <RocketIcon size={28} />
            </div>
            <div>
              <h3>Comienza la transición hacia el orden.</h3>
              <p>
                Descubre cómo Leviatán puede ayudarte a organizar, comprender
                y decidir mejor.
              </p>
            </div>
          </div>
          <div className="lv-cta-right">
            <DemoRequestButton className="lv-btn lv-btn-primary">
              Solicita una demo
            </DemoRequestButton>
            <a href="#que-es" className="lv-btn lv-btn-outline">
              Conocer la plataforma
            </a>
          </div>
        </div>

        <footer id="contacto" className="lv-footer">
          <div className="lv-footer-grid">
            <div className="lv-footer-brand">
              <a href="#">
                <LeviatanLogo size={30} />
              </a>
              <p>Tecnología, datos y estrategia al servicio de las personas.</p>
            </div>

            <div className="lv-footer-col">
              <h4>Enlaces</h4>
              <ul>
                <li>
                  <a href="#que-es">¿Qué es Leviatán?</a>
                </li>
                <li>
                  <a href="#funcionalidades">Funcionalidades</a>
                </li>
                <li>
                  <a href="#beneficios">Beneficios</a>
                </li>
              </ul>
            </div>

            <div className="lv-footer-col">
              <h4>Contacto</h4>
              <ul className="lv-footer-contact">
                <li>
                  <EnvelopeIcon size={15} />
                  <a href={DEMO_MAILTO}>{CONTACT_EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lv-footer-bottom">
            <span>
              Copyright © {new Date().getFullYear()} | Powered by{" "}
              <a
                href="https://www.listoapp.cl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listo App
              </a>
            </span>
            <div>
              <Link href="/login">Iniciar sesión</Link>
              <LinkTermsConditions />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
