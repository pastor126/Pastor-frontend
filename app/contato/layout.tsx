'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
import { useEffect, useState } from "react";




const checkAuth = () => {
  if(localStorage.getItem('token') != undefined){
    console.log(localStorage.getItem);
    return true;
  }else{
    console.log('não retornou token');
    return false;
  }

};

 
export default function Layout({ children }: { children: React.ReactNode }) {

  
  const [pageLoaded, setPageloaded] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    setAutenticado(checkAuth());
    setPageloaded(true);
  }, []);


  return (
    <div>
      {autenticado ?
   
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-2">{children}</div>
    </div>
    : <div className="flex h-screen text-4xl md:flex-row ml-20 pl-20"><a href="/login">Faça o Login!</a></div>}
    </div>
  );
}