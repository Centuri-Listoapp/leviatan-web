"use client";
import SimpleCard from "@/app/components/card/SimpleCard";
import {
  faAdd,
  faFile,
  faGlobe,
  faList,
  faSearch,
  faUpload,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./candidates.css";
import Button from "@/app/components/button/Button";
import InputText from "@/app/components/InputText";
import DataTable from "@/app/components/datatable/DataTable";
import { candidateColumns, locationColumns } from "./configs/table-columns";
import generalService from "@/app/services/generalService";
import { useEffect, useRef, useState } from "react";
import { Candidate } from "@/app/models/candidates_data";
import authService from "@/app/services/authService";
import SaveLocationDialog from "./components/SaveLocationDialog";
import ListLocationDialog from "./components/ListLocationDialog";
import { ExcelUtils } from "@/app/utils/excel.util";
import UploadLocationDialog from "./components/UploadLocationDialog";
import { CandidateVotingCenter } from "@/app/models/votingCenter";
import UploadCenter2Dialog from "./components/UploadCenter2Dialog";
import UploadPadronDialog from "./components/UploadPadronDialog";
import PadronDialog from "./components/PadronDialog";
import { EMPTY_LOCATION } from "./configs/constants";

export default function Home() {
  const query = useRef(undefined);
  const [candidates, setCandidates] = useState<Candidate[]>();
  const [saveLocation, setSaveLocation] = useState({
    open: false,
    data: undefined,
  });
  const [listLocation, setListLocation] = useState(false);
  const fileLocationRef = useRef<any>(undefined);
  const [uploadLocation, setUploadLocation] = useState({
    open: false,
    data: undefined,
  });
  const [votingCenters, setVotingCenters] = useState<
    CandidateVotingCenter[] | undefined
  >([]);
  const fileCenterRef = useRef<any>({});
  const [uploadCenter, setUploadCenter] = useState({
    open: false,
    data: undefined,
    candidate: undefined,
  });
  const [loadLocationTemplate, setLoadLocationTemplate] = useState(false);
  const [uploadPadron, setUploadPadron] = useState({
    open: false,
    data: undefined,
    candidate: undefined,
  });
  const [padronDialog, setPadronDialog] = useState<{
    open: boolean;
    candidate?: Candidate;
  }>({ open: false, candidate: undefined });
  const [openCenterMenuId, setOpenCenterMenuId] = useState<string | null>(
    null,
  );

  const toggleCenterMenu = (id: string) => {
    setOpenCenterMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    console.log("Home.auth", authService.loginData);
    getCandidates();
  }, []);

  const onChangeSearch = ({ target }: any) => {
    query.current = target.value;
  };

  const registerSearch = (_: any) => {
    return { onChange: onChangeSearch };
  };

  const exportCandidateVotingCenters = async (id: string) => {
    setVotingCenters(undefined);
    try {
      const res =
        await generalService.getCandidateVotingCenterImportTemplate(id);
      setVotingCenters([]);
      window.open(res.candidateVotingCenterImportTemplate.url, "_blank");
    } catch (error) {
      setVotingCenters([]);
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const getCandidates = async () => {
    setCandidates(undefined);
    try {
      const value = query.current;
      console.log("getCandidates.value:", value);
      const res = await generalService.getCandidates(query.current);
      setCandidates(res.candidates.data);
    } catch (error) {
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const downloadLocation = async () => {
    setLoadLocationTemplate(true);
    try {
      const res = await generalService.getAdminCountryLocationsTemplate();
      setLoadLocationTemplate(false);
      window.open(res.adminCountryLocationsTemplate.url, "_blank");
    } catch (error) {
      setLoadLocationTemplate(false);
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const loadLocations = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = await ExcelUtils.toJson(file);
    const columns = [
      "countryCode",
      "countryName",
      "stateCode",
      "stateName",
      "municipalityCode",
      "municipalityName",
    ];
    if (data.length == 0) {
      alert("Archivo sin datos");
      return;
    }
    console.log("columns", columns, data[0]);
    if (columns.some((item) => !data[0][item])) {
      alert("Formato inválido");
      return;
    }
    setUploadLocation({
      open: true,
      data: file as any,
    });
  };

  const loadCenters2 = async (event: any, candidate: Candidate) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = await ExcelUtils.toJson(file);
    const columns = ["country", "state", "municipality", "votingCenter"];
    if (data.length == 0) {
      alert("Archivo sin datos");
      return;
    }
    console.log("columns", columns, data[0], candidate);
    if (columns.some((item) => !data[0][item])) {
      alert("Formato inválido");
      return;
    }
    setUploadCenter({
      open: true,
      data: file as any,
      candidate: candidate as any,
    });
  };

  const loadPadron = async (event: any, candidate: Candidate) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = await ExcelUtils.toJson(file);
    const columns = ["cedula", "votingCenter"];
    if (data.length == 0) {
      alert("Archivo sin datos");
      return;
    }
    const keys = Object.keys(data[0] as object).map((key) =>
      key.toLowerCase(),
    );
    console.log("columns", columns, data[0], candidate);
    if (columns.some((item) => !keys.includes(item.toLowerCase()))) {
      alert("Formato inválido");
      return;
    }
    setUploadPadron({
      open: true,
      data: file as any,
      candidate: candidate as any,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SimpleCard>
          <div className="candidates-textlabel">
            <FontAwesomeIcon icon={faUsers} />
            <span>Total Candidatos</span>
          </div>
          <h2 className="candidates-value">{candidates?.length ?? "---"}</h2>
        </SimpleCard>
        <SimpleCard>
          <div className="candidates-textlabel">
            <FontAwesomeIcon icon={faGlobe} />
            <span>Ubicaciones Geográficas</span>
          </div>
          <p className="candidates-label">País, estado, municipio/Parroquia</p>
          <div className="flex gap-2 flex-wrap mt-4">
            <Button
              color="text"
              onClick={() => fileLocationRef.current?.click()}
            >
              <FontAwesomeIcon icon={faUpload} />
              Subir Excel
            </Button>
            <input
              type="file"
              ref={fileLocationRef}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              style={{ display: "none" }}
              onChange={loadLocations}
            />
            <Button
              color="text"
              onClick={() => downloadLocation()}
              disabled={loadLocationTemplate}
            >
              <FontAwesomeIcon icon={faUpload} />
              Plantilla
            </Button>
            <Button color="text" onClick={() => setListLocation(true)}>
              <FontAwesomeIcon icon={faList} />
              Ver listado
            </Button>
            <Button
              color="text"
              onClick={() => setSaveLocation({ open: true, data: undefined })}
            >
              <FontAwesomeIcon icon={faAdd} />
              Agregar
            </Button>
          </div>
        </SimpleCard>
      </div>
      <div className="flex gap-2 items-start my-4">
        <InputText
          myClass="candidates-input-search"
          label="Buscar candidato, correo o centro..."
          name="search"
          register={registerSearch as any}
          dark={true}
          errors={{}}
        />
        <Button
          myClass="mt-5"
          color="text"
          icon={true}
          onClick={() => getCandidates()}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
      <DataTable
        columns={candidateColumns}
        rows={candidates}
        customColumns={{
          actions: (item) => {
            const isCenterOpen = openCenterMenuId === item.id;
            return (
              <div className="flex gap-1 flex-wrap items-center">
                <Button color="text" onClick={() => toggleCenterMenu(item.id)}>
                  Centro de votación
                </Button>
                {isCenterOpen && (
                  <>
                    <Button
                      color="text"
                      icon={true}
                      title="Descargar centros de votación"
                      onClick={() => exportCandidateVotingCenters(item.id)}
                      disabled={!votingCenters}
                    >
                      <FontAwesomeIcon icon={faFile} />
                    </Button>
                    <Button
                      color="text"
                      icon={true}
                      title="Subir centros de votación"
                      disabled={!votingCenters}
                      onClick={() => fileCenterRef.current?.[item.id]?.click()}
                    >
                      <FontAwesomeIcon icon={faUpload} />
                    </Button>
                  </>
                )}
                <Button
                  color="text"
                  onClick={() => setPadronDialog({ open: true, candidate: item })}
                >
                  Padrón
                </Button>
                <input
                  type="file"
                  ref={(el) => (fileCenterRef.current[item.id] = el) as any}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  style={{ display: "none" }}
                  onChange={(e) => loadCenters2(e, item)}
                />
              </div>
            );
          },
        }}
      />
      <SaveLocationDialog
        open={saveLocation.open}
        data={saveLocation.data}
        onClose={() => setSaveLocation({ ...saveLocation, open: false })}
      />
      <ListLocationDialog
        open={listLocation}
        onClose={() => setListLocation(false)}
        onEdit={(value) => {
          setSaveLocation({ open: true, data: value });
        }}
      />
      <UploadLocationDialog
        open={uploadLocation.open}
        data={uploadLocation.data}
        onClose={() => setUploadLocation({ ...saveLocation, open: false })}
      />
      <UploadCenter2Dialog
        open={uploadCenter.open}
        data={uploadCenter.data}
        candidate={uploadCenter.candidate}
        onClose={() => setUploadCenter({ ...uploadCenter, open: false })}
      />
      <UploadPadronDialog
        open={uploadPadron.open}
        data={uploadPadron.data}
        candidate={uploadPadron.candidate}
        onClose={() => setUploadPadron({ ...uploadPadron, open: false })}
      />
      <PadronDialog
        open={padronDialog.open}
        candidate={padronDialog.candidate}
        onClose={() => setPadronDialog({ open: false, candidate: undefined })}
        onUploadFile={loadPadron}
      />
    </>
  );
}
