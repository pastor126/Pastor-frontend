// GeralService.ts
import axiosInstance from 'axios';

export class GeralService {
  protected readonly baseUrl: string;
  private static token: string = '';

  constructor(endpoint: string) {
    this.baseUrl = `https://galeria-dos-pastores-production.up.railway.app${endpoint}`;
    this.loadToken(); // Carrega o token ao construir a instância de GeralService
    console.log(this.baseUrl);
    console.log(this.loadToken);
  }

  static setToken(newToken: string) {
    GeralService.token = newToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken); // Salva o token no localStorage
    }
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      const localStorageToken = localStorage.getItem('token');
     
      if (localStorageToken) {
        GeralService.token = localStorageToken;
      }else{
        console.log('Não carregou token');
      }
    }else{
      console.log( 'passou aqui');
    }
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
