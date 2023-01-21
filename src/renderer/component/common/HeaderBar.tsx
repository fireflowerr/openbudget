import * as React from 'react';
import { FunctionComponent, MouseEventHandler } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';

export type HeaderBarProps = {
  onMenuClick: MouseEventHandler,
}

export const HeaderBar: FunctionComponent<HeaderBarProps> = ({onMenuClick}) => {
  const appBarHeight = useTheme().obSizing.appBar.height;

  return (
    <AppBar position="static" sx={{height: appBarHeight}}>
      <Toolbar>
        <IconButton
          onClick={onMenuClick}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OpenBudget
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

