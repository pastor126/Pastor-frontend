"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PastorService } from "@/service/PastorService";
import React, { useEffect, useState, useMemo } from "react";


type Pastor = {
  id: number;
  numero: string;
  iniciais: string;
  nome: string;

};

export default function NavLinks() {

  const pastorService = useMemo(() => new PastorService(), []);
  const [pastor, setPastor] = useState<Pastor | null>(null);  
  const [autenticado, setAutenticado] = useState<false | true>(false);
  


  useEffect(() => {
    async function fetchPastor() {
      try {
        const result = await pastorService.buscarPorId(1);
        console.log("Pastor retornado:", result);
        setPastor(result.data);              
        if(pastor?.nome != null && pastor.nome != ""){
          setAutenticado(true);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Erro de autenticação: Token inválido ou expirado.", error);
        } else {
          console.error("Erro ao buscar o pastor:", error);
        }
      }
    }
    fetchPastor();
  }, [pastorService]);
  

  const links = useMemo(() => [
    { name: "Home", href: "/autenticado", icon: HomeIcon },
    { name: "Pastores", href: "/pastores", icon: UserGroupIcon },
    { name: "PastoresHonorarios", href: "/pastoresHonorarios", icon: DocumentDuplicateIcon },
    { name: "Config", href: pastor?.nome ? "/adm" : "/naoautorizado", icon: Cog8ToothIcon },
  ], [pastor]);
  

  const pathname = usePathname();

  return (
    <>
      {pastor ?
       (
        links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })
      ) 
      : (
        <p>Carregando...</p>
      )}
    </>
  );
  
}