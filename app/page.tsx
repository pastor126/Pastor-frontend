'use client';
import Image from 'next/image';
import { TagIcon,} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/autenticado', icon: TagIcon },
  
];

export default function Page() {

  const pathname = usePathname();

  return (
    <>
<main className="grid grid-flow-row auto-rows-auto flex items-center justify-center mt-6 p-10 bg-emerald-100">
<div className= "flex items-center justify-center text-200  ">
  <h1 className='text-7xl fonte-serif decoration-4 font-semibold	'>Galeria dos Pastores</h1></div>
  <div className= "flex items-center justify-center p-8 md:w-50 ">
      <Image
        src="/PSarLogo.png"
        width={200}
        height={152}
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
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3',
              {
               'bg-emerald-100 text-blue-600' : pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-10" />
            <p className="hidden md:block">Faça seu Login</p>
          </Link>
        );
      })}
      </div>
     </main>
      
    </>
    
  );
}