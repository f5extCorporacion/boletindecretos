// components/autentica/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { array } from 'constexpert';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  userLog: () => void;
  isUser: Userxxlink | null;
}

interface TokenValidationResponse {
  usuario: Userxxlink;
}

interface Userxxlink {
  id: number;
  name: string;
  email: string;
  dependenci: string;
  Rol: string;
  status: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<Userxxlink | null>(null);

  useEffect(() => {
    const sha1 = Cookies.get('xklsjadlsao');
    const sha2 = Cookies.get('xklsjadlsaoa');
    const sha3 = Cookies.get('xklsjadlsaodw');
    
    if (sha1 && sha2 && sha3) {
      setIsAuthenticated(true);
    }

    const validate = async () => {
      const mrx = `${sha1}.${sha2}.${sha3}`;
      try {
        const response: AxiosResponse<TokenValidationResponse> = await axios.post(
          array.validarToken,
          {},
          {
            headers: {
              Authorization: `Bearer ${mrx}`,
            },
          }
        );
        //console.log('Token válido:', response.data.usuario);
        setIsUser(response.data.usuario);
        localStorage.setItem("electron",JSON.stringify( response.data.usuario.id));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            console.error('Token inválido');
          }
        }
      }
    };

    validate();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    Cookies.set('authToken', 'true', { expires: 7 });
  };

  const logout = () => {
    setIsAuthenticated(false);
    
     Cookies.remove('xklsjadlsao');
     Cookies.remove('xklsjadlsaoa');
     Cookies.remove('xklsjadlsaodw');
    setIsUser(null);
    window.location.reload()
  };

  const userLog = () => {
    console.log(isUser);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userLog, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
