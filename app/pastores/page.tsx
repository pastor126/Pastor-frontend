import Image from 'next/image';

export default function Page() {
  return (
    <div className=" pl-40 justify-center w-90">
     
      <Image
        src="/Pastor.png"
        width={300}
        height={228}
        className="hidden md:block"
        alt="Imagem para desktop version"
      />
      <Image
        src="/Pastor.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Imagem para mobile version"
      />
       <p className="pl-20 justify-center w-90">Pastores aqui</p>
      
    </div>
  );
}
