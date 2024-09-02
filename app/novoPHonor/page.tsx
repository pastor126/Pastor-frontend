"use client";
import { Button } from "../ui/button";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PastorHonorarioService } from "@/service/PastorHonorarioService";
import { useRouter } from 'next/router';

interface Pastor {
  id: number;
  numero: string;
  iniciais: string;
  nome: string;
}

const NovoPHonor = () => {
  const pastorVazio: Pastor = {
    id: 0,
    numero: "",
    iniciais: "",
    nome: "",
  };

  const [pastores, setPastores] = useState<Pastor[]>([]);
  const [pastorDialog, setPastorDialog] = useState(false);
  const [deletePastorDialog, setDeletePastorDialog] = useState(false);
  const [pastor, setPastor] = useState<Pastor>(pastorVazio);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const pastorHonorService = useMemo(() => new PastorHonorarioService(), []);


 

  const listarPastores = useCallback(() => {
    pastorHonorService
      .listarTodos()
      .then((response) => {
        console.log("Resposta completa da API:", response);
        console.log("Dados da API:", response.data);
        if (Array.isArray(response.data)) {
          setPastores(response.data);
          console.log("Pastores Honorários definidos:", response.data);
        } else {
          console.error("A resposta não é um array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao listar Pastores Honorários:", error);
      });
  }, [pastorHonorService]);

  useEffect(() => {
    listarPastores();
  }, [listarPastores]);

  const openNew = () => {
    setPastor(pastorVazio);
    setSubmitted(false);
    setPastorDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPastorDialog(false);
  };

  const hideDeletePastorDialog = () => {
    setDeletePastorDialog(false);
  };

  const savePastor = async () => {
    setSubmitted(true);

    if (!pastor.id) {
      pastorHonorService
        .inserir(pastor)
        .then((response) => {
          console.log("Pastor cadastrado com sucesso.");
          setPastorDialog(false);
          setPastor(pastorVazio);
          listarPastores(); // Atualiza a lista de Pastores honorários
        })
        .catch((error) => {
          console.error("Erro ao salvar Pastor Honorário", error);
        });
    } else {
      pastorHonorService
        .alterar(pastor.id, pastor)
        .then((response) => {
          console.log("Pastor Honorário atualizado com sucesso.");
          setPastorDialog(false);
          setPastor(pastorVazio);
          listarPastores(); // Atualiza a lista de Pastors
        })
        .catch((error) => {
          console.error("Erro ao atualizar Pastor Honorário.", error);
        });
    }
  };

  const editPastor = (pastor: Pastor) => {
    setPastor({ ...pastor });
    setPastorDialog(true);
  };

  const confirmDeletePastor = (pastor: Pastor) => {
    setPastor(pastor);
    setDeletePastorDialog(true);
  };

  const deletePastor = async () => {
    pastorHonorService
      .excluir(pastor.id)
      .then((response) => {
        console.log("Pastor Honorário excluído com sucesso.");
        setDeletePastorDialog(false);
        setPastor(pastorVazio);
        listarPastores(); // Atualiza a lista de Pastors
      })
      .catch((error) => {
        console.error("Erro ao deletar Pastor Honorário", error);
      });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = e.target.value;
    setPastor((prevPastor) => ({
      ...prevPastor,
      [name]: val,
    }));
  };

  return (
    <div className="crud-demo relative">

<div className="flex-1 bg-gray-50  pb-1">
        <div className=" border-4 border-black rounded-lg bg-gray-50 px-6 pb-2 ">
        <h1 className="font-bold text-xl">Cadastro de Novos Pastores</h1>
        <div >
        <a className="inline-block border-4 border-orange-500 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold pl-11 pr-11 rounded" href="/novoP">Pastor</a>
        <a className="inline-block border-4 border-orange-500 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold pl-1 pr-1 rounded ml-4" href="/novoP">Pastor Honorário</a>

        </div>
        </div>
        </div>

      <div className="flex-1 border-4 border-black rounded-lg bg-gray-50 px-6 pb-4 pt-2 ">
        <h1 className="font-bold text-xl">Cadastro de Pastor Honorário</h1>
        <div className="flex">
          <div className="relative mb-2 mr-2 w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <input
              className="peer block w-full rounded-md border border-gray-400 py-[6px] pl-10 text-sm outline-2 placeholder:text-gray-900"
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          <div className="relative">
            <Button className="w-60 pl-20 h-9 bg-green-500" onClick={openNew}>
              Novo
            </Button>
          </div>
        </div>
        <div className="overflow-auto max-h-[50vh]">
          <table className="table-fixed w-full rounded-md border border-gray-400 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-900">
            <thead className="rounded-md border border-black">
              <tr>
                <th className="rounded-md border border-black pl-2 pr-2 w-20">
                  Número
                </th>
                <th className="rounded-md border border-black pl-2 pr-2 w-80">
                  Nome
                </th>
                <th className="rounded-md border border-black pl-2 pr-2 w-80">
                  Iniciais
                </th>
                <th className="rounded-md border border-black pl-2 pr-2 w-40">Gerência</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pastores) && pastores.length > 0 ? (
                pastores
                  .filter((pastor) =>
                    pastor.nome
                      .toLowerCase()
                      .includes(globalFilter.toLowerCase())
                  )
                  .map((pastor) => (
                    <tr key={pastor.id}>
                      <td className="hidden">{pastor.id}</td>
                      <td className="border border-black pl-2">
                        {pastor.numero}
                      </td>
                      <td className="border border-black pl-2">
                        {pastor.nome}
                      </td>
                      <td className="border border-black pl-2">
                        {pastor.iniciais}
                      </td>
                      <td className="border border-black  flex">
                        <Button className="pl-4 pr-4 bg-yellow-300" onClick={() => editPastor(pastor)}>
                          Editar
                        </Button>
                        <Button
                          className="ml-2 pl-4 pr-4 bg-red-500"
                          onClick={() => confirmDeletePastor(pastor)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Nenhum Pastor encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          {pastorDialog && (
            <div>
              <h4 className="border-t border-black mt-2 text-center font-bold text-xl">
                Detalhes do Pastor
              </h4>

              <label className="pl-2 pr-6 w-20">Número</label>
              <label className="pl-40 pr-40 w-80">Nome</label>
              <label className="pl-60 pr-2 w-80">Iniciais</label>
              <div className="w-auto">
                <input
                  className="hidden"
                  type="id"
                  placeholder="Id"
                  value={pastor.id}
                  onChange={(e) => onInputChange(e, "id")}
                />

                <input
                  className="rounded-md border border-black  text-center w-20 text-slate-500"
                  type="text"
                  placeholder="Número"
                  value={pastor.numero}
                  onChange={(e) => onInputChange(e, "numero")}
                />
                <input
                  className="rounded-md border border-black  text-center w-2/5 ml-2 mr-2 text-slate-500"
                  type="text"
                  placeholder="Nome"
                  value={pastor.nome}
                  onChange={(e) => onInputChange(e, "nome")}
                />

                <input
                  className="rounded-md border border-black  text-center w-2/5 text-slate-500"
                  type="text"
                  placeholder="Iniciais"
                  value={pastor.iniciais}
                  onChange={(e) => onInputChange(e, "iniciais")}
                />

                <div className="flex justify-center mt-2 mr-6">
                  <Button
                    className="bg-green-500 h-9 pl-6 pr-6" onClick={savePastor}>
                    Salvar
                  </Button>
                  <Button className="bg-red-500 h-9 ml-8" onClick={hideDialog}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {deletePastorDialog && (
            <div>
              <p>Você realmente deseja excluir {pastor.nome}?</p>
              <div className="flex justify-center mt-2">
                <Button
                  className="bg-orange-500 ml-4 pl-4"
                  onClick={hideDeletePastorDialog}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-red-500 ml-8 pl-6 pr-6"
                  onClick={deletePastor}
                >
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovoPHonor;
