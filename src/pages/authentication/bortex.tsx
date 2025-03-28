import axios from "axios";
import { array } from "constexpert";
export interface Dependencex {
    id: number;
    code: string;
    description:string;
  }
 export interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    dependenci: number | ''; // Ajustado para ser number o ''
    Rol: string;
  }
export const universal = async () => {
    try {
      const response = await axios.get<Dependencex[]>(array.dependence);
      return response.data
    } catch (err) {
      return err
    }
  };

  export const parametrixsend = async (datosfor:User)=>{
    try {
        const respuesta = await axios.post(array.usenduse, datosfor);
        console.log('Datos enviados con éxito:', respuesta.data);
        return respuesta.data;
      } catch (err: any) {
        console.error('Error al enviar los datos:', err);
      }
  }

