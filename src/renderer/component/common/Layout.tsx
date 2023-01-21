import { ClassicComponent, Component, FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { Box } from '@mui/material';

export type LayoutProps = {
  north?:  ReactNode;
  south?:  ReactNode;
  east?:  ReactNode;
  west?:  ReactNode;
};

export const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({north, south, east, west, children}) => {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Box sx={{flexGrow: 0, zIndex:99}}>
          {north}
        </Box>
        <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
          <Box sx={{flexGrow: 0}}>
            {west}
          </Box>
          <Box sx={{flexGrow: 1}}>
            {children}
          </Box>
          <Box sx={{flexGrow: 0}}>
            {east}
          </Box>
        </Box>
        <Box sx={{flexGrow: 0}}>
          {south}
        </Box>
      </Box>
    </Box>
  );
};

Layout.defaultProps
