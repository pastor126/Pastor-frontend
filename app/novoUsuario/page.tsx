'use client';
import Image from 'next/image';
import { TagIcon,} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import InserirUsuarioForm from '../ui/inserir-usuario-form';


export default function Page() {

  const pathname = usePathname();

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
      <InserirUsuarioForm></InserirUsuarioForm>
      </div>
     </main>
      
    </>
    
  );
}