"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@/app/components/dialog/Dialog";
import generalService from "@/app/services/generalService";
import { ImportCandidatePadron } from "@/app/models/votingCenter";
import Button from "@/app/components/button/Button";
import DataTable from "@/app/components/datatable/DataTable";
import { importPadronColumns } from "../configs/table-columns";
import { Candidate } from "@/app/models/candidates_data";

type UploadPadronDialogProps = {
  open: boolean;
  data?: any;
  candidate?: Candidate;
  onClose: Function;
};

const UploadPadronDialog = (props: UploadPadronDialogProps) => {
  const [importPadron, setImportPadron] = useState<ImportCandidatePadron>();

  useEffect(() => {
    if (props.data) upload();
  }, [props.data]);

  const upload = async () => {
    try {
      const data = props.data!;
      console.log("upload.importCandidatePadron:", data, props.candidate);
      const res = await generalService.importCandidatePadron({
        file: data,
        candidateId: props.candidate!.id,
      });
      setImportPadron(res.importCandidatePadron);
    } catch (error) {
      props.onClose();
      alert("Ups ocurrio un error al subir el padrón");
    }
  };

  const handleClose = () => {
    if (!importPadron) return;
    props.onClose();
    setImportPadron(undefined);
  };

  return (
    <Dialog
      myClass="candidates-dialog"
      open={props.open}
      onClose={() => {
        handleClose();
      }}
      width={960}
      title="Subir padrón"
    >
      {!importPadron ? (
        <p className="mb-2">Espere a que se suban todos</p>
      ) : (
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
            <span>
              <strong>Fallidos:</strong> {importPadron.failedCount}
            </span>
            <span>
              <strong>Creados:</strong> {importPadron.createdCount}
            </span>
            <span>
              <strong>Actualizados:</strong> {importPadron.updatedCount}
            </span>
            <span>
              <strong>Sin cambios:</strong> {importPadron.unchangedCount}
            </span>
            <span>
              <strong>Total:</strong> {importPadron.totalRows}
            </span>
          </div>
          <DataTable columns={importPadronColumns} rows={importPadron.rows} />
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

export default UploadPadronDialog;
