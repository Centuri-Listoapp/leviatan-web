"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/app/components/InputText";
import { useState } from "react";
import Button from "@/app/components/button/Button";
import generalService from "@/app/services/generalService";
import { useRouter } from "next/navigation";
import { loginAction } from "../utils/actions";

const schema = yup
  .object({
    email: yup.string().email("Debe ser un email").required("Es requerido"),
    password: yup
      .string()
      .min(8, "Mínimo 8 carácteres")
      .required("Es requerido"),
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("onSubmit.value::", data);
    try {
      setIsLoading(true);
      const res = await generalService.login(data);
      if (!["Admin"].includes(res.login.user.role)) {
        setIsLoading(false);
        alert(`Usuario no válido`);
        return;
      }
      await loginAction({ id: res.login.user.id, token: res.login.token });
      setIsLoading(false);
      router.push("/admin/candidates");
    } catch (error: any) {
      setIsLoading(false);
      const code = error?.response?.errors?.[0]?.extensions?.code;
      if (code === "INVALID_CREDENTIALS") {
        alert("El correo y la contraseña no corresponden");
      } else {
        alert("Ups ocurrio un error al enviar los datos");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        label="Correo electrónico"
        name="email"
        register={register}
        errors={errors}
        dark={false}
      />
      <InputText
        label="Contraseña"
        name="password"
        type="password"
        register={register}
        errors={errors}
        dark={false}
      />
      <Button
        myClass="login-button"
        fullWidth={true}
        type="submit"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Espere..." : "Ingresar"}
      </Button>
    </form>
  );
}
