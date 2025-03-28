import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import { useAuth } from 'components/autentica/AuthContext';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
interface MenuItems {
  id: number;
  title: string;
  icon: string;
}

const menuItems: MenuItems[] = [];

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const{ isUser,logout} = useAuth()
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        sx={{ ml: 1 }}
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
     
     
     <SettingsOutlinedIcon sx={{ fontSize: 30, color: 'gray' }} />
    
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 230,
          },
          '& .MuiMenu-paper': { p: '0 !important' },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.main' } }}>
            
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                { isUser?.name} |    { isUser?.Rol}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
              { isUser?.email} 
           
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          <MenuItem  onClick={logout}>
           <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }} >
      <IconifyIcon icon="mdi:logout" />
    </ListItemIcon>
    <Typography variant="body2" color="text.secondary" fontWeight={500}  >
      Cerrar sesión
    </Typography>
    </MenuItem>
          {menuItems.map((item) => {
            return (
              <MenuItem key={item.id} onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', width: '100%',py: 1 }}>
                
            
    <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
      <IconifyIcon icon={item.icon} />
    </ListItemIcon>
    <Typography variant="body2" color="text.secondary" fontWeight={500}>
      {item.title}
    </Typography>
  

  {/* Cerrar sesión */}
  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={logout}>
    <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
      <IconifyIcon icon="mdi:logout" />
    </ListItemIcon>
    <Typography variant="body2" color="text.secondary" fontWeight={500}>
      Cerrar sesión
    </Typography>
  </Box>
               

              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
