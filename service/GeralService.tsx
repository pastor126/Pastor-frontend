import React, { useState, useEffect } from 'react'; // Import React and hooks
import axiosInstance from "axios";


const MyComponent = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('authToken');
    setToken(localStorageToken || '');
  }, []);}
class GeralService {
  
  private readonly baseUrl: string;
 
  

  constructor(endpoint: string) {
    this.baseUrl = `https://galeria-dos-pastores-production.up.railway.app${endpoint}`;
    
  }



  listarTodos(): Promise<any> {
    return axiosInstance.get(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${MyComponent}`,
      },
    });
  }

  buscarPorId(id: number): Promise<any> {
    return axiosInstance.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${MyComponent}`,
      },
    });
  }

  inserir(dados: any): Promise<any> {
    return axiosInstance.post(this.baseUrl, dados, {
      headers: {
        Authorization: `Bearer ${MyComponent}`,
      },
    });
  }

  alterar(id: number, dados: any): Promise<any> {
    return axiosInstance.put(`${this.baseUrl}/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${MyComponent}`,
      },
    });
  }

  excluir(id: number): Promise<any> {
    return axiosInstance.delete(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${MyComponent}`,
      },
    });
  }
}

// Wrap the class in a React functional component
const GeralServiceWithToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('authToken');
    setToken(localStorageToken || '');
  }, []);

  // Create an instance of GeralService with the updated token state
  const service = new GeralService('/api'); // Assuming your endpoint starts with '/api'

  return (
    <div>
      {/* Use the service instance with updated token here */}
      {service.listarTodos()}
      {/* ... other methods */}
    </div>
  );
};

export default GeralService;
