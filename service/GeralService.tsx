// GeralService.ts
import axiosInstance from 'axios';

export class GeralService {
  protected readonly baseUrl: string;
  private static token: string = '';

  constructor(endpoint: string) {
    this.baseUrl = `https://galeria-dos-pastores-production.up.railway.app${endpoint}`;
  }

  static setToken(newToken: string) {
    GeralService.token = newToken;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${GeralService.token}`,
    };
  }

  listarTodos(): Promise<any> {
    return axiosInstance.get(this.baseUrl, {
      headers: this.getHeaders(),
    });
  }

  buscarPorId(id: number): Promise<any> {
    return axiosInstance.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  inserir(dados: any): Promise<any> {
    return axiosInstance.post(this.baseUrl, dados, {
      headers: this.getHeaders(),
    });
  }

  alterar(id: number, dados: any): Promise<any> {
    return axiosInstance.put(`${this.baseUrl}/${id}`, dados, {
      headers: this.getHeaders(),
    });
  }

  excluir(id: number): Promise<any> {
    return axiosInstance.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
