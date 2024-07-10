'use client';
import Image from 'next/image';


export default function Page() {

 

  return (
    <>
<main className="grid grid-flow-row auto-rows-auto flex items-center justify-center mt-6 p-10 bg-emerald-100">

  <div className= "flex items-center justify-center p-1 md:w-50 ">
      <Image
        src="/PSarLogo.png"
        width={100}
        height={76}
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
<div className= "flex items-center justify-center mb-20 md:w-50">
      <h1>Verifique seu email para validar sua conta.</h1>
      </div>
     </main>
      
    </>
    
  );
}