import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, { message: "Nome muito curto." }),
    username: z.string().min(2, { message: "Usuário muito curto." }).max(30, { message: "Usuário grande demais." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "Senha precisa ter pelo menos 8 caracteres." }),
  })

export const SigninValidationSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(8, { message: "Senha precisa ter pelo menos 8 caracteres." }),
})