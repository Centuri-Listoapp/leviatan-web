import Image from "next/image";
import "./home.css";
import DemoRequestButton from "./components/DemoRequestButton";
import MobileNav from "./components/MobileNav";
import FeatureRadial from "./components/FeatureRadial";
import Footer from "./components/Footer";
import { RocketIcon } from "./components/icons/LandingIcons";

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
    img: "/icons/organizacion-network.png",
    title: "Organización",
    text: "Estructura equipos, proyectos y comunidades de forma simple.",
  },
  {
    img: "/icons/claridad-bulb.png",
    title: "Claridad",
    text: "Centraliza la información y toma decisiones con datos confiables.",
  },
  {
    img: "/icons/eficiencia-target.png",
    title: "Eficiencia",
    text: "Automatiza procesos y ahorra tiempo en tareas operativas.",
  },
  {
    img: "/icons/colaboracion-handshake.png",
    title: "Colaboración",
    text: "Conecta personas y fortalece la comunicación en todos los niveles.",
  },
  {
    img: "/icons/impacto-target.png",
    title: "Impacto",
    text: "Mide resultados, aprende y mejora continuamente tu gestión.",
  },
];

const teamMembers = [
  { pos: "lv-a1", img: "/team/carlos-guatemala.jpg", alt: "Carlos, Guatemala" },
  { pos: "lv-a2", img: "/team/diego-cdmx.jpg", alt: "Diego, Ciudad de México" },
  { pos: "lv-a3", img: "/team/quito-ecuador.jpg", alt: "Quito, Ecuador" },
  { pos: "lv-a4", img: "/team/santiago-chile.jpg", alt: "Santiago, Chile" },
  { pos: "lv-a5", img: "/team/buenos-aires-argentina.jpg", alt: "Buenos Aires, Argentina" },
  { pos: "lv-a6", img: "/team/valeria-puebla.jpg", alt: "Valeria, Puebla, México" },
  { pos: "lv-a7", img: "/team/bogota-colombia.jpg", alt: "Bogotá, Colombia" },
  { pos: "lv-a8", img: "/team/medellin-colombia.jpg", alt: "Medellín, Colombia" },
];

export default function Home() {
  return (
    <div className="lv-page">
      <header className="lv-header">
        <div className="lv-nav lv-container">
          <a href="#">
            <Image
              src="/logo/leviatan-logo-oficial.svg"
              alt="Leviatan"
              width={1254}
              height={1254}
              className="lv-official-logo"
              priority
            />
          </a>

          <nav className="lv-nav-links">
            <a href="#que-es">¿Qué es Leviatan?</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="lv-nav-cta">
            <DemoRequestButton className="lv-btn lv-btn-primary">
              Solicita una demo
            </DemoRequestButton>
            <MobileNav />
          </div>
        </div>
      </header>

      <main>
        <section className="lv-hero" id="que-es">
          <div className="lv-container">
            <Image
              src="/logo/leviatan-icon-only.svg"
              alt="Leviatan"
              width={875}
              height={610}
              className="lv-hero-icon"
              priority
            />

            <h1>
              Organiza personas.
              <br />
              Comprende información. <span className="lv-accent">Decide mejor.</span>
            </h1>

            <p>
              Leviatan es una plataforma tecnológica que ayuda a
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
            <Image
              src="/caos-orden.jpg"
              alt="De caos a orden"
              width={1661}
              height={651}
              sizes="(max-width: 900px) 90vw, 620px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </section>

        <section className="lv-mv-section" id="funcionalidades">
          <div className="lv-mv-eyebrow">
            <b>02</b> / EJECUCIÓN SIN FRICCIÓN
          </div>

          <div className="lv-mv-grid">
            <div className="lv-mv-col">
              <div className="lv-mv-icon-photo">
                <Image
                  src="/icons/mission-compass.png"
                  alt="Misión"
                  fill
                  sizes="86px"
                />
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
                {teamMembers.map((member) => (
                  <div key={member.pos} className={`lv-avatar ${member.pos}`}>
                    <Image src={member.img} alt={member.alt} fill sizes="140px" />
                  </div>
                ))}
                <div className="lv-avatar-center">
                  <Image
                    src="/team/leviatan-mark.png"
                    alt="Leviatan"
                    fill
                    sizes="140px"
                  />
                </div>
              </div>
              <p className="lv-team-caption">
                Coordina actividades, asigna tareas, da seguimiento y mide
                resultados en tiempo real.
              </p>
            </div>

            <div className="lv-mv-divider" />

            <div className="lv-mv-col">
              <div className="lv-mv-icon-photo">
                <Image
                  src="/icons/vision-binoculars.png"
                  alt="Visión"
                  fill
                  sizes="86px"
                />
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
            <h2>¿Qué permite hacer Leviatan?</h2>
            <FeatureRadial items={permiteHacer} />
          </div>
        </section>

        <section className="lv-benefits" id="beneficios">
          <h2>Beneficios clave</h2>
          <div className="lv-benefits-grid lv-container">
            {beneficios.map((b, i) => (
              <div key={i} className="lv-benefit">
                <div className="lv-mv-icon-photo">
                  <Image src={b.img} alt={b.title} fill sizes="70px" />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
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
                Descubre cómo Leviatan puede ayudarte a organizar, comprender
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

        <section id="contacto" className="lv-section lv-contact">
          <div className="lv-container">
            <h2 className="lv-contact-title">Agenda una reunión</h2>
            <p className="lv-contact-subtitle">
              Elige un horario que te acomode y conversemos sobre cómo
              Leviatan puede ayudarte a organizar, comprender y decidir
              mejor.
            </p>
            <div className="lv-calendar-wrap">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ09s4A_wzphs-A5Fi19S5zyNPGhurBe8UcXuJRwkPAoxIxRoN865VEp5QKjnd51mIdNrFt1nhGv?gv=true"
                style={{ border: 0 }}
                width="100%"
                height={1050}
                frameBorder={0}
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
