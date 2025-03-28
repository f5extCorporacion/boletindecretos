import axios, { AxiosResponse } from 'axios';


interface Anexo {
  AnexoEstado: string;
  AnexoOpciones: string;
  AnexoPublicacion: string;
  UrlDocumentAnexo: string;
  boletinesId: number;
  created_at: string;
  dependencia: number;
  descripcionDocumento: string;
  fechacreacionAdministrativo: string;
  firma: string;
  id: number;
  numeroActoadministrativo: number;
  opcional1: string;
  opcional2: string;
  opcional3: string;
  tipodocumento: string;
}

interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface Boletin {
  BoletinPublicacion: string;
  OpcionesBoletin: string;
  Usuario: Usuario;
  boletinUrl: string;
  consecutivo: number;
  created_at: string;
  descripcion: string;
  fechacreacion: string;
  id: number;
  opcional2: string;
  opcional3: string;
  status: string;
  usuarioId: number;
  Anexos: Anexo[];
}

export const getParametros = async (Parameter: string | number): Promise<Boletin | Boletin[]> => {
  try {
    const id = typeof Parameter === 'string' ? parseInt(Parameter, 10) : Parameter;

    if (isNaN(id)) {
      throw new Error('El parámetro no es un número válido.');
    }

    const respuesta: AxiosResponse<Boletin | Boletin[]> = await axios.get(
      `http://localhost:3001/api/boletines/${id}/prox`
    );

    //console.log('Datos del boletín peticion:', respuesta.data);
    return respuesta.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios al obtener el boletín prox:', error.message);
      if (error.response) {
        console.error('Datos de la respuesta:', error.response.data);
      }
    } else {
      console.error('Error al obtener el boletín prox:', error);
    }
    throw error;
  }
};