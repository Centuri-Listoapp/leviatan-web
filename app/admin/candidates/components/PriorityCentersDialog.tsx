"use client";
import React, { useEffect, useRef, useState } from "react";
import Dialog from "@/app/components/dialog/Dialog";
import Button from "@/app/components/button/Button";
import DataTable from "@/app/components/datatable/DataTable";
import generalService from "@/app/services/generalService";
import { Candidate } from "@/app/models/candidates_data";
import { ImportCandidatePriorityVotingCenters } from "@/app/models/votingCenter";
import { importPriorityCentersColumns } from "../configs/table-columns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faUpload } from "@fortawesome/free-solid-svg-icons";

type PriorityCentersDialogProps = {
  open: boolean;
  candidate?: Candidate;
  onClose: () => void;
};

const IMPORT_ERRORS: Record<string, string> = {
  PRIORITY_IMPORT_INVALID_FILE: "El archivo no es un Excel (.xlsx) válido",
  PRIORITY_IMPORT_INVALID_WORKBOOK:
    "Formato inválido: falta la columna votingCenter. Use la plantilla",
  PRIORITY_IMPORT_TOO_MANY_ROWS: "El archivo supera el máximo de 5000 filas",
};

const PriorityCentersDialog = (props: PriorityCentersDialogProps) => {
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ImportCandidatePriorityVotingCenters>();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.open) setResult(undefined);
  }, [props.open, props.candidate]);

  const download = async () => {
    setDownloading(true);
    try {
      const res =
        await generalService.getCandidatePriorityVotingCenterImportTemplate(
          props.candidate!.id,
        );
      window.open(
        res.candidatePriorityVotingCenterImportTemplate.url,
        "_blank",
      );
    } catch (error) {
      alert("Ups ocurrio un error al obtener la plantilla");
    } finally {
      setDownloading(false);
    }
  };

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const res = await generalService.importCandidatePriorityVotingCenters({
        file,
        candidateId: props.candidate!.id,
      });
      setResult(res.importCandidatePriorityVotingCenters);
    } catch (error: any) {
      alert(
        IMPORT_ERRORS[error?.code] ??
          "Ups ocurrio un error al subir los centros prioritarios",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (uploading) return;
    props.onClose();
  };

  // Solo se listan las filas que el admin tiene que corregir en el archivo.
  const failedRows = result?.rows.filter(
    (row) =>
      row.status === "NOT_FOUND" ||
      row.status === "AMBIGUOUS" ||
      row.status === "INVALID",
  );

  return (
    <Dialog
      myClass="candidates-dialog"
      open={props.open}
      onClose={handleClose}
      title="Centros prioritarios"
      width={result ? 960 : 480}
    >
      {uploading ? (
        <p className="mb-2">Espere a que se procese el archivo</p>
      ) : !result ? (
        <div>
          <p className="mb-1">
            <strong>Candidato:</strong> {props.candidate?.fullName}
          </p>
          <p className="mb-4 text-sm opacity-80">
            La plantilla trae en la hoja &quot;Prioritarios&quot; los centros
            que ya lo son. Agregue ahí los nuevos (puede copiar los nombres de
            la hoja &quot;Centros&quot;) y súbala. Solo se agregan centros:
            quitar filas no desmarca ninguno.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button color="text" disabled={downloading} onClick={download}>
              <FontAwesomeIcon icon={faFileArrowDown} /> Descargar plantilla
            </Button>
            <Button color="text" onClick={() => fileRef.current?.click()}>
              <FontAwesomeIcon icon={faUpload} /> Subir Excel
            </Button>
          </div>
          <input
            type="file"
            ref={fileRef}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={upload}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
            <span>
              <strong>Marcados:</strong> {result.markedCount}
            </span>
            <span>
              <strong>Ya eran prioritarios:</strong> {result.unchangedCount}
            </span>
            <span>
              <strong>No encontrados:</strong> {result.notFoundCount}
            </span>
            <span>
              <strong>Ambiguos:</strong> {result.ambiguousCount}
            </span>
            <span>
              <strong>Sin centro:</strong> {result.invalidCount}
            </span>
            <span>
              <strong>Total:</strong> {result.totalRows}
            </span>
          </div>
          {failedRows?.length ? (
            <>
              <p className="mb-2">
                Corrija estas filas en el archivo y vuelva a subirlo. En las
                ambiguas, indique el municipio.
              </p>
              <DataTable
                columns={importPriorityCentersColumns}
                rows={failedRows}
              />
            </>
          ) : (
            <p>Todas las filas se procesaron correctamente.</p>
          )}
          <div className="flex justify-end mt-4">
            <Button color="text" onClick={handleClose}>
              Aceptar
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default PriorityCentersDialog;
