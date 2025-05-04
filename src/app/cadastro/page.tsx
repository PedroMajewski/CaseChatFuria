"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, query, setDoc, where } from "firebase/firestore";
import { auth, db, app } from "@/lib/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import { Timestamp } from "firebase/firestore";

import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
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

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  username: z.string().min(3, "O nome de usuário deve ter no mínimo 3 caracteres."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  passwordAuth: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nascimento: z.date().refine((value) => {
    const now = new Date();
    return value <= now;
  }, { message: "A data de nascimento não pode ser superior ao ano atual!" }),
}).refine((data) => data.password === data.passwordAuth, {
  message: "As senhas não coincidem.", path: ["passwordAuth"],
});

type LoginData = z.infer<typeof LoginSchema>;

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);
  const [dataNasci, setDataNasci] = React.useState<Date>()
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      name: "",
      nascimento: undefined,
    }
  });

  const isUsernameAvailable = async (nomeUsuario: string) => {
    const usersRef = collection(db, 'usuarios'); 
    const q = query(usersRef, where('username', '==', nomeUsuario)); 
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; 
  };

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    try {

      const isAvailable = await isUsernameAvailable(data.username);
    
      if (!isAvailable) {
      throw new Error("Este nome de usuario ja esta em uso");
    }

      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.username
      });

      await setDoc(doc(db, "usuarios", user.uid), {
        id: user.uid,
        name: data.name,
        username: data.username,
        email: data.email,
        nascimento: Timestamp.fromDate(new Date(data.nascimento)),
        photoURL: "",
        createdAt: Timestamp.now(),
      });
  

      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo, ${data.name}!`,
      });
      
      router.push("/")

    }catch(error: any){
      let message = "Erro ao cadastrar. Tente novamente.";
     if (error.code == "auth/email-already-in-use") {
      message = "Este e-mail já está em uso.";
    }else if(error.code == "Este nome de usuario ja esta em uso"){
      message = "Este nome de usuario já está em uso.";
    }
    toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
    }finally{
      setLoading(false)
    }
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
      <div className="flex flex-col w-full max-w-4xl bg-white/10 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden">
        
        <section className="w-full p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold italic mb-2 uppercase">Cadastro Fúria!</h2>
            <p className="text-muted-foreground text-sm">Junte-se à nossa equipe!</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Coluna Esquerda */}
                <div className="flex-1 space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu Nome</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ex: Gabriel Toledo" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome de Usuário</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ex: FalleN" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Coluna Direita */}
                <div className="flex-1 space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="exemplo@furia.gg" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                      </FormItem>
                    )}
                  />

                  <div className="">
                    <FormField
                    control={form.control}
                    name="nascimento"
                    render={({ field }) => (
                      <FormItem className=" flex-col flex-1 space-y-2">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Selecione uma data</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                    </div>
                
                </div>
                <div className="flex-1 space-y-5">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordAuth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirme a senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
