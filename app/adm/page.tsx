"use client";
import { Button } from "../ui/button";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UsuarioService } from "@/service/UsuarioService";
import { useRouter } from 'next/router';

interface Usuario {
  id: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  situacao: string;
}

const Adm = () => {
  const usuarioVazio: Usuario = {
    id: 0,
    nome: "",
    login: "",
    senha: "123456",
    email: "",
    situacao: "",
  };


  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioDialog, setUsuarioDialog] = useState(false);
  const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>(usuarioVazio);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const usuarioService = useMemo(() => new UsuarioService(), []);


  const listarUsuarios = useCallback(() => {
    usuarioService
      .listarTodos()
      .then((response) => {
        console.log("Resposta completa da API:", response);
        console.log("Dados da API:", response.data);
        if (Array.isArray(response.data)) {
          setUsuarios(response.data);   
          console.log("Usuários definidos:", response.data);
        } else {
          setUsuarios(response.data);
          console.error("A resposta não é um array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao listar usuários:", error);
      });
  }, [usuarioService]);

  useEffect(() => {
    listarUsuarios();
  }, [listarUsuarios]);

  const openNew = () => {
    setUsuario(usuarioVazio);
    setSubmitted(false);
    setUsuarioDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUsuarioDialog(false);
  };

  const hideDeleteUsuarioDialog = () => {
    setDeleteUsuarioDialog(false);
  };

  const saveUsuario = async () => {
    setSubmitted(true);

    if (!usuario.id) {
      usuarioService
        .inserir(usuario)
        .then((response) => {
          console.log("Usuário cadastrado com sucesso.");
          setUsuarioDialog(false);
          setUsuario(usuarioVazio);
          listarUsuarios(); // Atualiza a lista de usuários
        })
        .catch((error) => {
          console.error("Erro ao salvar usuário", error);
        });
    } else {
      usuarioService
        .alterar(usuario.id, usuario)
        .then((response) => {
          console.log("Usuário atualizado com sucesso.");
          setUsuarioDialog(false);
          setUsuario(usuarioVazio);
          listarUsuarios(); // Atualiza a lista de usuários
        })
        .catch((error) => {
          console.error("Erro ao atualizar usuário", error);
        });
    }
  };

  const editUsuario = (usuario: Usuario) => {
    setUsuario({ ...usuario });
    setUsuarioDialog(true);
  };

  const confirmDeleteUsuario = (usuario: Usuario) => {
    setUsuario(usuario);
    setDeleteUsuarioDialog(true);
  };

  const deleteUsuario = async () => {
    usuarioService
      .excluir(usuario.id)
      .then((response) => {
        console.log("Usuário excluído com sucesso.");
        setDeleteUsuarioDialog(false);
        setUsuario(usuarioVazio);
        listarUsuarios(); // Atualiza a lista de usuários
      })
      .catch((error) => {
        console.error("Erro ao deletar usuário", error);
      });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = e.target.value;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: val,
    }));
  };

  return (
    <div className="ml-0">

<div className="flex-1 bg-gray-50  pb-1">
        <div className=" border-4 border-black rounded-lg bg-gray-50 px-2 pb-2  ">
        <h1 className="font-bold text-xl">Cadastro de Novos Pastores</h1>
        <div >
        <a className="inline-block border-4 border-orange-500 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold pl-11 pr-11 rounded" href="/novoP">Pastor</a>
        <a className="inline-block border-4 border-orange-500 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold pl-1 pr-1 rounded ml-4" href="/novoPHonor">Pastor Honorário</a>

        </div>
        </div>
        </div>

      <div className="flex-1 border-4 border-black rounded-lg bg-gray-50 px-2 pb-2 ">
        <h1 className="font-bold text-xl">Cadastro de Usuários</h1>
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
          <table className="table-fixed w-full rounded-md border border-gray-400 py-[9px] pl-2 pr-2 text-sm outline-2 placeholder:text-gray-900">
            <thead className="rounded-md border border-black">
              <tr>
               
                <th className="rounded-md border border-black pl-2 pr-2 w-80">
                  Nome
                </th>
                <th className="rounded-md border border-black pl-4 pr-4 w-60">
                  Login
                </th>
                <th className="rounded-md border border-black pl-2 pr-2 w-60">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(usuarios) && usuarios.length > 0 ? (
                usuarios
                  .filter((usuario) =>
                    usuario.nome
                      .toLowerCase()
                      .includes(globalFilter.toLowerCase())
                  )
                  .map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="hidden">{usuario.id}</td>
                      <td className="border border-black pl-2">
                        {usuario.nome}
                      </td>
                      <td className="border border-black pl-2">
                        {usuario.login}
                      </td>
                      <td className="border border-black pl-2">
                        {usuario.email}
                      </td>
                      <td className="border border-black pl-2 flex">
                        <Button className="pl-6 pr-6 bg-yellow-300" onClick={() => editUsuario(usuario)}>
                          Editar
                        </Button>
                        <Button
                           className="ml-4 pl-5 pr-5 bg-red-500"
                          onClick={() => confirmDeleteUsuario(usuario)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                   <td colSpan={5} className="text-center">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          {usuarioDialog && (
            <div>
              <h4 className="border-t border-black mt-2 text-center font-bold text-xl">
                Detalhes de Usuário
              </h4>

              <label className="ml-20 pl-20">Nome</label>
              <label className="ml-40 pl-2">Login</label>
              <label className="ml-40 mr-6 pl-4">E-mail</label>
              <label className="ml-14 pl-20">Situação</label>
              <div>
                <input
                  className="hidden"
                  type="id"
                  placeholder="Id"
                  value={usuario.id}
                  onChange={(e) => onInputChange(e, "id")}
                />

                <input
                  className="rounded-md border border-black p-1 text-center w-4/12 mr-2 text-slate-500"
                  type="text"
                  placeholder="Nome"
                  value={usuario.nome}
                  onChange={(e) => onInputChange(e, "nome")}
                />
                <input
                  className="rounded-md border border-black p-1 text-center w-20 mr-2 text-slate-500"
                  type="text"
                  placeholder="Login"
                  value={usuario.login}
                  onChange={(e) => onInputChange(e, "login")}
                />

                <input
                  className="rounded-md border border-black p-1 text-center w-4/12 text-slate-500"
                  type="email"
                  placeholder="Email"
                  value={usuario.email}
                  onChange={(e) => onInputChange(e, "email")}
                />

                <input
                  className="hidden"
                  type="password"
                  value={usuario.senha}
                  onChange={(e) => onInputChange(e, "senha")}
                />
                <input
                  className="rounded-md border border-black p-1 text-center ml-2 text-slate-500 w-20"
                  type="text"
                  value={usuario.situacao}
                  onChange={(e) => onInputChange(e, "situacao")}
                />
                <div className="flex justify-center mt-2">
                  <Button
                    className="bg-green-500 ml-4 pl-6 pr-6"
                    onClick={saveUsuario}
                  >
                    Salvar
                  </Button>
                  <Button className="bg-red-500 ml-8" onClick={hideDialog}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {deleteUsuarioDialog && (
            <div>
              <p>Você realmente deseja excluir o usuário {usuario.nome}?</p>
              <div className="flex justify-center mt-2">
                <Button
                  className="bg-orange-500 ml-4 pl-4"
                  onClick={hideDeleteUsuarioDialog}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-red-500 ml-8 pl-6 pr-6"
                  onClick={deleteUsuario}
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

export default Adm;
