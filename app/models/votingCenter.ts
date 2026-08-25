export interface CandidateVotingCenterData {
  candidateVotingCenters: CandidateVotingCenter[];
}

export interface CandidateVotingCenter {
  contactUrl: null;
  id: string;
  name: string;
  networkGoalCount: number;
  address: Address;
}

export interface Address {
  country: string;
  state: string;
  city?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CandidateVotingCenterImportTemplateData {
  candidateVotingCenterImportTemplate: CandidateVotingCenterImportTemplate;
}

export interface CandidateVotingCenterImportTemplate {
  expiresAt: Date;
  url: string;
}

export interface ImportCandidateVotingCentersDto {
  file: File;
  candidateId: string;
}

export interface ImportCandidateVotingCentersData {
  importCandidateVotingCenters: ImportCandidateVotingCenters;
}

export interface ImportCandidateVotingCenters {
  duplicateCount: number;
  failedCount: number;
  processedRows: number;
  totalRows: number;
  unchangedCount: number;
  updatedCount: number;
  createdCount: number;
  rows: Row[];
}

export interface Row {
  message: string;
  reasonCode: string | null;
  rowNumber: number;
  status: string;
  votingCenterId: null | string;
}

export interface AdminCountryLocationsTemplateData {
  adminCountryLocationsTemplate: AdminCountryLocationsTemplate;
}

export interface AdminCountryLocationsTemplate {
  expiresAt: Date;
  url: string;
}

export interface ImportCountryLocationsDto {
  file: File;
}

export interface ImportCountryLocationsData {
  importCountryLocations: ImportCountryLocations;
}

export interface ImportCountryLocations extends ImportCandidateVotingCenters {}

export interface CandidatePadronExportData {
  candidatePadronExport: CandidatePadronExportTemplate;
}

export interface CandidatePadronExportTemplate {
  url: string;
  expiresAt: Date;
}

export interface ImportCandidatePadronDto {
  file: File;
  candidateId: string;
}

export interface ImportCandidatePadronData {
  importCandidatePadron: ImportCandidatePadron;
}

export interface ImportCandidatePadron {
  totalRows: number;
  processedRows: number;
  createdCount: number;
  updatedCount: number;
  unchangedCount: number;
  failedCount: number;
  rows: PadronRow[];
}

export interface PadronRow {
  rowNumber: number;
  status: "CREATED" | "UPDATED" | "UNCHANGED" | "FAILED";
  reasonCode:
    | "MISSING_REQUIRED_FIELD"
    | "DUPLICATE_CEDULA_IN_FILE"
    | "VOTING_CENTER_NOT_FOUND"
    | "AMBIGUOUS_VOTING_CENTER"
    | null;
  message: string;
  cedula: string;
}
