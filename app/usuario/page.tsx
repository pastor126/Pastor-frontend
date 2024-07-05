'use client';
import { Button } from '../ui/button';
import React, { useEffect, useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { UsuarioService } from '@/service/UsuarioService';

interface Usuario {
    id: number;
    nome: string;
    login: string;
    senha: string;
    email: string;
}

const Usuario = () => {
    const usuarioVazio: Usuario = {
        id: 0,
        nome: '',
        login: '',
        senha: '',
        email: ''
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [usuario, setUsuario] = useState<Usuario>(usuarioVazio);
    const [selectedUsuarios, setSelectedUsuarios] = useState<Usuario[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const usuarioService = useMemo(() => new UsuarioService(), []);

    useEffect(() => {
        usuarioService.listarTodos()
            .then((response) => {
                console.log('Resposta completa da API:', response);
                console.log('Dados da API:', response.data);
                if (Array.isArray(response.data)) {
                    setUsuarios(response.data);
                    console.log('Usuários definidos:', response.data);
                } else {
                    console.error('A resposta não é um array:', response.data);
                }
            }).catch((error) => {
                console.error('Erro ao listar usuários:', error);
            });
    }, [usuarioService]);
    

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

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };

    const saveUsuario = async () => {
        setSubmitted(true);

        if (!usuario.id) {
            try {
                const res = await fetch('/api/usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuario),
                });
                const data = await res.json();
                setUsuarios((prevUsuarios) => [...prevUsuarios, data.data]);
                setUsuarioDialog(false);
                setUsuario(usuarioVazio);
            } catch (error) {
                console.error('Erro ao salvar usuário', error);
            }
        } else {
            try {
                const res = await fetch(`/api/usuarios/${usuario.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuario),
                });
                const data = await res.json();
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((u) => (u.id === usuario.id ? data.data : u))
                );
                setUsuarioDialog(false);
                setUsuario(usuarioVazio);
            } catch (error) {
                console.error('Erro ao atualizar usuário', error);
            }
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
        try {
            await fetch(`/api/usuarios/${usuario.id}`, {
                method: 'DELETE',
            });
            setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((u) => u.id !== usuario.id)
            );
            setDeleteUsuarioDialog(false);
            setUsuario(usuarioVazio);
        } catch (error) {
            console.error('Erro ao deletar usuário', error);
        }
    };

    const deleteSelectedUsuarios = async () => {
        const idsToDelete = selectedUsuarios.map((u) => u.id);
        try {
            await Promise.all(
                idsToDelete.map((id) =>
                    fetch(`/api/usuarios/${id}`, {
                        method: 'DELETE',
                    })
                )
            );
            setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((u) => !idsToDelete.includes(u.id))
            );
            setDeleteUsuariosDialog(false);
            setSelectedUsuarios([]);
        } catch (error) {
            console.error('Erro ao deletar usuários', error);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = e.target.value;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: val,
        }));
    };

    return (
        <div className="crud-demo">
            <div className="flex-1 border-4 border-black rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className='flex'>
                    <Button className="mt-4 w-40 m-2" onClick={openNew}>Novo</Button>
                    <Button className="mt-4 w-40 m-2 bg-red-500" onClick={() => setDeleteUsuariosDialog(true)} disabled={!selectedUsuarios.length}>
                        Excluir Selecionados
                    </Button>
                </div>

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
                    <thead className=" rounded-md border border-black  ">
                        <tr>
                            <th>
                                <input className='ml-3 mr-3'
                                    type="checkbox"
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        if (checked) {
                                            setSelectedUsuarios(usuarios);
                                        } else {
                                            setSelectedUsuarios([]);
                                        }
                                    }}
                                />
                            </th>
                            <th className=" rounded-md border border-black pl-2 pr-2">Código</th>
                            <th className=" rounded-md border border-black pl-2 pr-2 w-80">Nome</th>
                            <th className="rounded-md border border-black pl-2 pr-2 w-40">Login</th>
                            <th className="rounded-md border border-black pl-2 pr-2 w-80">Email</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(usuarios) && usuarios.length > 0 ? (
                            usuarios
                                .filter((usuario) =>
                                    usuario.nome.toLowerCase().includes(globalFilter.toLowerCase())
                                )
                                .map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedUsuarios.includes(usuario)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setSelectedUsuarios((prevSelected) =>
                                                        checked
                                                            ? [...prevSelected, usuario]
                                                            : prevSelected.filter((u) => u.id !== usuario.id)
                                                    );
                                                }}
                                            />
                                        </td>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.login}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <Button onClick={() => editUsuario(usuario)}>Editar</Button>
                                            <Button onClick={() => confirmDeleteUsuario(usuario)}>Excluir</Button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Nenhum usuário encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {usuarioDialog && (
                    <div>
                        <h4>Detalhes de Usuário</h4>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={usuario.nome}
                            onChange={(e) => onInputChange(e, 'nome')}
                        />
                        <input
                            type="text"
                            placeholder="Login"
                            value={usuario.login}
                            onChange={(e) => onInputChange(e, 'login')}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={usuario.senha}
                            onChange={(e) => onInputChange(e, 'senha')}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={usuario.email}
                            onChange={(e) => onInputChange(e, 'email')}
                        />
                        <Button onClick={hideDialog}>Cancelar</Button>
                        <Button onClick={saveUsuario}>Salvar</Button>

                    </div>
                )}

                {deleteUsuarioDialog && (
                    <div>
                        <p>Você realmente deseja excluir o usuário {usuario.nome}?</p>
                        <Button onClick={hideDeleteUsuarioDialog}>Não</Button>
                        <Button onClick={deleteUsuario}>Sim</Button>
                    </div>
                )}

                {deleteUsuariosDialog && (
                    <div>
                        <p>Você realmente deseja excluir os usuários selecionados?</p>
                        <Button onClick={hideDeleteUsuariosDialog}>Não</Button>
                        <Button onClick={deleteSelectedUsuarios}>Sim</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Usuario;
