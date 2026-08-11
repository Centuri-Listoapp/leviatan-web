import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import "../home.css";
import "./policy.css";

const CONTACT_EMAIL = "info@leviatania.com";

export default function PrivacyPolicy() {
  return (
    <div className="tc-page">
      <header className="header">
        <Image
          src="/logo/leviatan-logo-oficial.svg"
          alt="Leviatan"
          width={1254}
          height={1254}
          style={{ width: "auto", height: 54 }}
        />
        <Link href="/" className="tc-back">
          &larr; Volver
        </Link>
      </header>
      <main>
        <div className="info-section">
          <div className="texts">
            <h1 className="info-title">Política de Privacidad</h1>
            <p>Fecha de última actualización: 11 de agosto de 2026</p>
          </div>
        </div>

        <div className="section">
          <h1 className="title-md">1. Introducción</h1>
          <p>
            Esta Política de Privacidad describe cómo Leviatan (&quot;nosotros&quot;,
            &quot;nuestro&quot; o &quot;la plataforma&quot;) recopila, utiliza, almacena y
            protege los datos personales de las personas que interactúan con
            nuestro sitio web y aplicación, ya sea como visitantes, personas
            que se registran en la red de un candidato o usuarios
            administradores de la plataforma. Al utilizar Leviatan aceptas las
            prácticas descritas en este documento.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">2. Responsable del tratamiento</h1>
          <p>
            Leviatan es desarrollado y operado por el equipo de{" "}
            <a
              href="https://www.listoapp.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listo App
            </a>
            . Para cualquier consulta relacionada con el tratamiento de tus
            datos personales puedes escribirnos a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">3. Datos que recopilamos</h1>
          <p>Dependiendo de cómo interactúes con Leviatan, podemos recopilar:</p>
          <ul>
            <li>
              <strong>Datos de contacto:</strong> nombre completo, número de
              teléfono y correo electrónico, cuando te registras en la red de
              un candidato o solicitas una demo.
            </li>
            <li>
              <strong>Datos de ubicación declarada:</strong> estado/región,
              ciudad, centro de votación y circunscripción, cuando los
              ingresas voluntariamente para asociarte a un candidato o
              campaña.
            </li>
            <li>
              <strong>Datos de cuenta:</strong> correo electrónico y
              contraseña (almacenada de forma cifrada), para usuarios
              administradores que acceden al panel de gestión.
            </li>
            <li>
              <strong>Datos técnicos y de uso:</strong> tipo de dispositivo,
              sistema operativo, dirección IP y datos de navegación,
              recopilados automáticamente para el funcionamiento y seguridad
              de la plataforma.
            </li>
          </ul>
          <p>
            No recopilamos categorías especiales de datos (como datos de
            salud, biométricos o financieros) a través de Leviatan.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">4. Cómo usamos tus datos</h1>
          <p>Utilizamos los datos recopilados para:</p>
          <ul>
            <li>
              Registrarte en la red de contactos del candidato o campaña que
              elegiste.
            </li>
            <li>
              Permitir el acceso y funcionamiento del panel administrativo.
            </li>
            <li>Responder consultas y solicitudes de demo o soporte.</li>
            <li>
              Mejorar la seguridad, estabilidad y funcionamiento de la
              plataforma.
            </li>
            <li>
              Cumplir con obligaciones legales aplicables cuando corresponda.
            </li>
          </ul>
        </div>

        <div className="section">
          <h1 className="title-md">5. Con quién compartimos tus datos</h1>
          <p>
            Los datos que ingresas al registrarte en la red de un candidato
            son compartidos con dicho candidato o su equipo de campaña, ya
            que es el propósito principal del registro. No vendemos tus datos
            personales a terceros.
          </p>
          <p>
            Podemos compartir datos con proveedores de infraestructura y
            servicios tecnológicos (por ejemplo, hosting y bases de datos)
            que nos ayudan a operar la plataforma, siempre bajo obligaciones
            de confidencialidad y únicamente en la medida necesaria para
            prestar el servicio.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">6. Seguridad de los datos</h1>
          <p>
            Implementamos medidas técnicas y organizativas razonables (como
            el cifrado de contraseñas y conexiones seguras) para proteger tus
            datos personales frente a accesos no autorizados, pérdida o mal
            uso. Sin embargo, ningún sistema es completamente infalible, por
            lo que no podemos garantizar seguridad absoluta.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">7. Conservación de los datos</h1>
          <p>
            Conservamos tus datos personales durante el tiempo necesario para
            cumplir con los fines descritos en esta política, o hasta que
            solicites su eliminación, salvo que exista una obligación legal
            que nos exija conservarlos por un período mayor.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">8. Tus derechos</h1>
          <p>
            Puedes solicitar en cualquier momento el acceso, rectificación o
            eliminación de tus datos personales, así como oponerte a su
            tratamiento, escribiéndonos a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Responderemos
            tu solicitud dentro de un plazo razonable.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">9. Privacidad de menores</h1>
          <p>
            Leviatan no está dirigido a menores de edad y no recopilamos
            conscientemente datos personales de menores. Si tienes
            conocimiento de que un menor nos ha proporcionado datos
            personales, contáctanos para eliminarlos.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">10. Cookies y tecnologías similares</h1>
          <p>
            Nuestro sitio web puede utilizar cookies o tecnologías similares
            para su correcto funcionamiento y para entender cómo se utiliza
            la plataforma. Puedes configurar tu navegador para rechazar
            cookies, aunque esto podría afectar algunas funcionalidades.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">11. Cambios en esta política</h1>
          <p>
            Como Leviatan está en desarrollo, esta Política de Privacidad
            podrá actualizarse a medida que el producto evolucione. Cualquier
            cambio relevante se publicará en esta misma página junto con la
            fecha de última actualización.
          </p>
        </div>

        <div className="section">
          <h1 className="title-md">12. Contacto</h1>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad o sobre el
            tratamiento de tus datos personales, escríbenos a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
