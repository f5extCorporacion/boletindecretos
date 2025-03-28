import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconifyIcon from 'components/base/IconifyIcon';

import paths from 'routes/paths';
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "./cssproces.css";
import { Dependencex, parametrixsend, universal } from './bortex';
import Swal from 'sweetalert2';

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  dependenci: number | ''; // Ajustado para ser number o ''
  Rol: string;
}

const SignUp = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', phone: '', password: '', dependenci: '', Rol: 'ORGANISMO' });
  const [showPassword, setShowPassword] = useState(false);
  const miRefdependence = useRef<Dependencex[] | null>(null);
  const [loadingDependences, setLoadingDependences] = useState<boolean>(true); // Manejo de carga de dependencias
  const [dependenceError, setDependenceError] = useState<string | null>(null); // Manejo de errores de dependencias

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Deseas crear usuario?",
      showCancelButton: true,
      confirmButtonText: "si",
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Confirmando!");
        promesss(user)
      } else if (result.isDenied) {
        Swal.fire("Usuario no creado", "", "info");
      }
    });
    
    // Aquí puedes agregar la lógica para enviar los datos del usuario
  };
const promesss = async (userr:User)=>{
  const  respuestservidor =  await parametrixsend(userr)
  if(respuestservidor){
    Swal.fire(`${respuestservidor.mensaje}`);
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${respuestservidor.mensaje}`));
    if(respuestservidor.mensaje === "Usuario creado con éxito"){
      window.location.href="/"
    }
  }
}
  useEffect(() => {
    const promss = async () => {
      try {
        const rest = await universal();
        if (Array.isArray(rest)) {
          miRefdependence.current = rest;
          setLoadingDependences(false);
        } else {
          console.error("Error en la consulta universal:", rest);
          setDependenceError("Error al cargar las dependencias.");
          setLoadingDependences(false);
        }
      } catch (error) {
        console.error("Error capturado en promss:", error);
        setDependenceError("Error al cargar las dependencias.");
        setLoadingDependences(false);
      }
    };
    promss();


  }, []);

  const handleRolChange = (event: any) => {
    setUser({ ...user, Rol: event.target.value });
  };

  const handleDependenceChange = (event: any) => {
    setUser({ ...user, dependenci: event.target.value });
  };

  return (
    <div className='globalformularios'>
      <Stack className='formintro' >
        
        <Divider sx={{ my: 1 }}>Registro Usuario</Divider>
        <Box component="form" justifyContent={'center'} alignItems="center" onSubmit={handleSubmit}>
          <TextField id="name" name="name" type="text" color="secondary" label="Nombre" value={user.name} onChange={handleInputChange} variant="filled" placeholder="Nombre" sx={{ mt: 3 }} fullWidth autoFocus required />
          <TextField id="email" name="email" type="email" color="secondary" label="Correo" value={user.email} onChange={handleInputChange} variant="filled" placeholder="mail@example.com" autoComplete="email" sx={{ mt: 6 }} fullWidth required />
          <TextField id="phone" name="phone" type="text" color="secondary" label="phone" value={user.phone} onChange={handleInputChange} variant="filled" placeholder="phone" sx={{ mt: 6 }} fullWidth required />
          <TextField id="password" name="password" label="Password" color="secondary" type={showPassword ? 'text' : 'password'} value={user.password} onChange={handleInputChange} variant="filled" placeholder="Min. 8 characters" autoComplete="current-password" sx={{ mt: 6 }} fullWidth required InputProps={{ endAdornment: (<InputAdornment position="end" sx={{ opacity: user.password ? 1 : 0, pointerEvents: user.password ? 'auto' : 'none', }}> <IconButton size="small" aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} sx={{ border: 'none', bgcolor: 'transparent !important' }} edge="end"> <IconifyIcon icon={showPassword ? 'mdi:visibility' : 'mdi:visibility-off'} color="neutral.main" /> </IconButton> </InputAdornment>), }} />

          <FormControl fullWidth variant="filled" sx={{ mt: 4 }}>
            <InputLabel>Rol</InputLabel>
            <Select value={user.Rol} onChange={handleRolChange} required>
              <MenuItem value="ORGANISMO">ORGANISMO</MenuItem>
              <MenuItem value="PUBLICADOR">PUBLICADOR</MenuItem>
              <MenuItem value="DIRECTIVO">DIRECTIVO</MenuItem>
            </Select>
          </FormControl>
            
          <FormControl fullWidth variant="filled" sx={{ mt: 3}}>
            <InputLabel>Dependencia</InputLabel>
            <Select
              labelId="dependence-select-label"
              id="dependence-select"
              value={user.dependenci}
              onChange={handleDependenceChange}
              label="Dependencia"
              required
            >
              {loadingDependences ? (
                <MenuItem disabled>Cargando...</MenuItem>
              ) : dependenceError ? (
                <MenuItem disabled>{dependenceError}</MenuItem>
              ) : miRefdependence.current && miRefdependence.current.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} fullWidth>
            Crear usuario
          </Button>
        </Box>

        <Typography mt={2} pb={12} variant="body2" textAlign={{ xs: 'center', md: 'left' }} letterSpacing={0.25}>
          Ya te registrado ?{' '}
          <Link href={paths.signin} color="primary.main" fontWeight={600}>
            Login !
          </Link>
        </Typography>
      </Stack>
    </div>
  );
};

export default SignUp;