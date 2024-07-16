'use client';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState, useMemo } from 'react';
import { PastorService } from '@/service/PastorService';


interface Pastor {
  id: number;
  numero: string;
  iniciais: string;
}
const checkAuth = () => {
  if(localStorage.getItem('token') != undefined){
    console.log(localStorage.getItem);
    return true;
  }else{
    console.log('não retornou token');
    return false;
  }

};


const PastorComponent: React.FC = () => {
  const pastorVazio: Pastor = {
    id: 0,
    numero: '',
    iniciais: '',
  };

  const [pastors, setPastors] = useState<Pastor[] | null>(null);
  const [pastorDialog, setPastorDialog] = useState(false);
  const [pastor, setPastor] = useState<Pastor>(pastorVazio);
  const [selectedPastors, setSelectedPastors] = useState<Pastor[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const pastorService = useMemo(() => new PastorService(), []);

  const [pageLoaded, setPageloaded] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    setAutenticado(checkAuth());
    setPageloaded(true);
  }, []);

  useEffect(() => {
    if (!pastors) {
      pastorService.listarTodos()
        .then((response) => {
          console.log('Resposta completa da API:', response);
          console.log('Dados da API:', response.data);
          setPastors(response.data);
          console.log('Pastores definidos:', response.data);
        }).catch((error) => {
          console.error('Erro ao listar Pastores:', error);
        });
    }
  }, [pastorService, pastors]);

  return (
    <div>
      {autenticado ?
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-emerald-100">
      <Image
        src="/Pastor.png"
        width={300}
        height={228}
        className="hidden md:block"
        alt="Imagem para desktop version"
      />
      <Image
        src="/Pastor.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Imagem para mobile version"
      />

      <div className="crud-demo w-full max-w-4xl mt-12">
        <div className="flex-1 border-4 border-black rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <div className="relative mt-4">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              className="peer block w-full rounded-md border border-gray-400 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-900"
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          <table className="table-fixed w-full rounded-md border border-gray-400 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-900">
            <thead className="rounded-md border border-black">
              <tr>
                <th className="rounded-md border border-black pl-2 pr-2 w-8">Número</th>
                <th className="rounded-md border border-black pl-2 pr-2 w-80">Nome</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pastors) && pastors.length > 0 ? (
                pastors
                  .filter((pastor) =>
                   
                    pastor.iniciais.toLowerCase().includes(globalFilter.toLowerCase()) ||
                    pastor.numero.includes(globalFilter)
                  
                  )
                  .map((pastor) => (
                    <tr key={pastor.id}>
                      <td className="rounded-md border border-black pl-4 pr-2 w-6">{pastor.numero}</td>
                      <td className="rounded-md border border-black pl-4 pr-2 w-6">{pastor.iniciais}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">Nenhum Pastor encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>: <div className="flex h-screen text-4xl md:flex-row ml-20 pl-20"><a href="/login">Faça o Login!</a></div>}
    </div>
  );
}
 

export default PastorComponent;
