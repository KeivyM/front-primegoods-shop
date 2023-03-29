import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);
const validateExtension = (files) => {
  if (!!files) {
    console.log(files);
    return ["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(
      files[0].type
    );
  }
  return true;
};
const requireField = () => yup.string().required("Este campo es requerido.");

export const schemaRegister = yup
  .object({
    name: yup
      .string()
      .required("Este campo es requerido.")
      .matches(/^[a-zA-Zs\s]*$/, "Los números no son permitidos."),
    username: yup.string().required("Este campo es requerido."),
    email: yup
      .string()
      .email("Correo no válido.")
      .required("Este campo es requerido."),
    password: requireField().min(8, "Debe tener mínimo 8 letras."),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null], "Contraseña no coincide.")
      .required("Este campo es requerido."),
  })
  .required()
  .strict();

export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .email("Este correo no es válido.")
      .required("El correo es requerido."),
    password: requireField().min(8, "Debe tener mínimo 8 letras."),
  })
  .required()
  .strict();

export const schemaProduct = yup
  .object()
  .shape({
    title: yup.string().required("El titulo es requerido."),
    description: yup.string().required("la description es requerida."),
    price: yup
      .number()
      .min(0, "Price must be a positive number")
      .required("El precio es requerido."),
    images: yup
      .mixed()
      .test("type", "solo se permiten imagenes", (e) => validateExtension(e))
      .required("debes cargar al menos una imagen"),
    color: yup.string().notRequired(),
  })
  .required()
  .strict();
