"use client";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/app/components/InputText";
import { Option } from "@/app/components/InputSelect";
import InputAutocomplete from "@/app/components/InputAutocomplete";
import Dialog from "@/app/components/dialog/Dialog";
import { useEffect, useState } from "react";
import Button from "@/app/components/button/Button";
import generalService from "@/app/services/generalService";
import { CONFIG } from "@/app/constants/globals";
import { getOperatingSystem } from "@/app/utils/utils";
import { Address } from "@/app/models/candidate";
import { City } from "@/app/models/states_by_country_data";
import { CandidateWard } from "@/app/models/candidate_wards_data";

const schema = yup
  .object({
    fullName: yup.string().required("Es requerido"),
    phone: yup
      .number()
      .typeError("Debe ser un número")
      .positive("Debe ser un número")
      .integer("Debe ser un número")
      .required("Es requerido"),
    email: yup.string().email("Debe ser un email").required("Es requerido"),
    votingCenterId: yup.string(),
    state: yup.string(),
    city: yup.string(),
    wardId: yup.string().when("$wards", {
      is: (items?: any[]) => Array.isArray(items) && items.length > 0,
      then: (schema) => schema.required("Es requerido"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();

type Props = {
  id: string;
  address: Address;
};

export default function InfoForm(props: Props) {
  const [wards, setWards] = useState<Option[]>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    context: { wards },
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [ward, setWard] = useState<CandidateWard>();
  const [votingCenters, setVotingCenters] = useState<Option[]>();
  const [states, setStates] = useState<Option[]>();
  const [cities, setCities] = useState<Option[]>();
  const [captchaToken, _] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState({
    show: false,
    data: undefined,
  });
  const state = useWatch({
    control,
    name: "state",
  });
  const city = useWatch({
    control,
    name: "city",
  });

  useEffect(() => {
    getCandidateVotingCenters();
    getStatesByCountry();
    getCandidateWards();
  }, []);

  useEffect(() => {
    trigger("wardId");
  }, [wards]);

  useEffect(() => {
    if (!state) return;
    changeState(state);
  }, [state]);

  useEffect(() => {
    if (!city) return;
    getCandidateWards();
  }, [city]);

  const getCandidateVotingCenters = async () => {
    try {
      const res = await generalService.getCandidateVotingCenters(props.id);
      setVotingCenters(
        res.candidateVotingCenters.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
        })),
      );
    } catch (error) {
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const getCandidateWards = async () => {
    try {
      setValue("wardId", undefined);
      console.log("state:", state, "city:", city);
      const stateLabel = states?.find((item) => item.value == state)?.label;
      const cityLabel = cities?.find((item) => item.value == city)?.label;
      const res = await generalService.getCandidateWards(
        props.id,
        stateLabel,
        cityLabel,
      );
      setWards(
        res.candidateWards.map((item) => ({
          label: item.title,
          value: item.id,
          data: item,
        })),
      );
    } catch (error) {
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const getStatesByCountry = async () => {
    try {
      const res = await generalService.getStatesByCountry(
        props.address.country,
      );
      const states = res.statesByCountry.map((item) => ({
        label: item.name,
        value: item.code,
        data: item.cities,
      }));
      setStates(states);
      setCities(
        props.address.state != null
          ? getCities(states, props.address.state)
          : [],
      );
    } catch (error) {
      alert("Ups ocurrio un error al obtener los centros de votación");
    }
  };

  const getCities = (states: Option[], code: string) => {
    const option = states.find((item) => item.value == code)!;
    const cities: Option[] = (option.data as City[]).map((item) => ({
      label: item.name,
      value: item.code,
    }));
    return cities;
  };

  const changeState = (value: string) => {
    const cities = getCities(states!, value);
    setValue("city", undefined);
    setCities(cities);
    getCandidateWards();
  };

  const acceptTermsSubmit = (data: any) => {
    setAcceptTerms({ data, show: true });
  };

  const onSubmit = async (data: any) => {
    const { state, city, wardId, ...fields } = data;
    const value = {
      ...fields,
      candidateId: props.id,
      phone: `${data.phone}`,
      address: {
        country: props.address.country,
        state,
        city,
      },
      captchaToken: `${captchaToken}`,
    };
    console.log("onSubmit.value::", value);
    try {
      setIsLoading(true);
      await generalService.createProspect(value);
      setIsLoading(false);
      setOpenInfo(true);
      setWard(wards?.find((item) => item.value == wardId)?.data);
      reset();
    } catch (error) {
      setIsLoading(false);
      alert("Ups ocurrio un error al enviar los datos");
    }
  };

  const downloadApp = () => {
    const os = getOperatingSystem();
    switch (os) {
      case "Android":
        window.open(CONFIG.PLAY_STORE, "_blank");
        break;
      case "iOS":
        window.open(CONFIG.APP_STORE, "_blank");
        break;
      default:
        // const url = `${REFERRAL_LINK}123`;
        // window.open(url, "_blank");
        window.open(CONFIG.PLAY_STORE, "_blank");
        break;
    }
    setOpenInfo(false);
  };

  const openLink = () => {
    window.open(ward!.whatsappLink!, "_blank");
    setOpenInfo(false);
  };

  const goTermsConditions = () => {
    window.open("../../terms-conditions", "_blank");
  };

  const url = ward?.whatsappLink;

  return (
    <>
      <form className="mt-5" onSubmit={handleSubmit(acceptTermsSubmit)}>
        <InputText
          label="Nombre completo"
          name="fullName"
          register={register}
          errors={errors}
        />
        <InputText
          label="Teléfono"
          name="phone"
          register={register}
          errors={errors}
        />
        <InputText
          label="Correo"
          name="email"
          register={register}
          errors={errors}
        />
        <InputAutocomplete
          label="Estado"
          name="state"
          control={control}
          errors={errors}
          options={states}
        />
        <InputAutocomplete
          label="Municipio"
          name="city"
          control={control}
          errors={errors}
          options={cities}
        />
        <InputAutocomplete
          label="Parroquia"
          name="wardId"
          control={control}
          errors={errors}
          options={wards}
        />
        <InputAutocomplete
          label="Centro de votación"
          name="votingCenterId"
          control={control}
          errors={errors}
          options={votingCenters}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Espere..." : "Enviar información"}
        </Button>
      </form>
      <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
        <div className="info-dialog">
          <div
            className="info-dialog-box"
            style={{ width: url ? undefined : "100%" }}
          >
            <h1>¿Quieres ser parte de nuestro equipo de activistas?</h1>
            <Button onClick={() => downloadApp()}>Descarga la App</Button>
          </div>
          {url && (
            <div className="info-dialog-box">
              <h1>¿Quieres estar informado de todas nuestras actividades?</h1>
              <Button onClick={() => openLink()}>
                Ir al grupo de WhatsApp
              </Button>
            </div>
          )}
        </div>
      </Dialog>
      <Dialog
        open={acceptTerms.show}
        onClose={() => setAcceptTerms({ show: false, data: undefined })}
      >
        <div className="info-dialog">
          <div className="info-dialog-box" style={{ width: "100%" }}>
            <h1>Terminos y condiciones</h1>
            <br />
            <p>
              Para continuar, debe aceptar los{" "}
              <span
                className="underline click"
                onClick={() => goTermsConditions()}
              >
                términos y condiciones
              </span>
            </p>
            <Button
              onClick={() => {
                setAcceptTerms({ ...acceptTerms, show: false });
                onSubmit(acceptTerms.data);
              }}
            >
              Aceptar términos y condiciones
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
