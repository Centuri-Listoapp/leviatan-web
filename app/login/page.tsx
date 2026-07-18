import "./login.css";
import LoginForm from "./loginForm";
import LeviatanLogo from "@/app/components/LeviatanLogo";

export default function Home() {
  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-header">
          <LeviatanLogo size={28} className="login-logo" />
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-text">Accede a panel de gestión de candidatos</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
