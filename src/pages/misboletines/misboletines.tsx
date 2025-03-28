
 import { useAuth } from "components/autentica/AuthContext";
import"./mis.css"
 import { AiFillCrown } from "react-icons/ai"
 import { AiFillContainer } from "react-icons/ai";
 import { AiFillExperiment } from "react-icons/ai";
 import  { useState, useEffect } from 'react';
 import { AiFillEye } from "react-icons/ai";
 
 const CardsMenu = () => {
    const{isUser} = useAuth()
    const [hora, setHora] = useState(new Date());
    useEffect(() => {
        const intervalo = setInterval(() => {
          setHora(new Date());
        }, 1000); // Actualiza cada segundo
    
        return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
      }, [])
      const horaFormateada = hora.toLocaleTimeString();
    return (
      <div className="cards">
        <div>
            <div className="items">
                <span className="icons"> <p>Datos de Usuario</p><AiFillCrown className="ic"/></span>
                <ul>
                    <li>{isUser?.name}</li>
                    <li>{isUser?.Rol}</li>
                    <li>{isUser?.email}</li>
                </ul>
            </div>
        </div>

        <div>
        <div className="items">
                <span className="icons"><AiFillContainer className="ic"/><p> Mis Boletines</p></span>
                <ul>
                    <li>
                       <a href="/base/pages/misboletines"> <AiFillEye className="eye"/></a>
                        </li>
                </ul>
            </div>
        </div>
        <div>
        <div className="items">
                <span className="icons"> <AiFillExperiment className="ic"/><p> información</p></span>
                <ul className="eyebol">
                    <li className="hora">Hora : {horaFormateada}</li>
                </ul>
            </div>
        </div>
      </div>
    )
  }
 const Misboletines = () => {
  return (
    <div className="misboleines">
      
    </div>
  )
}


 const Vista =()=>{
return(
    <>
    <CardsMenu/>
    <Misboletines/>
    </>
)
}
export default Vista;
