import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: 'Nome muito curto.' }),
    username: z.string().min(2, { message:'Usuario muito curto.' }).max(24, { message: 'Usuario grande demais.' }),
    email: z.string().email({ message: 'Email Inválido.' }),
    password: z.string().min(8, { message:'Senha precisa ter pelo menos 8 caracteres.' })
  })