import Link from "next/link";
import Image from "next/image";
import LinkTermsConditions from "./LinkTermsConditions";
import { EnvelopeIcon } from "./icons/LandingIcons";

const CONTACT_EMAIL = "equipoleviatania@gmail.com";
const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Solicitud%20de%20demo%20Leviat%C3%A1n`;

const Footer = () => {
  return (
    <footer className="lv-footer">
      <div className="lv-footer-grid">
        <div className="lv-footer-brand">
          <a href="/" className="lv-logo">
            <Image
              src="/logo/leviatan-icon-white.svg"
              alt="Leviatan"
              width={43}
              height={30}
              className="lv-logo-icon"
            />
            <span className="lv-logo-text">LEVIATAN</span>
          </a>
          <p>Tecnología, datos y estrategia al servicio de las personas.</p>
        </div>

        <div className="lv-footer-col">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <a href="/#que-es">¿Qué es Leviatan?</a>
            </li>
            <li>
              <a href="/#funcionalidades">Funcionalidades</a>
            </li>
            <li>
              <a href="/#beneficios">Beneficios</a>
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
          <a href="https://www.listoapp.cl" target="_blank" rel="noopener noreferrer">
            Listo App
          </a>
        </span>
        <div>
          <Link href="/login">Iniciar sesión</Link>
          <LinkTermsConditions />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
