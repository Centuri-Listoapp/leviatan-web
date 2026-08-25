import { TableColumns } from "@/app/components/datatable/DataTable";
import { Candidate } from "@/app/models/candidates_data";
import { CandidateVotingCenter } from "@/app/models/votingCenter";

export const candidateColumns: TableColumns<Candidate> = [
  {
    field: "fullName",
    headerName: "Candidato",
  },
  {
    field: "email",
    headerName: "Correo",
  },
  {
    field: "votingCenter",
    headerName: "Centro de votación",
    valueFormatter: ({}) => "---",
  },
  {
    field: "state",
    headerName: "Estado",
    valueFormatter: ({ address }) => address.state,
  },
  {
    field: "city",
    headerName: "Municipio",
    valueFormatter: ({ address }) => address.city ?? "---",
  },
  {
    field: "actions",
    headerName: "Centros",
  },
];

export const votingCentersColumns: TableColumns<CandidateVotingCenter> = [
  {
    field: "name",
    headerName: "Nombre",
  },
  {
    field: "networkGoalCount",
    headerName: "Meta centro votación",
  },
  {
    field: "numberOfVoters",
    headerName: "Cantidad votantes",
  },
  {
    field: "state",
    headerName: "Estado",
    valueFormatter: ({ address }) => address.state,
  },
  {
    field: "city",
    headerName: "Municipio",
    valueFormatter: ({ address }) => address.city ?? "---",
  },
  {
    field: "latitude",
    headerName: "Latitude",
    valueFormatter: ({ address }) => address.coordinates?.latitude ?? "---",
  },
  {
    field: "longitude",
    headerName: "Longitude",
    valueFormatter: ({ address }) => address.coordinates?.longitude ?? "---",
  },
];

export const locationColumns: TableColumns = [
  {
    field: "countryName",
    headerName: "País",
  },
  {
    field: "stateName",
    headerName: "Estado",
  },
  {
    field: "cityName",
    headerName: "Municipio / Parroquia",
  },
  {
    field: "actions",
    headerName: "Acciones",
  },
];

export const importCenterColumns: TableColumns = [
  {
    field: "rowNumber",
    headerName: "Nro. fila",
  },
  {
    field: "message",
    headerName: "Mensaje",
  },
  {
    field: "status",
    headerName: "Estado",
  },
  {
    field: "votingCenterId",
    headerName: "Centro de votacion Id",
  },
];

export const importLocationColumns: TableColumns = [
  ...importCenterColumns.slice(0, importCenterColumns.length - 2),
  {
    field: "status",
    headerName: "Estado",
  },
];

export const importPadronColumns: TableColumns = [
  {
    field: "rowNumber",
    headerName: "Nro. fila",
  },
  {
    field: "cedula",
    headerName: "Cédula",
  },
  {
    field: "status",
    headerName: "Estado",
  },
  {
    field: "reasonCode",
    headerName: "Código",
    valueFormatter: ({ reasonCode }: any) => reasonCode ?? "---",
  },
  {
    field: "message",
    headerName: "Mensaje",
  },
];
