import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center m-4">
        <Image
          src="/Pastor.png"
          width={200}
          height={76}
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
      </div>

      <div className="text-center max-w-3xl bg-white shadow-md rounded-md">
        <h1 className="text-4xl mb-4 font-serif font-bold text-sky-900">Galeria dos Pastores</h1>
        <p className="text-2xl font-bold mb-6 italic">
          &quot;De acordo com a tradição, espera-se que o detentor deste título seja adestrado, amigo, legal, vigilante e se necessário ... agressivo.&quot;
        </p>
      </div>

      <div className=" max-w-3xl bg-white shadow-md rounded-md mt-4">
        <h1 className="text-center text-3xl mb-4 font-serif  text-red-600">Avisos</h1>
        <p className="text-xl  mb-6 px-10">
          Aqui estarão as notícias links e avisos.
        </p>
      </div>

    </div>
  );
}
