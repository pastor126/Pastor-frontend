'use client'
import React, { useState } from 'react';
import { AtSymbolIcon, PhoneIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { ContatoService } from '@/service/ContatoService';
// Para uso do link
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const contatoService = new ContatoService();

export default function InserirContatoForm() {
  const [falacomigo, setFalacomigo] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Resetar erro antes de tentar nova Mensagem
    router.push('/autenticado'); // ou localStorage.removeItem('token') se quiser remover apenas o token
    try {
      const response = await contatoService.inserir(falacomigo);
      // Redirecionar ou mostrar mensagem de sucesso
      if (response) {
        router.push('/contato'); // Redireciona para a página autorizada
      } else {
        setError('Erro ao enviar mensagem'); // Define mensagem de erro
      }
    } catch (error) {
      setError('Erro ao enviar mensagem'); // Define mensagem de erro em caso de exceção
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFalacomigo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 border-2 border-black rounded-lg bg-gray-50 px-6 pt-2">
        <h1 className="mb-6 mt-6 pl-20 ml-80 text-4xl font-medium">
          Fala comigo!
        </h1>
        <p className="mb-2 mt-6 pl-20 ">Envie aqui correções, dúvidas ou sugestões. Se preciso entraremos em contato. Grato!</p>

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
                value={falacomigo.nome}
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
                value={falacomigo.email}
                onChange={handleChange}
              />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

            </div>
          </div>
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="telefone">
              Telefone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="telefone"
                type="tel"
                pattern="[0-9]{9}"
                name="telefone"
                placeholder="Apenas números (9 números)"
                required
                value={falacomigo.telefone}
                onChange={handleChange}
              />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

            </div>
          </div>
          <div>
            <label className="mt-2 block text-lg text-gray-700" htmlFor="mensagem">
              Mensagem
            </label>
            <div className="relative">
              <textarea
                className="peer block w-full rounded-md border border-gray-400 border-2 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="mensagem"
                name="mensagem"
                placeholder="Entre com sua mensagem"
                required
                minLength={4}
                value={falacomigo.mensagem}
                onChange={(e) =>
                  setFalacomigo({ ...falacomigo, mensagem: e.target.value })
                }
              />
              <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
