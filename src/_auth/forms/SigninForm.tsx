
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'

import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidationSchema } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if(!session) {
      return toast({
        variant: "warning",
        title: 'Login falhou. Por favor tente novamente.',
      })
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();

      navigate('/');
    } else {
      return toast({
        variant: "warning",
        title: 'Login falhou. Por favor tente novamente.'
      })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-400 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="logo" />
        
        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-10">Entre na sua conta</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Bem-vindo de volta!</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ?(
              <div className="flex-center gap-2">
                <Loader /> Entrando...
              </div>
            ):"Entrar"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
              Ainda não tem uma conta?
              <Link to="/sign-up" className="text-primary text-primary-500 text-small-semibold ml-1">Cadastrar-se</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm