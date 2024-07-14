import axios from "axios";

// Configurar a instância do Axios com uma URL base
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API
  

})

export class GeralService {
    url: string;

    constructor(url: string) {
        this.url = url;

        // Envia o token no cabeçalho da requisição
        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('TOKEN_APLIC_FRONTEND');
            const authRequestToken = token ? `Bearer ${token}` : '';
            config.headers['Authorization'] = authRequestToken;
            return config;
        }, (error) => Promise.reject(error));
        

        // Trata respostas e erros de autenticação
        axiosInstance.interceptors.response.use((response) => {
            return response;
        }, async (erro) => {
            const originalConfig = erro.config;
            console.log(erro.response.status);
            if (erro.response.status === 401) {
                localStorage.removeItem('TOKEN_APLIC_FRONTEND');
                window.location.reload();
            }
            return Promise.reject(erro);
        });
    }

    // Métodos para realizar operações CRUD
    listarTodos() {
        return axiosInstance.get(this.url);
    }

    buscarPorId(id: number) {
        return axiosInstance.get(`${this.url}/${id}`);
    }

    inserir(objeto: any) {
        return axiosInstance.post(this.url, objeto);
    }

    alterar(objeto: any) {
        return axiosInstance.put(this.url, objeto);
    }

    excluir(id: number) {
        return axiosInstance.delete(`${this.url}/${id}`);
    }
}
