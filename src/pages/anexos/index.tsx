import { Grid,  Typography,  } from "@mui/material";
import { enviarDatos, getDependences } from 'peticiones';
import  { useState,ChangeEvent, FormEvent,useEffect } from 'react';
import { obtenerAnexo,Anexo } from 'peticiones';
import DataTable, { TableColumn ,createTheme}  from 'react-data-table-component';


 
interface FormData {
  tipoDocumento: string;
  dependencia: string;
  fechaDocumento: string;
  numeroActo: string;
  firma: string;
  anexo: File | null;
  descripcion: string;
 
}
export interface Dependence3 {
  id: number;
  code: string;
  description: string;
}
createTheme('custom', {
  rows: {
    style: {
      minHeight: '48px',
    },
    conditionalStyles: [
      {
        when: (row: Anexo) => row.AnexoEstado === 'EN_REVISION', // Tipado explícito de row
        style: {
          backgroundColor: 'yellow',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: (row: Anexo) => row.AnexoEstado === 'APROBADO', // Tipado explícito de row
        style: {
          backgroundColor: 'green',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    ],
  },
});


 const Anexos = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anexo, setAnexo] = useState<Anexo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [dependeciaa, setDependeciaa] = useState([]);
  
  //const {isUser}  = useAuth()
  const [formData, setFormData] = useState<FormData>({
    tipoDocumento: '',
    dependencia: '',
    fechaDocumento: '',
    numeroActo: '',
    firma: '',
    anexo: null,
    descripcion: '',
  });
 
  const handleOpenModal = () => {
    setIsOpen(true);
  };
 

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files?: FileList };
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await enviarDatos(formData);//send data
      console.log("Datos enviados con éxito", formData);
      handleCloseModal();
    } catch (error) {
      console.error("Error en el envío:", error);
    }
  };
  const depennnn = async ()=>{
    const depent = await getDependences()
    setDependeciaa(depent) 
  }
  useEffect(() => {
    const cargarAnexo = async () => {
      try {
        const anexoRecibido = await obtenerAnexo(); // Obtenemos el anexo con ID 6
        setAnexo(anexoRecibido);
        setCargando(false);
        
        
      } catch (err:unknown) {
        setError("error en consulta"); // Usamos el mensaje del error lanzado en peticiones.ts
        setCargando(false);
      }
    };
    depennnn()
    cargarAnexo();
    
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!anexo) {
    return <p>No se encontró el anexo.</p>;
  }
    const columns: TableColumn<Anexo>[] = [
     
      { name: 'fecha ', selector: row => row.fechacreacionAdministrativo,
        sortable:true,
        cell: row => <div style={{ width: '100%' ,fontWeight: 'bold'}}>{row.fechacreacionAdministrativo}</div>,
      },
      {
        name: 'Tipo',
        selector: row => row.tipodocumento,
        sortable: true,
        cell: row => <div style={{ width: '100%' ,fontWeight: 'bold'}}>{row.tipodocumento}</div>,
      },
      { name: 'Descripcion ', 
        selector: row => row.descripcionDocumento,
        sortable: true,
        cell: row => <div style={{ width: '100%' ,fontWeight: 'bold'}}>{row.descripcionDocumento}</div>,
      },
      {
        name: 'Documento',
        cell: row => (
          <a href={row.UrlDocumentAnexo} download target="_blank" rel="noopener noreferrer" style={{ marginLeft:'10%',justifyContent:'center',padding:'2px',fontSize:'10px' ,fontWeight: 'bold'}}>
            Descargar
          </a>
        ),
      },
      { name: 'Estado Documento',  cell: row => (
        <div  className={row.AnexoEstado ==='EN_REVISION'? `bg-orange-300 min-h-5 rounded-xl  `:`bg-green-400 min-h-5 rounded-xl `} style={{ width: '120px' }}>
        <p style={{ marginLeft:'10%',justifyContent:'center',padding:'2px',fontSize:'10px' ,fontWeight: 'bold'}}> {row.AnexoEstado}</p></div> )},
    ];
  return (
    <>
    <Grid container px={3.75} spacing={3.75}>
      <Grid item  xs={12} md={12}>
      <button
        onClick={handleOpenModal}
        className="rounded-full bg-blue-500 text-white w-12 h-12 text-2xl"
      >
        + 
          </button>
          {isOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-1/2">
                <span
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-2xl cursor-pointer"
                >
                  &times;
                </span>
                <div className="flex justify-between items-start">
        <div>
            <h2 className="text-2xl font-bold mb-4">Formulario</h2>
        </div>
        <div onClick={()=>handleCloseModal()}>cerra x </div>
    </div>
           
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo de Documento:
                </label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3">
                  <option value="DECRETO">DECRETO</option>
                  <option value="CONTRATO">CONTRATO</option>
                  <option value="RESOLUCION">RESOLUCION</option>
                  <option value="ACUERDO">ACUERDO</option>
                  <option value="CONVENIO">CONVENIO</option>
                  <option value="LICITACION">LICITACION</option>
                  <option value="ORDEN DE SERVICIO">ORDEN DE SERVICIO</option>
                  <option value="FE DE ERRATAS">FE DE ERRATAS</option>
                  <option value="CARTA MODIFICADORA">CARTA MODIFICADORA</option>
                  <option value="CIRCULAR">CIRCULAR</option>
                  <option value="OTROS">OTROS</option>
                  <option value="SENTENCIA">SENTENCIA</option>
                  <option value="ACCION DE TUTELA">ACCION DE TUTELA</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dependencia:
                </label>
                <select
  name="dependencia"
  value={formData.dependencia}
  onChange={handleChange}
  className="w-full border rounded py-2 px-3"
>
  <option value="">Seleccione una dependencia</option>
  {dependeciaa.map((item: Dependence3) => (
    <option key={item.id} value={item.description}>
      {item.description}
    </option>
  ))}
</select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha del Documento:
                </label>
                <input
                  type="date"
                  name="fechaDocumento"
                  value={formData.fechaDocumento}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Número de Acto Administrativo:
                </label>
                <input
                  type="text"
                  name="numeroActo"
                  value={formData.numeroActo}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Firma:
                </label>
                <input
                  type="text"
                  name="firma"
                  value={formData.firma}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Anexo (Nombre del Archivo):
                </label>
                <input
                  type="file"
                  name="anexo"
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción:
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                 
                  className="w-full border rounded py-2 px-3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
      </Grid>
      <Grid >
      <Grid item xs={12} md={12} style={{ display: "flex", padding:"1rem ", width:"100vh" }}>
           <Grid item xs={12} md={100}>
        
         <Typography> Anexos Boletines </Typography>
            {anexo && (
              <DataTable
              
              columns={columns}
              data={Array.isArray(anexo) ? anexo : [anexo]}
              selectableRows={true}
              pagination
              paginationPerPage={6}
              fixedHeader
              onSelectedRowsChange={data => console.log(data)}
              theme="custom"
          
            
                  />
              )}
        
      </Grid>
      </Grid>
    </Grid>
    </Grid>
    
    </>
  )
}
 export default Anexos;