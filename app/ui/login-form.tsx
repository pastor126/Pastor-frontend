import React, { useState } from 'react';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { LoginService } from '@/service/LoginService';
import { useRouter } from 'next/navigation';


const loginService = new LoginService();

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Resetar erro antes de tentar login
    localStorage.clear(); // ou localStorage.removeItem('token') se quiser remover apenas o token
    try {
      const response = await loginService.login(login, password);
      // Redirecionar ou mostrar mensagem de sucesso
      if (response.data.token && response.data.token !== 'Acesso negado') {
        localStorage.setItem('token', response.data.token); // Armazena o token 
        router.push('/autenticado'); // Redireciona para a página autorizada
      } else {
        setError('Login ou senha inválidos'); // Define mensagem de erro
      }
    } catch (error) {
      setError('Login ou senha inválidos'); // Define mensagem de erro em caso de exceção
      console.error('Erro no login', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 border-4 border-black rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl font-medium`}>
          Faça o Login para continuar.
        </h1>
        <div className="w-full">
          <div>
            <label className="mb-1 mt-4 block text-lg text-gray-700" htmlFor="login">
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 mt-3 block text-lg text-gray-700" htmlFor="password">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="flex h-8  space-x-1text-blue-500 hover:underline">
          <a href="/novoUsuario">Faça seu cadastro</a>
      
        </div>
        </div>

  {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <Button className="mt-4 w-full" type="submit">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
    );
}
