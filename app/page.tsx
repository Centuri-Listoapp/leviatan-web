import Link from "next/link";
import "./home.css";
import LeviatanLogo from "./components/LeviatanLogo";
import LinkTermsConditions from "./components/LinkTermsConditions";
import {
  EyeIcon,
  FlagMountainIcon,
  TelescopeIcon,
  UsersIcon,
  PieChartIcon,
  BarChartIcon,
  HandshakeIcon,
  TargetIcon,
  RocketIcon,
  EnvelopeIcon,
  PhoneIcon,
  NetworkIcon,
} from "./components/icons/LandingIcons";

const DEMO_MAILTO =
  "mailto:hola@leviatan.io?subject=Solicitud%20de%20demo%20Leviat%C3%A1n";

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
    icon: NetworkIcon,
    title: "Organización",
    text: "Construye y visualiza redes humanas, equipos, iniciativas y proyectos.",
  },
  {
    icon: PieChartIcon,
    title: "Claridad",
    text: "Centraliza la información relevante y toma decisiones con datos confiables.",
  },
  {
    icon: BarChartIcon,
    title: "Eficiencia",
    text: "Mide indicadores y visualiza el progreso mediante paneles de control.",
  },
  {
    icon: HandshakeIcon,
    title: "Colaboración",
    text: "Fortalece la colaboración entre personas y facilita la comunicación.",
  },
  {
    icon: TargetIcon,
    title: "Impacto",
    text: "Genera información útil para decisiones y un impacto sostenible.",
  },
];

const networkNodes = [
  { icon: UsersIcon, top: -19, left: 111 },
  { icon: HandshakeIcon, top: 46, left: 223.6 },
  { icon: PieChartIcon, top: 176, left: 223.6 },
  { icon: BarChartIcon, top: 241, left: 111 },
  { icon: TargetIcon, top: 176, left: -1.6 },
  { icon: NetworkIcon, top: 46, left: -1.6 },
];

const chaosDots = [
  { top: "8%", left: "20%" },
  { top: "15%", left: "55%" },
  { top: "5%", left: "80%" },
  { top: "25%", left: "10%" },
  { top: "30%", left: "40%" },
  { top: "22%", left: "68%" },
  { top: "42%", left: "25%" },
  { top: "48%", left: "58%" },
  { top: "38%", left: "88%" },
  { top: "55%", left: "5%" },
  { top: "60%", left: "42%" },
  { top: "65%", left: "72%" },
  { top: "75%", left: "18%" },
  { top: "80%", left: "50%" },
  { top: "70%", left: "92%" },
  { top: "90%", left: "30%" },
  { top: "92%", left: "65%" },
  { top: "12%", left: "35%" },
  { top: "50%", left: "90%" },
  { top: "85%", left: "8%" },
];

export default function Home() {
  return (
    <div className="lv-page">
      <header className="lv-header lv-container">
        <LeviatanLogo />
        <nav className="lv-nav">
          <ul className="lv-nav-links">
            <li>
              <a href="#que-es">¿Qué es Leviatán?</a>
            </li>
            <li>
              <a href="#funcionalidades">Funcionalidades</a>
            </li>
            <li>
              <a href="#beneficios">Beneficios</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
          <div className="lv-header-actions">
            <Link href="/login" className="lv-login-link">
              Iniciar sesión
            </Link>
            <a className="lv-btn lv-btn-primary" href={DEMO_MAILTO}>
              Solicita una demo
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="lv-hero lv-container">
          <EyeIcon size={48} className="lv-hero-icon" />
          <h1>
            Leviatán, organiza personas.
            <br />
            Comprende información. <span className="lv-hero-highlight">Decide mejor.</span>
          </h1>
          <div className="lv-hero-sub">
            <p>
              Leviatán es una plataforma tecnológica diseñada para ayudar a
              organizaciones, equipos de trabajo, líderes, comunidades y
              causas sociales a organizar personas, comprender información,
              fortalecer relaciones y tomar mejores decisiones mediante
              herramientas digitales.
            </p>
            <p>
              Una plataforma diseñada para ayudar a los equipos a crecer,
              coordinarse y generar un impacto real.
            </p>
          </div>
          <div className="lv-hero-cta">
            <a className="lv-btn lv-btn-primary" href={DEMO_MAILTO}>
              Solicita una demo
            </a>
          </div>
        </section>

        <section id="que-es" className="lv-section lv-container">
          <div className="lv-what-grid">
            <div className="lv-what-text">
              <div className="lv-eyebrow">¿Qué es Leviatán?</div>
              <h2 className="lv-section-title">¿Qué es Leviatán?</h2>
              <p>
                Leviatán es una plataforma tecnológica diseñada para ayudar a
                organizaciones, equipos de trabajo, líderes, comunidades y
                causas sociales a organizar personas, comprender información,
                fortalecer relaciones y tomar mejores decisiones mediante
                herramientas digitales.
              </p>
              <p>
                Integra herramientas para la coordinación de equipos, análisis
                de información, seguimiento de actividades, visualización de
                redes humanas y medición del progreso, permitiendo transformar
                información dispersa en conocimiento accionable.
              </p>
              <p>
                Leviatán impulsa una gestión organizada, colaborativa y
                orientada a resultados, ofreciendo una experiencia moderna,
                escalable y fácil de adoptar para cualquier organización.
              </p>
            </div>
            <div>
              <div className="lv-quote-card">
                <span className="lv-quote-mark">&ldquo;</span>
                <p>
                  Transformar información dispersa en conocimiento accionable.
                </p>
                <div className="lv-chaos-order">
                  <div className="lv-chaos">
                    {chaosDots.map((dot, i) => (
                      <span key={i} style={{ top: dot.top, left: dot.left }} />
                    ))}
                  </div>
                  <span className="lv-chaos-order-arrow">&rarr;</span>
                  <div className="lv-order">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                </div>
                <div className="lv-chaos-order-labels">
                  <span>CAOS</span>
                  <span>ORDEN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lv-section lv-section-band">
          <div className="lv-container lv-mv-grid">
            <div className="lv-mv-col">
              <div className="lv-mv-icon">
                <FlagMountainIcon size={28} />
              </div>
              <h3>Nuestra misión</h3>
              <p>
                Democratizar el acceso a herramientas tecnológicas de alto
                nivel para que organizaciones, líderes y comunidades puedan
                coordinarse mejor, fortalecer sus relaciones y generar un
                impacto sostenible.
              </p>
            </div>

            <div>
              <div className="lv-network">
                <div className="lv-network-ring lv-network-ring--outer" />
                <div className="lv-network-ring lv-network-ring--inner" />
                <div className="lv-network-center">
                  <EyeIcon size={30} />
                </div>
                {networkNodes.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={i}
                      className="lv-network-node"
                      style={{ top: node.top, left: node.left }}
                    >
                      <Icon size={18} />
                    </div>
                  );
                })}
              </div>
              <p className="lv-network-caption">
                Coordina equipos, da seguimiento a actividades y mide el
                progreso en tiempo real.
              </p>
            </div>

            <div className="lv-mv-col">
              <div className="lv-mv-icon">
                <TelescopeIcon size={28} />
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

        <section id="funcionalidades" className="lv-section lv-container">
          <h2 className="lv-section-title lv-text-center">
            ¿Qué permite hacer Leviatán?
          </h2>
          <div className="lv-permite-grid">
            <div className="lv-orb" />
            <ul className="lv-permite-list">
              {permiteHacer.map((item, i) => (
                <li key={i}>
                  <span className="lv-permite-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="beneficios" className="lv-section lv-section-band">
          <div className="lv-container">
            <h2 className="lv-section-title lv-text-center">
              Beneficios clave
            </h2>
            <div className="lv-benefits-grid">
              {beneficios.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="lv-benefit-card">
                    <div className="lv-benefit-icon">
                      <Icon size={24} />
                    </div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lv-section lv-container">
          <div className="lv-closing">
            <p>Leviatán es más que una plataforma.</p>
            <p>
              Es un espacio donde la tecnología fortalece la organización, el
              liderazgo y la colaboración.
            </p>
          </div>
        </section>

        <section className="lv-container">
          <div className="lv-cta-banner">
            <div className="lv-cta-left">
              <div className="lv-cta-icon">
                <RocketIcon size={26} />
              </div>
              <div>
                <h3>Comienza la transición hacia el orden.</h3>
                <p>
                  Descubre cómo Leviatán puede ayudarte a organizar,
                  comprender y decidir mejor.
                </p>
              </div>
            </div>
            <div className="lv-cta-actions">
              <a className="lv-btn lv-btn-primary" href={DEMO_MAILTO}>
                Solicita una demo
              </a>
              <a className="lv-btn lv-btn-outline" href="#que-es">
                Conocer la plataforma
              </a>
            </div>
          </div>
        </section>

        <footer id="contacto" className="lv-footer">
          <div className="lv-container">
            <div className="lv-footer-grid">
              <div>
                <LeviatanLogo />
                <p className="lv-footer-tagline">
                  Tecnología, datos y estrategia al servicio de las personas.
                </p>
              </div>
              <div>
                <h4>Enlaces</h4>
                <ul className="lv-footer-links">
                  <li>
                    <a href="#que-es">¿Qué es Leviatán?</a>
                  </li>
                  <li>
                    <a href="#funcionalidades">Funcionalidades</a>
                  </li>
                  <li>
                    <a href="#beneficios">Beneficios</a>
                  </li>
                  <li>
                    <LinkTermsConditions />
                  </li>
                </ul>
              </div>
              <div>
                <h4>Contacto</h4>
                <ul className="lv-footer-links lv-footer-contact">
                  <li>
                    <EnvelopeIcon size={16} />
                    <a href={DEMO_MAILTO}>hola@leviatan.io</a>
                  </li>
                  <li>
                    <PhoneIcon size={16} />
                    <span>Próximamente</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lv-footer-bottom">
              © {new Date().getFullYear()} Leviatán. Todos los derechos
              reservados.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
