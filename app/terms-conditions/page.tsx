import LeviatanLogo from "@/app/components/LeviatanLogo";

const CONTACT_EMAIL = "equipoleviatania@gmail.com";

export default function TermsConditions() {
  return (
    <>
      <header className="header">
        <LeviatanLogo size={30} />
      </header>
      <main>
        <div className="info-section">
          <div className="texts">
            <h1 className="info-title">Términos y Condiciones</h1>
            <p>Fecha de última actualización: 18 de julio de 2026</p>
          </div>
        </div>

        <div className="section">
          <h1 className="title-md">1. Sobre Leviatán</h1>
          <p>
            Leviatán es una plataforma tecnológica que se encuentra
            actualmente <strong>en desarrollo</strong>. Estos Términos y
            Condiciones describen las condiciones bajo las cuales podrás
            acceder y utilizar Leviatán, tanto durante sus fases de prueba
            (beta) como una vez sea lanzada de forma pública.
          </p>
          <p>
            Al registrarte, solicitar una demo o utilizar cualquier
            funcionalidad de Leviatán aceptas estos términos. Si no estás de
            acuerdo con ellos, te pedimos no utilizar la plataforma.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">2. Estado del producto</h1>
          <p>
            Leviatán es una aplicación en construcción. Esto significa que:
          </p>
          <p>
            ● Las funcionalidades descritas en este sitio pueden cambiar,
            ampliarse o eliminarse antes y después del lanzamiento oficial.
          </p>
          <p>
            ● Podemos ofrecer accesos anticipados, versiones beta o pilotos
            con disponibilidad limitada y sin garantía de continuidad.
          </p>
          <p>
            ● Es posible que existan interrupciones, errores o cambios de
            diseño mientras el producto continúa en desarrollo.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">3. Uso de la plataforma</h1>
          <p>
            Te comprometes a utilizar Leviatán de forma responsable, sin
            vulnerar la ley, los derechos de terceros ni la seguridad de la
            plataforma. Nos reservamos el derecho de suspender o cancelar el
            acceso de cualquier persona que haga un uso indebido del servicio.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">4. Datos personales</h1>
          <p>
            Para poder ofrecerte acceso a Leviatán podemos recopilar datos
            básicos de contacto (como nombre y correo electrónico) al
            solicitar una demo o registrarte. Estos datos se usan únicamente
            para gestionar tu acceso, comunicarnos contigo sobre el producto y
            mejorar la plataforma. No compartimos tus datos con terceros para
            fines distintos a los aquí descritos.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">5. Propiedad intelectual</h1>
          <p>
            El nombre Leviatán, su marca, diseño y contenidos son propiedad de
            su equipo desarrollador. No está permitido reproducir, copiar o
            distribuir estos elementos sin autorización previa.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">6. Cambios en estos términos</h1>
          <p>
            Como Leviatán está en desarrollo, estos Términos y Condiciones
            podrán actualizarse a medida que el producto evolucione. Cualquier
            cambio relevante se publicará en esta misma página.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">7. Contacto</h1>
          <p>
            Si tienes preguntas sobre estos Términos y Condiciones, escríbenos
            a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p>
            Leviatán es desarrollado por el equipo de{" "}
            <a
              href="https://www.listoapp.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listo App
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
