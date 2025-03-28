import { Grid } from "@mui/material";
import { obtenerBoletines } from "peticiones";
import  { useState,useEffect } from 'react';
import DataTable, { TableColumn }  from 'react-data-table-component';
import { FcDataConfiguration } from "react-icons/fc";
import Swal from 'sweetalert2'
import"./boletin.css"
import Vista from "pages/misboletines/misboletines";


interface Anexo {
  id: number;
  fechacreacionAdministrativo: string;
  numeroActoadministrativo: number;
  tipodocumento: string;
  firma: string;
  descripcionDocumento: string;
  UrlDocumentAnexo: string;
  AnexoEstado: string;
}
interface Boletin {
  id: number;
  fechacreacion: string;
  consecutivo: number;
  descripcion: string;
  boletinUrl: string;
  BoletinPublicacion: string;
  Anexos: Anexo[];
}
const Boletins = () => {
  const [boletin, setBoletin] = useState<Boletin[]>([]);
 // const [estadox] = useState("PENDIENTE");
  const [errorr, setErrorr] = useState<string | null>(null);
  const [cargandor, setCargandor] = useState<boolean>(true);
    useEffect(() => {
  const cargarBoleto = async () => {
       try {
         const anexoBoletin = await obtenerBoletines(); // Obtenemos el anexo con ID 6
         setBoletin(anexoBoletin.Boletin);
         setCargandor(false);
       } catch (err:unknown) {
         setErrorr("error en consulta"); // Usamos el mensaje del error lanzado en peticiones.ts
         setCargandor(false);
       }
     };
 
     cargarBoleto();
    }, []);
    
  if (cargandor) {
    return <p>Cargando...</p>;
  }

  if (errorr) {
    return <p>{errorr}</p>;
  }

  if (!boletin) {
    return <p>No se encontró el anexo.</p>;
  }
      const columns: TableColumn<Boletin>[] = [
       
        { name: 'fecha ', selector: row => row.fechacreacion,
          sortable:true,
          cell: row => <div style={{ width: '100%',fontWeight: 'bold' }}>{row.fechacreacion}</div>,
        },
        { name: 'Consecutivo ', selector: row => row.id,
          sortable: true,
          cell: row => <div style={{ width: '100%',fontWeight: 'bold' }}>{row.id}</div>,},
        { name: 'Descripcion ', selector: row => row.descripcion,
          sortable: true,
          cell: row => <div style={{ width: '100%' ,fontWeight: 'bold'}}>{row.descripcion}</div>,},
        {
          name: 'Documento',
          cell: row => (
            <a href={row.boletinUrl} download target="_blank" rel="noopener noreferrer">
              Descargar
            </a>
          ),
        },
        { name: 'Estado ', cell: row => (
          
          <div  className={row.BoletinPublicacion ==='PENDIENTE'? `bg-orange-300 min-h-5 rounded-xl  `:`bg-green-500 min-h-5 rounded-xl `} style={{ width: '70%' , justifyContent:'center',alignItems:'center'}}>
            <p style={{ marginLeft:'10%',justifyContent:'center',padding:'2px' ,alignItems:'center'}}>
                {row.BoletinPublicacion}
                 </p></div>
        ),},
        {
          name: 'Config',
          cell: row => (
            <div>
              <button onClick={() => handleBoletin(row.id)}><FcDataConfiguration  className="text-4xl"/></button>
              
            </div>
          ),
        },
      ];

      
  const  handleBoletin =(params:number)=>{
 window.speechSynthesis.speak(new SpeechSynthesisUtterance('escoge la opcion'));
  //prossss(String(params))
  console.log(params)
  Swal.fire({
    title: `<strong>Opciones</strong> `,
    html: `
     <ul>
     <li><a href="gestionboletin/${params}" onclick="#" class="link-com-hover"> <span style="font-size: 20px;" >🕐<span> ver Boletin </a> </li>
     </ul>
      </b>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonAriaLabel: "Thumbs down"
  });
  }
  return (
    <Grid container px={3.75} spacing={3.75} color={"#000"}>
          <Grid item xs={12} md={12}>
            <Vista/>
      
      <DataTable
          columns={columns}
          data={Array.isArray(boletin)? boletin : [boletin]} // Usamos boletines aquí
          selectableRows={true}
          pagination
          paginationPerPage={6}
          fixedHeader
          onSelectedRowsChange={data => console.log(data)}
          theme="custom"
        />
 </Grid>
  </Grid>
  )
}
export default Boletins ;