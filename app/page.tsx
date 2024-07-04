'use client';
import Image from 'next/image';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/autenticado', icon: HomeIcon },
  {
    name: 'Pastores',
    href: '/autenticado/pastores',
    icon: UserGroupIcon,
  },
  { name: 'pastoresHonorarios', href: '/autenticado/pastoresHonorarios', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <>
 <div className=" pl-40 justify-center w-90">
      <Image
        src="/PSarLogo.png"
        width={100}
        height={76}
        className="hidden md:block"
        alt="Imagem para desktop version"
      />
      <Image
        src="/PSarLogo.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Imagem para mobile version"
      />
      
    </div>

      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}