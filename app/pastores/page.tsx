"use client";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, useMemo } from "react";
import { PastorService } from "@/service/PastorService";
import jsPDF from "jspdf";

interface Pastor {
  id: number;
  numero: string;
  nome: string;
  iniciais: string;
};

const checkAuth = () => {
  if (localStorage.getItem("token") != undefined) {
    console.log(localStorage.getItem);
    return true;
  } else {
    console.log("não retornou token");
    return false;
  }
};

const PastorComponent: React.FC = () => {
  const pastorVazio: Pastor = {
    id: 0,
    numero: "",
    iniciais: "",
    nome: "",
  };

  const [pastors, setPastors] = useState<Pastor[] | null>(null);
  const [pastorDialog, setPastorDialog] = useState(false);
  const [pastor, setPastor] = useState<Pastor>(pastorVazio);
  const [globalFilter, setGlobalFilter] = useState("");
  const pastorService = useMemo(() => new PastorService(), []);
  const [pageLoaded, setPageloaded] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    setAutenticado(checkAuth());
    setPageloaded(true);
  }, []);

  useEffect(() => {
    if (!pastors) {
      pastorService.listarTodos()
        .then((response) => {
          console.log("Resposta completa da API:", response);
          console.log("Dados da API:", response.data);
          setPastors(response.data);
          console.log("Pastores definidos:", response.data);
        }).catch((error) => {
          console.error("Erro ao listar Pastores:", error);
        });
    }
  }, [pastorService, pastors]);

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Configurações de layout
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const lineHeight = 10;
    const maxLinesPerPage = Math.floor((pageHeight - 60) / lineHeight); // 60 é a margem para título e rodapé
    let currentPage = 1;
    let currentLine = 0;
    let y = 30;
  
    // Função para adicionar cabeçalho
    const addHeader = () => {
      doc.setFontSize(18);
      doc.text("Relação de Pastores", margin, 22);
      doc.setFontSize(12);
      doc.text("Número", margin, 30);
      doc.text("Nome", margin + 50, 30);
      y = 40;
    };
  
    // Função para adicionar rodapé
    const addFooter = (pageNum: number) => {
      doc.setFontSize(10);
      doc.text(`Página ${pageNum}`, pageWidth - margin - 20, pageHeight - 10);
    };
  
    addHeader();
  
    if (pastors && pastors.length > 0) {
      // Coloque o código que manipula 'pastors' aqui
      pastors.forEach((pastor, index) => {
        if (currentLine === maxLinesPerPage) {
          addFooter(currentPage); // Adiciona rodapé
          doc.addPage();
          currentPage++;
          addHeader();
          currentLine = 0;
        }
    
        doc.text(pastor.numero, margin, y);
        doc.text(pastor.nome || pastor.iniciais, margin + 50, y);
        y += lineHeight;
        currentLine++;
      });
    
      addFooter(currentPage); // Adiciona o rodapé na última página
    }
    
  
    doc.save("pastores.pdf");
  };
  
//Personalização Adicional
// Margens e Espacamento: Ajuste as margens e o espaçamento para melhor se adequar ao seu layout.
// Fontes e Estilo: Use métodos como doc.setFont, doc.setFontSize, doc.setTextColor para alterar fontes e cores.
// Colunas Adicionais: Se quiser adicionar mais informações, basta inserir novos textos com coordenadas apropriadas.


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-emerald-100">
      <Image
        src="/Pastor.png"
        width={150}
        height={114}
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

      <div>  
        <h1 className="text-4xl font-serif font-bold text-sky-900">Pastores</h1>
      </div>

      <div className="crud-demo w-full max-w-4xl mt-4">
        <div className="flex-1 border-2 border-black rounded-lg bg-gray-50 px-6 pb-4 pt-2">
          <div className="relative mt-2 mb-2 border border-black rounded-lg">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              className="peer block w-full rounded-md border border-gray-400 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-900"
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}/>
          </div>
          <div>
            <table className="table-fixed w-full rounded-md border border-gray-400 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-900">
              <thead className="rounded-md border border-black">
                <tr>
                  <th className="rounded-md border border-black  w-40">
                    Número
                  </th>
                  <th className="rounded-md border border-black pl-2 pr-2 w-full">
                    Nome
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(pastors) && pastors.length > 0 ? (
                  pastors
                    .filter(
                      (pastor) =>
                        pastor.iniciais
                          .toLowerCase()
                          .includes(globalFilter.toLowerCase()) ||
                        pastor.numero.includes(globalFilter)
                    )
                    .map((pastor) => (
                      <tr key={pastor.id}>
                        <td className="rounded-md border border-black pl-4 pr-2 w-6">
                          {pastor.numero}
                        </td>
                        <td className="rounded-md border border-black pl-4 pr-2 w-6">
                          {" "}
                          {pastor.nome == null ? pastor.iniciais : pastor.nome}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td></td>
                    <td colSpan={3} className="text-center">
                      Nenhum Pastor encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={generatePDF}
              className="bg-blue-500 text-white border border-black py-2 px-4 rounded hover:bg-blue-700"
            >
              Gerar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastorComponent;
