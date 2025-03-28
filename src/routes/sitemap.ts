//import paths from 'routes/paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
  messages?: number;
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dasboart',
    path: '/',
    icon: 'solar:widget-bold',
    active: true,
  },
  {
    id: 'analytics',
    subheader: 'Boletiones',
    path: '/pages/boletines',
    icon: 'solar:chart-square-bold',
    active: true,
  },
  {
    id: 'analytics',
    subheader: 'Anexos',
    path: '/pages/anexos',
    icon: 'solar:chart-square-bold',
    active: true,
  },
 

  {
    id: 'settings',
    subheader: 'Settings',
    path: '#!',
    icon: 'solar:settings-bold',
  },
  /*
  {
    id: 'signin',
    subheader: 'Sign In',
    path: paths.signin,
    icon: 'mage:lock-fill',
    active: true,
  },
  {
    id: 'signup',
    subheader: 'Sign Up',
    path: paths.signup,
    icon: 'mage:user-plus-fill',
    active: true,
  },*/
];

export default sitemap;
