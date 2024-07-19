import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';

import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-5">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="flex items-center justify-center w-32 text-white md:w-40">
        {/* <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"> */}
        <Image
        src="/PSarLogo.png"
        width={100}
        height={76}
        className="hidden md:block"
        alt="Imagem para desktop version"
      />
        <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Imagem para mobile version"
      />
        {/* </div> */}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow mb-6 items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" stroke="red" />
            <div className="hidden md:block text-red-700 text-xl"><a href="/">Sair</a></div>
          </button>
        </form>
      </div>
    </div>
  );
}
