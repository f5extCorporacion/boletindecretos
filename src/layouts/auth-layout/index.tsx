import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack justifyContent="center" height="100vh">
      <Stack
    px={{ xs: 2, sm: 5 }}
    width={{ xs: 1, lg: 450 }}
    height="auto"
    minHeight={1}
    bgcolor="info.lighter"
    overflow="auto" // Cambiado de 'scroll' a 'auto'
      >
        {children}
      </Stack>   
    </Stack>
  );
};

export default AuthLayout;
