import Image from "next/image";
import InfoForm from "./components/InfoForm";
import generalService from "@/app/services/generalService";
import { Candidate } from "@/app/models/candidate";

export default async function Home(props: any) {
  const { id } = await props.params;
  var candidate!: Candidate;

  try {
    const res = await generalService.getCandidate(id);
    candidate = res.candidate;
  } catch (error) {
    return (
      <div className="candidate-page">
        <div className="fetch-error">
          <h1>Error</h1>
          <p>Ups ocurrio un error al obtener la información del candidato</p>
        </div>
      </div>
    );
  }

  return (
    <div className="candidate-page">
      {/* <div className="header">
        <Image
          src="/logo/leviatan-logo-oficial.svg"
          alt="Leviatan"
          width={1254}
          height={1254}
          style={{ width: "auto", height: 40 }}
        />
      </div> */}
      <main className="candidate-main">
        <div className="title-section">
          <h1 className="title-title">{candidate!.promotionalMessage}</h1>
          {/* <p className="title-text">
            Participa activamente en las campañas de tu candidato, forma parte
            de su red, encuentra las actividades y mensajes
          </p> */}
        </div>
        <div className="info-section">
          <div className="info-image">
            <Image
              className="info-img"
              src={candidate.promotionalImageUrl ?? "/profile.jpg"}
              alt="perfil"
              width={300}
              height={400}
            />
          </div>
          <div className="info-data">
            <h1 className="name">{candidate.fullName}</h1>
            <p className="text">
              Compártenos tus datos para ser parte de su red
            </p>
            <InfoForm id={id} address={candidate.address} />
          </div>
        </div>
      </main>
      <footer className="footer">
        <a href="/">
          <Image
            src="/logo/leviatan-logo-oficial.svg"
            alt="Leviatan"
            width={1254}
            height={1254}
            style={{ width: "auto", height: 40 }}
          />
        </a>
      </footer>
    </div>
  );
}
