import Link from "next/link";
import Image from "next/image";
import "./login.css";
import LoginForm from "./loginForm";

export default function Home() {
  return (
    <div className="login-root">
      <Link href="/" className="login-back">
        &larr; Volver
      </Link>
      <div className="login-container">
        <div className="login-header">
          <Image
            src="/logo/leviatan-icon-only.svg"
            alt="Leviatan"
            width={80}
            height={56}
            className="login-logo"
          />
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-text">Accede a panel de gestión de candidatos</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
