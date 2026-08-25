import { gql } from "graphql-request";
import { graphQLClient } from "./graphql-client";
import { CandidateData } from "../models/candidate";
import {
  AdminCountryLocationsTemplateData,
  CandidatePadronExportData,
  CandidateVotingCenterData,
  CandidateVotingCenterImportTemplateData,
  ImportCandidatePadronData,
  ImportCandidatePadronDto,
  ImportCandidateVotingCentersData,
  ImportCandidateVotingCentersDto,
  ImportCountryLocationsData,
  ImportCountryLocationsDto,
} from "../models/votingCenter";
import { CreateProspectDto, LoginDto } from "../models/createProspect.dto";
import { LoginData } from "../models/login";
import {
  CountriesData,
  StatesByCountryData,
} from "../models/states_by_country_data";
import { CandidateWardsData } from "../models/candidate_wards_data";
import { CandidatesData } from "../models/candidates_data";
import authService from "./authService";
import {
  DeleteCountryMunicipalityDto,
  SaveCandidateVotingCenterDto,
} from "../models/saveCandidateVotingCenterDto";
import { CONFIG } from "../constants/globals";
import { saveCountryMunicipalityDto } from "../models/models";

class GeneralService {
  async getCandidate(id: string) {
    const query = gql`
      query Candidate($id: ObjectID!) {
        candidate(id: $id) {
          activitiesCount
          networkMembersCount
          promotionalImageUrl
          promotionalMessage
          fullName
          contact {
            phone
            web
            whatsapp
          }
          id
          locationLinks {
            url
            address {
              city
              country
              state
            }
          }
          address {
            state
            country
            city
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CandidateData>(query, { id });
      console.log("getCandidate.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidate.err:", error);
      throw error;
    }
  }

  async getCandidateVotingCenters(candidateId: string) {
    const query = gql`
      query CandidateVotingCenters($candidateId: ObjectID!) {
        candidateVotingCenters(candidateId: $candidateId) {
          contactUrl
          id
          name
          networkGoalCount
          numberOfVoters
          address {
            country
            city
            state
            coordinates {
              latitude
              longitude
            }
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CandidateVotingCenterData>(
        query,
        { candidateId },
      );
      console.log("getCandidateVotingCenters.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidateVotingCenters.err:", error);
      throw error;
    }
  }

  async createProspect(input: CreateProspectDto) {
    const query = gql`
      mutation CreateProspect($input: CreateProspectInput!) {
        createProspect(input: $input) {
          success
          message
        }
      }
    `;
    try {
      const data = await graphQLClient.request<any>(query, { input });
      console.log("createProspect.res:", data);
      return data;
    } catch (error) {
      console.log("createProspect.err:", error);
      throw error;
    }
  }

  async login(input: LoginDto) {
    const query = gql`
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          refreshToken
          token
          user {
            createdAt
            dni
            email
            phone
            id
            fullName
            referralCode
            updatedAt
            referredBy {
              fullName
              id
            }
            address {
              city
              state
              country
            }
            role
            gender
            dateOfBirth
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request<LoginData>(query, { input });
      authService.setToken(data.login.token);
      authService.loginData = data.login;
      console.log("login.res:", data, authService.loginData);
      return data;
    } catch (error) {
      console.log("login.err:", error);
      throw error;
    }
  }

  async getStatesByCountry(countryCode: string) {
    const query = gql`
      query StatesByCountry($countryCode: String!) {
        statesByCountry(countryCode: $countryCode) {
          cities {
            code
            name
          }
          code
          name
        }
      }
    `;
    try {
      const data = await graphQLClient.request<StatesByCountryData>(query, {
        countryCode,
      });
      console.log("getStatesByCountry.res:", data);
      return data;
    } catch (error) {
      console.log("getStatesByCountry.err:", error);
      throw error;
    }
  }

  async getCandidateWards(
    candidateId: string,
    state?: string,
    municipality?: string,
  ) {
    const query = gql`
      query CandidateWards(
        $candidateId: ObjectID!
        $municipality: String = ""
        $state: String = ""
      ) {
        candidateWards(
          candidateId: $candidateId
          municipality: $municipality
          state: $state
        ) {
          whatsappLink
          title
          state
          municipality
          id
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CandidateWardsData>(query, {
        candidateId,
        state,
        municipality,
      });
      console.log("getCandidateWards.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidateWards.err:", error);
      throw error;
    }
  }

  async getCandidates(search?: string) {
    const query = gql`
      query Candidates($input: CandidateTypeFilterInputType = {}) {
        candidates(input: $input) {
          data {
            activitiesCount
            contact {
              phone
              whatsapp
              web
            }
            fullName
            id
            networkMembersCount
            promotionalImageUrl
            promotionalMessage
            isActive
            email
            enabledFeatures
            phone
            address {
              city
              country
              state
            }
            wards {
              id
              municipality
              state
              title
              whatsappLink
            }
          }
          pages
          total
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CandidatesData>(query, {
        input: {
          limit: 550,
          skip: 0,
          search,
        },
      });
      console.log("getCandidateWards.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidateWards.err:", error);
      throw error;
    }
  }

  async createLocation(input: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }

  async saveCandidateVotingCenter(input: SaveCandidateVotingCenterDto) {
    const query = gql`
      mutation SaveCandidateVotingCenter(
        $input: CandidateVotingCenterInputType!
      ) {
        saveCandidateVotingCenter(input: $input) {
          id
          name
          networkGoalCount
          contactUrl
          address {
            country
            state
            city
          }
          numberOfVoters
        }
      }
    `;
    try {
      const data = await graphQLClient.request<any>(query, { input });
      console.log("saveCandidateVotingCenter.res:", data);
      return data;
    } catch (error) {
      console.log("saveCandidateVotingCenter.err:", error);
      throw error;
    }
  }

  async getCandidateVotingCenterImportTemplate(id: string) {
    const query = gql`
      query CandidateVotingCenterImportTemplate($candidateId: ObjectID!) {
        candidateVotingCenterImportTemplate(candidateId: $candidateId) {
          expiresAt
          url
        }
      }
    `;
    try {
      const data =
        await graphQLClient.request<CandidateVotingCenterImportTemplateData>(
          query,
          { candidateId: id },
        );
      console.log("getCandidateVotingCenterImportTemplate.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidateVotingCenterImportTemplate.err:", error);
      throw error;
    }
  }

  async importCandidateVotingCenters(input: ImportCandidateVotingCentersDto) {
    const query = gql`
      mutation ImportCandidateVotingCenters(
        $file: File!
        $candidateId: ObjectID!
      ) {
        importCandidateVotingCenters(file: $file, candidateId: $candidateId) {
          duplicateCount
          failedCount
          processedRows
          totalRows
          unchangedCount
          updatedCount
          createdCount
          rows {
            message
            reasonCode
            rowNumber
            status
            votingCenterId
          }
        }
      }
    `;
    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query,
        variables: {
          file: null,
          candidateId: null,
        },
      }),
    );

    formData.append(
      "map",
      JSON.stringify({
        "0": ["variables.file"],
        "1": ["variables.candidateId"],
      }),
    );

    formData.append("0", input.file);
    formData.append("1", input.candidateId);
    try {
      const res = await fetch(CONFIG.GRAPHQL_API, {
        method: "POST",
        headers: {
          authorization: `Bearer ${authService.token}`,
        },
        body: formData,
      });
      const data = (await res.json()).data as ImportCandidateVotingCentersData;
      console.log("importCandidateVotingCenters.res:", data);
      return data;
    } catch (error) {
      console.log("importCandidateVotingCenters.err:", error);
      throw error;
    }
  }

  async getAdminCountryLocationsTemplate() {
    const query = gql`
      query AdminCountryLocationsTemplate {
        adminCountryLocationsTemplate {
          expiresAt
          url
        }
      }
    `;
    try {
      const data =
        await graphQLClient.request<AdminCountryLocationsTemplateData>(
          query,
          {},
        );
      console.log("getAdminCountryLocationsTemplate.res:", data);
      return data;
    } catch (error) {
      console.log("getAdminCountryLocationsTemplate.err:", error);
      throw error;
    }
  }

  async importCountryLocations(input: ImportCountryLocationsDto) {
    const query = gql`
      mutation ImportCountryLocations($file: File!) {
        importCountryLocations(file: $file) {
          createdCount
          duplicateCount
          failedCount
          processedRows
          totalRows
          unchangedCount
          updatedCount
          rows {
            message
            reasonCode
            rowNumber
            status
          }
        }
      }
    `;
    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query,
        variables: {
          file: null,
        },
      }),
    );

    formData.append(
      "map",
      JSON.stringify({
        "0": ["variables.file"],
      }),
    );

    formData.append("0", input.file);
    try {
      const res = await fetch(CONFIG.GRAPHQL_API, {
        method: "POST",
        headers: {
          authorization: `Bearer ${authService.token}`,
        },
        body: formData,
      });
      const data = (await res.json()).data as ImportCountryLocationsData;
      console.log("importCountryLocations.res:", data);
      return data;
    } catch (error) {
      console.log("importCountryLocations.err:", error);
      throw error;
    }
  }

  async getCandidatePadronExport(
    candidateId: string,
    municipality?: string,
    ttlSeconds?: number,
  ) {
    const query = gql`
      query CandidatePadronExport(
        $candidateId: ObjectID!
        $municipality: String
        $ttlSeconds: Int
      ) {
        candidatePadronExport(
          candidateId: $candidateId
          municipality: $municipality
          ttlSeconds: $ttlSeconds
        ) {
          url
          expiresAt
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CandidatePadronExportData>(
        query,
        { candidateId, municipality, ttlSeconds },
      );
      console.log("getCandidatePadronExport.res:", data);
      return data;
    } catch (error) {
      console.log("getCandidatePadronExport.err:", error);
      throw error;
    }
  }

  async importCandidatePadron(input: ImportCandidatePadronDto) {
    const query = gql`
      mutation ImportCandidatePadron($file: File!, $candidateId: ObjectID!) {
        importCandidatePadron(file: $file, candidateId: $candidateId) {
          totalRows
          processedRows
          createdCount
          updatedCount
          unchangedCount
          failedCount
          rows {
            rowNumber
            status
            reasonCode
            message
            cedula
          }
        }
      }
    `;
    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query,
        variables: {
          file: null,
          candidateId: null,
        },
      }),
    );

    formData.append(
      "map",
      JSON.stringify({
        "0": ["variables.file"],
        "1": ["variables.candidateId"],
      }),
    );

    formData.append("0", input.file);
    formData.append("1", input.candidateId);
    try {
      const res = await fetch(CONFIG.GRAPHQL_API, {
        method: "POST",
        headers: {
          authorization: `Bearer ${authService.token}`,
        },
        body: formData,
      });
      const data = (await res.json()).data as ImportCandidatePadronData;
      console.log("importCandidatePadron.res:", data);
      return data;
    } catch (error) {
      console.log("importCandidatePadron.err:", error);
      throw error;
    }
  }

  async getCountries(code: string = "") {
    const query = gql`
      query Countries($code: String) {
        countries(code: $code) {
          code
          name
          states {
            cities {
              code
              name
            }
            code
            name
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request<CountriesData>(query, {
        code: code,
      });
      console.log("getCountries.res:", data);
      return data;
    } catch (error) {
      console.log("getCountries.err:", error);
      throw error;
    }
  }

  async deleteCountryMunicipality(input: DeleteCountryMunicipalityDto) {
    const query = gql`
      mutation DeleteCountryMunicipality(
        $countryCode: String = ""
        $municipalityCode: String = ""
        $stateCode: String = ""
      ) {
        deleteCountryMunicipality(
          countryCode: $countryCode
          municipalityCode: $municipalityCode
          stateCode: $stateCode
        )
      }
    `;
    try {
      const data = await graphQLClient.request<any>(query, { ...input });
      console.log("deleteCountryMunicipality.res:", data);
      return data;
    } catch (error) {
      console.log("deleteCountryMunicipality.err:", error);
      throw error;
    }
  }

  async saveCountryMunicipality(input: saveCountryMunicipalityDto) {
    const query = gql`
      mutation SaveCountryMunicipality(
        $input: CountryMunicipalityInput = {
          countryCode: ""
          stateCode: ""
          name: ""
        }
      ) {
        saveCountryMunicipality(input: $input) {
          code
          name
        }
      }
    `;
    try {
      const data = await graphQLClient.request<any>(query, { input });
      console.log("saveCountryMunicipality.res:", data);
      return data;
    } catch (error) {
      console.log("saveCountryMunicipality.err:", error);
      throw error;
    }
  }
}

export default new GeneralService();
