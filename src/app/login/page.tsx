"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

// Zod schema
const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth,data.email,data.password);

      toast({
        title: "Login realizado com sucesso.",
        description: `Bem vindo de volta ${data.email}!`,
      });

      router.push("/")

    }catch(error){
      toast({
        title: "Erro ao realizar o login :(",
        description: `Verifique suas crendencias!`,
        variant: "destructive",
      });
      console.log(error)
    }

    setLoading(false)
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url('/assets/FuriaEsportsLogo.png')`,
        backgroundSize: "10%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col-reverse md:flex-row w-full max-w-4xl bg-white/10 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden">
        
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-8 space-y-4 border-t md:border-t-0 md:border-r border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold italic uppercase text-center">Novo por aqui?</h2>
          <p className="text-center text-sm md:text-base">Junte-se à Fúria e crie sua conta agora mesmo.</p>
          <Link href="/cadastro">
            <Button variant="secondary" className="w-full md:w-auto">Cadastrar</Button>
          </Link>
        </div>

        <section className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold italic mb-2 uppercase">Bem-vindo Furioso!</h2>
            <p className="text-muted-foreground text-sm">Entre com seu email e senha para continuar!</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="exemplo@furia.gg" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Link href="/recuperar-senha" className="text-sm underline hover:text-white">
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
