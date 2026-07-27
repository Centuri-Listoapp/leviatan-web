import Image from "next/image";
import Stores from "../components/Stores";

export default function Home() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <header className="header">
        <Image
          src="/logo/leviatan-logo-oficial.svg"
          alt="Leviatan"
          width={1254}
          height={1254}
          style={{ width: "auto", height: 40 }}
        />
      </header>
      <main>
        <div className="info-section">
          <div className="texts">
            <h1 className="info-title">
              Descarga la app para poder disfrutar de "Leviatan"
            </h1>
            <Stores openStore={true} />
          </div>
          <div className="app">
            <Image src="/app.png" alt="app" width={350} height={550} />
          </div>
        </div>
        <Stores extraClass="show-mobile" />
      </main>
    </div>
  );
}
