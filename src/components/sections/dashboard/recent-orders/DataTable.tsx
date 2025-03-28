import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from 'components/common/ActionMenu';
import Image from 'components/base/Image';
import { formatNumber } from 'helpers/formatNumber';
import { rows } from 'data/recentOrdersData';
import { Box } from '@mui/material';

const actions = [
  {
    id: 1,
    icon: 'mdi:download', // Ícono de descarga
    title: 'Descargar',
  },
  {
    id: 2,
    icon: 'mdi:pencil-outline', // Ícono de edición
    title: 'Editar',
  },
  {
    id: 3,
    icon: 'mdi:trash-can-outline', // Ícono de borrar
    title: 'Borrar',
  },
];

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: '__check__',
    headerName: '',
    width: 40,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'id',
    headerName: 'Numero',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 120,
  },
  {
    field: 'product',
    headerName: 'Tipo',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 220,
    valueGetter: (params: { name: string; image: string }) => {
      return params.name;
    },
    renderCell: (params) => {
      return (
        <Stack height={1} spacing={1.5} alignItems="center" justifyContent="flex-start">
          <Image
            src={params.row.product.image}
            height={30}
            width={30}
            sx={{ objectFit: 'cover', borderRadius: 1.5 }}
          />
          <Typography variant="caption" fontWeight={600}>
            {params.row.product.name}
          </Typography>
        </Stack>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: 'price',
    headerName: 'fecha',
    headerAlign: 'left',
    editable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => (
      <Typography variant="caption">
        {formatNumber(params.value, {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })}
      </Typography>
    ),
  },
  {
    field: 'inStock',
    headerName: 'description',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 140,
  },
  {
    field: 'totalOrder',
    headerName: 'Notas de vigencia',
    editable: false,
    headerAlign: 'left',
    align: 'left',
    flex: 2,
    minWidth: 140,
    renderCell: (params) => (
      <Stack direction="column" alignItems="flex-start" justifyContent="center" height={1}>
        <Chip label={params.value} size="small" color="secondary" sx={{ borderRadius: 1.75 }} />
      </Stack>
    ),
  },
  {
    field: 'pending',
    headerName: 'Año',
    headerAlign: 'left',
    align: 'left',
    editable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => (
      <Stack direction="column" alignItems="flex-start" justifyContent="center" height={1}>
        <Chip label={params.value} size="small" color="warning" sx={{ borderRadius: 1.75 }} />
      </Stack>
    ),
  },
  {
    field: 'canceled',
    headerName: 'Dependencia',
    headerAlign: 'left',
    align: 'left',
    editable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => (
      <Stack direction="column" alignItems="flex-start" justifyContent="center" height={1}>
        <Chip label={params.value} size="small" color="error" sx={{ borderRadius: 1.75 }} />
      </Stack>
    ),
  },

 
  {
    field: 'action',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderHeader: () => <ActionMenu actions={actions} />,
    renderCell: () => <ActionMenu actions={actions} />,
  },
];

interface TaskOverviewTableProps {
  searchText: string;
}

const DataTable = ({ searchText }: TaskOverviewTableProps) => {
  
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white', // Fondo fijo para evitar que se mezcle con el contenido
          borderTop: '1px solid #ddd', // Línea superior para separar visualmente
          py: 1, // Espaciado interno
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          transition: 'all 0.9s ease-in-out', // Animación suave
          opacity: 0.9, // Hace que la transición también afecte la opacidad
          '&:hover': {
            opacity: 1, // Al pasar el mouse, la paginación se verá más clara
          },
        }}
      >
<DataGrid
  apiRef={apiRef}
  density="standard"
  columns={columns}
  rows={rows}
  rowHeight={80}
  disableColumnResize
  disableColumnMenu
  disableColumnSelector
  disableRowSelectionOnClick
  initialState={{
    pagination: { paginationModel: { pageSize: 6 } },
  }}
  autosizeOptions={{
    includeOutliers: true,
    includeHeaders: false,
    outliersFactor: 3,
    expand: true,
  }}
  slots={{
    toolbar: DataGridFooter, // Paginación en la parte superior
   
  }}
  checkboxSelection
  pageSizeOptions={[4]}
/>
    </Box>
  );
};

export default DataTable;
