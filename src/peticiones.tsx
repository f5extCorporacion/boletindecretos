import axios, {  AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { array } from './constexpert';

// Tipado para los valores de sendUser
interface UserData {
  valores:[];// Ajusta esto según la estructura real de tus datos
}

// Tipado para la respuesta de loginUser
interface LoginResponse {
  success: boolean;
  mensaje: string;
}

interface formData {
  tipoDocumento: string;
  dependencia: string;
  fechaDocumento: string; // Asegúrate de que el formato coincida con tu backend
  numeroActo: string;
  firma: string;
  anexo: File | null; // Cambiado para aceptar null
  descripcion: string;
}
interface Userxx {
  user: []; 
}
interface Userxx {
  array: []; 
}
// Interfaces (las mismas que antes)
export interface Anexo {
  id: number;
  fechacreacionAdministrativo: string;
  numeroActoadministrativo: number;
  tipodocumento: string;
  firma: string;
  descripcionDocumento: string;
  dependencia: number;
  UrlDocumentAnexo: string;
  opcional1: string;
  opcional2: string;
  opcional3: string;
  boletinesId: number;
  AnexoEstado: string;
  AnexoPublicacion: string;
  AnexoOpciones: string;
  created_at: string;
 
}
//Boletin/*
export interface Boletin {
  id: number;
  fechacreacion: string;
  consecutivo: number;
  descripcion: string;
  boletinUrl: string;
  BoletinPublicacion: string;
  Anexos: Anexo[];
  Usuario: Usuario;
}
/*
interface Boletinss {
  Boletin: Boletin[];
}*/
export interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  dependenci: number;
  Rol: string;
  status: string;
  created_at: string;
  Dependence: Dependence;
}
export interface Dependence {
  id: number;
  code: string;
  description: string;
}
export interface Dependence2 {
  id: number;
  code: string;
  description: string;
}
interface BoletinResponse {
  Boletin: Boletin[]; // La API devuelve un objeto con la clave 'Boletin'
}/*
interface Parametros{
  parametros :Number;
}*/
// create use
export const sendUser = async (valores: UserData): Promise<AxiosResponse<Userxx> | undefined> => {
  try {
    const response = await axios.post(array.usuarios, valores, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return undefined; // O lanza el error si prefieres
  }
};
/*login user */
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(array.usuariosLog, { 
      email,
      password,
    });

    const { mensaje, sha1, sha2, sha3 } = response.data;

    if (mensaje === 'Login exitoso') {
      Cookies.set('xklsjadlsao', sha1, { expires: 1 });
      Cookies.set('xklsjadlsaoa', sha2, { expires: 1 });
      Cookies.set('xklsjadlsaodw', sha3, { expires: 1 });
      return { success: true, mensaje };
      
    }

    return { success: false, mensaje };
  } catch (error: unknown) {
    return {
      success: false,
      mensaje: 'Error en la autenticación',
    };
  }
};
/*sendAnexo */
export const enviarDatos = async (formData: formData) => {
  const idUsuarioString = localStorage.getItem("electron");
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('tipoDocumento', formData.tipoDocumento);
    formDataToSend.append('dependencia', formData.dependencia);
    formDataToSend.append('fecha', formData.fechaDocumento);
    formDataToSend.append('acto', formData.numeroActo);
    formDataToSend.append('firma', formData.firma);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('idusuario', `${idUsuarioString}`);
  
    if (formData.anexo) {formDataToSend.append('anexo', formData.anexo);}
    const response = await axios.post(array.anexosend, formDataToSend, {
      headers: {'Content-Type': 'multipart/form-data', },});
    console.log('Respuesta del servidor:', response.data);
    window.location.reload()
    // Manejar la respuesta aquí (por ejemplo, mostrar un mensaje de éxito)
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
  }
};
// Función para obtener un anexo por ID
export const obtenerAnexo = async (): Promise<Anexo> => {
  try {
    const response: AxiosResponse<Anexo> = await axios.get(array.getanexo);
    return response.data;
  } catch (err) {
    throw new Error('Error al obtener el anexo.');
  }
};

// Función para obtener un anexo por ID
export const obtenerBoletines = async (): Promise< BoletinResponse> => {
  try {
    const response: AxiosResponse< BoletinResponse> = await axios.get(array.getboletin);
    return response.data;
  } catch (err) {
    throw new Error('Error al obtener el BOletines.');
  }
};
export const getDependences = async () => {
  try {
    const response = await axios.get(array.dependence);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo dependencias:", error);
    throw error;
  }
};
