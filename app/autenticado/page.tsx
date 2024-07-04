import Image from 'next/image';

export default function Page() {
  return (
    <div className=" pl-40 justify-center w-90">
      <p>Dashboard Page</p>
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
  );
}
