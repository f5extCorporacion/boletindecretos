import React, { useState, useMemo } from 'react';
import "./mis.css";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
interface Dato {
  id: number;
  tipo: string;
  descripcion: string;
  fecha: string;
}

const datosDeEjemplo: Dato[] = [
  { id: 1, tipo: 'Producto', descripcion: 'Laptop Dell XPS 13', fecha: '2023-11-01' },
  { id: 2, tipo: 'Servicio', descripcion: 'Mantenimiento de software', fecha: '2023-11-05' },
  { id: 3, tipo: 'Producto', descripcion: 'Monitor LG 27 pulgadas', fecha: '2023-11-10' },
  { id: 4, tipo: 'Servicio', descripcion: 'Consultoría de marketing', fecha: '2023-11-15' },
  { id: 5, tipo: 'Producto', descripcion: 'Teclado mecánico Logitech', fecha: '2023-11-20' },
  { id: 6, tipo: 'Servicio', descripcion: 'Diseño de página web', fecha: '2023-11-25' },
  { id: 7, tipo: 'Producto', descripcion: 'Mouse inalámbrico Razer', fecha: '2023-11-30' },
  { id: 8, tipo: 'Servicio', descripcion: 'Soporte técnico remoto', fecha: '2023-12-03' },
  { id: 9, tipo: 'Producto', descripcion: 'Impresora multifunción HP', fecha: '2023-12-08' },
  { id: 10, tipo: 'Servicio', descripcion: 'Desarrollo de aplicaciones móviles', fecha: '2023-12-12' },
  { id: 11, tipo: 'Producto', descripcion: 'Disco duro externo Seagate', fecha: '2023-12-17' },
  { id: 12, tipo: 'Servicio', descripcion: 'Capacitación en ciberseguridad', fecha: '2023-12-22' },
  { id: 13, tipo: 'Producto', descripcion: 'Cámara web Logitech HD', fecha: '2023-12-27' },
  { id: 14, tipo: 'Servicio', descripcion: 'Edición de video profesional', fecha: '2024-01-02' },
  { id: 15, tipo: 'Producto', descripcion: 'Auriculares Sony con cancelación de ruido', fecha: '2024-01-07' },
  { id: 16, tipo: 'Servicio', descripcion: 'Traducción de documentos', fecha: '2024-01-12' },
  { id: 17, tipo: 'Producto', descripcion: 'Proyector Epson Full HD', fecha: '2024-01-17' },
  { id: 18, tipo: 'Servicio', descripcion: 'Asesoría financiera', fecha: '2024-01-22' },
  { id: 19, tipo: 'Producto', descripcion: 'Altavoces Bluetooth Bose', fecha: '2024-01-27' },
  { id: 20, tipo: 'Servicio', descripcion: 'Organización de eventos', fecha: '2024-02-01' },
];

const IndexMis: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12;

  const datosFiltrados = useMemo(() => {
    return datosDeEjemplo.filter((dato) => {
      const filtroLowerCase = filtro.toLowerCase();
      return (
        dato.tipo.toLowerCase().includes(filtroLowerCase) ||
        dato.descripcion.toLowerCase().includes(filtroLowerCase) ||
        dato.fecha.includes(filtroLowerCase) ||
        dato.id.toString().includes(filtroLowerCase)
      );
    });
  }, [filtro]);

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const datosPaginados = datosFiltrados.slice(indiceInicial, indiceInicial + elementosPorPagina);
  const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);

  return (
    <div className="usenemo overflow-x-auto Taz">
      <input
        type="text"
        placeholder="Filtrar..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="mb-5 p-3 border rounded"
      /> <br />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datosPaginados.map((dato) => (
            <tr key={dato.id}>
              <td className="py-2 px-4 border-b text-center">{dato.id}</td>
              <td className="py-2 px-4 border-b">{dato.tipo}</td>
              <td className="py-2 px-4 border-b">{dato.descripcion}</td>
              <td className="py-2 px-4 border-b">{dato.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="flex justify-center mt-56">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-2 border rounded-3xl disabled:opacity-50"
        >
          <CiCircleChevLeft  style={{ fontSize: "50px" }}/>
        </button>
        <span className="px-4 py-2">   __ Página {paginaActual} de {totalPaginas} __ </span>
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-2 border rounded-3xl  disabled:opacity-50"
        >
         <CiCircleChevRight  style={{ fontSize: "50px" }} />
        </button>
      </div>
    </div>
  );
};

export default IndexMis;
