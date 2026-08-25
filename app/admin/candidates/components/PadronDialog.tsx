"use client";
import React, { useEffect, useRef, useState } from "react";
import Dialog from "@/app/components/dialog/Dialog";
import Button from "@/app/components/button/Button";
import generalService from "@/app/services/generalService";
import { Candidate } from "@/app/models/candidates_data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFileArrowDown,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

type Municipality = {
  code: string;
  name: string;
};

type PadronDialogProps = {
  open: boolean;
  candidate?: Candidate;
  onClose: () => void;
  onUploadFile: (event: any, candidate: Candidate) => void;
};

const PadronDialog = (props: PadronDialogProps) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Municipality>();
  const [downloading, setDownloading] = useState(false);
  const fileRef = useRef<any>(null);

  useEffect(() => {
    if (props.open && props.candidate) {
      setSelected(undefined);
      setSearch("");
      loadMunicipalities();
    }
  }, [props.open, props.candidate]);

  const loadMunicipalities = async () => {
    setMunicipalities(undefined);
    try {
      const [centersRes, countriesRes] = await Promise.all([
        generalService.getCandidateVotingCenters(props.candidate!.id),
        generalService.getCountries(),
      ]);
      const cityNameByCode = new Map<string, string>();
      for (const country of countriesRes.countries ?? []) {
        for (const state of country.states ?? []) {
          for (const city of state.cities ?? []) {
            cityNameByCode.set(city.code, city.name);
          }
        }
      }
      const codes = Array.from(
        new Set(
          (centersRes.candidateVotingCenters ?? [])
            .map((center) => center.address?.city)
            .filter((city): city is string => !!city),
        ),
      );
      const parsed = codes
        .map((code) => ({ code, name: cityNameByCode.get(code) ?? code }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setMunicipalities(parsed);
    } catch (error) {
      setMunicipalities([]);
      alert("Ups ocurrio un error al obtener los municipios");
    }
  };

  const download = async () => {
    setDownloading(true);
    try {
      const res = await generalService.getCandidatePadronExport(
        props.candidate!.id,
        selected?.code,
      );
      window.open(res.candidatePadronExport.url, "_blank");
    } catch (error) {
      alert("Ups ocurrio un error al obtener el padrón");
    } finally {
      setDownloading(false);
    }
  };

  const filtered = municipalities?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog
      myClass="candidates-dialog"
      open={props.open}
      onClose={() => props.onClose()}
      title="Padrón"
      width={480}
    >
      {!selected ? (
        <div>
          <p className="mb-2">Seleccione el municipio</p>
          <input
            type="text"
            placeholder="Buscar municipio..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            className="block w-full rounded-md bg-white pl-3 pr-3 pt-2 pb-2 mb-3"
            style={{ color: "black", fontSize: "14px" }}
          />
          <div
            className="flex flex-col gap-1"
            style={{ maxHeight: 320, overflowY: "auto" }}
          >
            {municipalities === undefined && <p>Cargando...</p>}
            {municipalities?.length === 0 && (
              <p>Este candidato no tiene centros de votación cargados</p>
            )}
            {municipalities &&
              municipalities.length > 0 &&
              filtered?.length === 0 && <p>Sin resultados</p>}
            {filtered?.map((item) => (
              <Button
                key={item.code}
                color="text"
                fullWidth={true}
                onClick={() => setSelected(item)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Button
            color="text"
            icon={true}
            title="Volver"
            onClick={() => setSelected(undefined)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <p className="my-3">
            <strong>Municipio:</strong> {selected.name}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button color="text" disabled={downloading} onClick={download}>
              <FontAwesomeIcon icon={faFileArrowDown} /> Descargar actual
            </Button>
            <Button color="text" onClick={() => fileRef.current?.click()}>
              <FontAwesomeIcon icon={faUpload} /> Cargar nuevo
            </Button>
          </div>
          <input
            type="file"
            ref={fileRef}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={(e) => {
              props.onUploadFile(e, props.candidate!);
              props.onClose();
            }}
          />
        </div>
      )}
    </Dialog>
  );
};

export default PadronDialog;
