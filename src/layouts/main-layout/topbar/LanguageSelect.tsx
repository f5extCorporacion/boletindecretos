import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


interface Language {
  id: number;
  code: string;
  lang: string;
  flag: string;
}

const languages: Language[] = [
  {
    id: 1,
    code: 'eng',
    lang: 'English',
    flag: 'twemoji:flag-united-kingdom',
  },
  {
    id: 2,
    code: 'ban',
    lang: 'বাংলা',
    flag: 'twemoji:flag-bangladesh',
  },
  {
    id: 3,
    code: 'zh',
    lang: '中文',
    flag: 'twemoji:flag-china',
  },
  {
    id: 4,
    code: 'tr',
    lang: 'Türkçe',
    flag: 'twemoji:flag-turkey',
  },
  {
    id: 5,
    code: 'nld',
    lang: 'Dutch',
    flag: 'twemoji:flag-netherlands',
  },
];

const LanguageSelect = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);



  const handleFlagMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageItemClick = (langItem: Language) => {
    setLanguage(langItem);
    handleFlagMenuClose();
  };

  return (
    <>
      

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleFlagMenuClose}
        onClick={handleFlagMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            width: 210,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((langItem) => {
          return (
            <MenuItem
              key={langItem.id}
              sx={{ bgcolor: langItem.id === language.id ? 'info.main' : null }}
              onClick={() => handleLanguageItemClick(langItem)}
            >
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LanguageSelect;
