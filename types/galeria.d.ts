declare namespace Galeria {
    
    type Usuario = {
        id?: number;
        nome: string;
        login: string;
        senha: string;
        email: string;
    };

    type Falecomigo = {
        telefone: number;
        nome: string;
        email: string;
        mensagem: string;
      };


    type Recurso = {
        id?: number;
        nome: string;
        chave: string;
    }

    type Perfil = {
        id?: number;
        descricao: string;
    }

    type PerfilUsuario = {
        id?: number;
        perfil: Perfil;
        usuario: Usuario;
    }

    type PermissaoPerfilRecurso = {
        id?: number;
        perfil: Perfil;
        recurso: Recurso;
    }
}