import axiosInstance from "axios";

class GeralService {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(endpoint: string) {
    this.baseUrl = `https://galeria-dos-pastores-production.up.railway.app${endpoint}`;
    const localStorageToken = localStorage.getItem('authToken');
    this.token = localStorageToken || ''; // Use empty string if no token found
  }

  listarTodos(): Promise<any> {
    return axiosInstance.get(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  buscarPorId(id: number): Promise<any> {
    return axiosInstance.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  inserir(dados: any): Promise<any> {
    return axiosInstance.post(this.baseUrl, dados, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  alterar(id: number, dados: any): Promise<any> {
    return axiosInstance.put(`${this.baseUrl}/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  excluir(id: number): Promise<any> {
    return axiosInstance.delete(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}

export default GeralService;
