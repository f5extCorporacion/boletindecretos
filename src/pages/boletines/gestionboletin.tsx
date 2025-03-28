import { getParametros } from 'peticiones2';
import React, { useEffect, useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import'./table.css'
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

interface Boletin1 {
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
}

const GestionBoletinDataTable: React.FC = () => {
  const { id } = useParams();
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [loading, setLoading] = useState(true);
  const boletinRef = useRef<Boletin1 | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result: Boletin | Boletin[] = await getParametros(id);
          if (Array.isArray(result)) {
            boletinRef.current = result[0];
            setAnexos(result[0].Anexos);
          } else {
            boletinRef.current = result;
            setAnexos(result.Anexos);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const columns = React.useMemo(
    () => [
      { name: 'Descripción', selector: (row: Anexo) => row.descripcionDocumento, sortable: true },
      {
        name: 'Estado Documento',
        cell: (row: Anexo) => (
          <div
            className={row.AnexoEstado === 'EN_REVISION' ? `bg-orange-400 min-h-5 rounded-xl` : `bg-green-500 min-h-5 rounded-xl`}
            style={{ width: '120px' }}
          >
            <p style={{ marginLeft: '10%', justifyContent: 'center', padding: '2px', fontSize: '10px', fontWeight: 'bold' }}>
              {row.AnexoEstado}
            </p>
          </div>
        ),
      },
      { name: 'Fecha Creación', selector: (row: Anexo) => row.fechacreacionAdministrativo, sortable: true },
      { name: 'Firma', selector: (row: Anexo) => row.firma, sortable: true },
      { name: 'Ver Anexo', cell: (row: Anexo) => <a href={row.UrlDocumentAnexo} target="_blank" rel="noopener noreferrer">Ver</a> },
    ],
    []
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='tablenemo'>
      <p>Boletín ID: {boletinRef.current?.id}</p>
      <p>Fecha: {boletinRef.current?.fechacreacion}</p>
      <p>Descripción: {boletinRef.current?.descripcion}</p>
      <p className={boletinRef.current?.BoletinPublicacion === 'PENDIENTE' ? `bg-orange-400 min-h-5 rounded-xl w-[200px] p-1` : `bg-green-500 min-h-5 rounded-xl w-[120px] p-1`}>Estado: {boletinRef.current?.BoletinPublicacion}</p>
      <p>Generar pdf: </p>
      <p>Publicar Boletin: </p>
      <ul>
        {/* Aquí puedes mostrar otros datos del boletín */}
      </ul>
      <DataTable
        columns={columns}
        data={anexos}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
      />
    </div>
  );
};

export default GestionBoletinDataTable;