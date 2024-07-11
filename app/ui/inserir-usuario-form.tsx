import React, { useState } from 'react';
import { AtSymbolIcon, KeyIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { UsuarioService } from '@/service/UsuarioService';
// Para uso do link
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const usuarioService = new UsuarioService();

export default function InserirUsuarioForm() {
  const [usuario, setUsuario] = useState({ nome: '', login: '', email: '', senha: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Resetar erro antes de tentar novoUsuario
    localStorage.clear(); // ou localStorage.removeItem('token') se quiser remover apenas o token
    try {
      const response = await usuarioService.inserir(usuario);
      // Redirecionar ou mostrar mensagem de sucesso
      if (response) {
        router.push('/verificar'); // Redireciona para a página autorizada
      } else {
        setError('Erro ao cadastrar novo usuário'); // Define mensagem de erro
      }
    } catch (error) {
      setError('Erro ao cadastrar novo usuário'); // Define mensagem de erro em caso de exceção
      console.error('Erro no cadastro de usuário', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 border-2 border-black rounded-lg bg-gray-50 px-6 pt-2">
        <h1 className="mb-3 text-2xl font-medium">
          Insira os dados para novo usuário.
        </h1>

        <div className="w-full">
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="nome">
              Nome
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="nome"
                type="text"
                name="nome"
                placeholder="Entre com seu nome"
                required
                value={usuario.nome}
                onChange={handleChange}
              />
              <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="login">
              Login
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="login"
                type="text"
                name="login"
                placeholder="Entre com seu login"
                required
                value={usuario.login}
                onChange={handleChange}
              />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Entre com seu email"
                required
                value={usuario.email}
                onChange={handleChange}
              />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="senha">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="senha"
                type="password"
                name="senha"
                placeholder="Entre com sua senha"
                required
                minLength={4}
                value={usuario.senha}
                onChange={handleChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
<div className="flex w-full ">
   <Button className="mt-2 mb-1 ml-20 px-6 text-x" type="submit">
          Salvar
        </Button>
        
            <a className=" text-m font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 border-2 rounded-md  border-black ml-10 bg-red-500 mt-2 mb-1 px-2 flex items-center w-30" href='/'>
          Cancelar 
        </a> 
</div>
       
        
      </div>
    </form>
  );
}
