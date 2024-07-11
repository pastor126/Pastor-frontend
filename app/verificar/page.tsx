'use client';
import Image from 'next/image';


export default function Page() {

 

  return (
    <>
<main className="grid grid-flow-row  flex  h-screen items-center justify-center p-20 bg-emerald-100">

  <div className= "flex items-center justify-center md:w-50 ">
      <Image
        src="/PSarLogo.png"
        width={150}
        height={114}
        className="hidden md:block"
        alt="Imagem para desktop version"
      />
      <Image
        src="/PSarLogo.png"
        width={100}
        height={76}
        className="block md:hidden"
        alt="Imagem para mobile version"
      />
      
    </div>
<div className= "flex items-center justify-center">
      <h1 className="text-2xl h-6">Verifique seu email para validar sua conta.</h1>
      </div>
      <div className= "flex items-center justify-center h-4 ">
      <a className= "hover:text-blue-900" href="/">Ir para a página principal</a>
      </div>
     </main>
      
    </>
    
  );
}