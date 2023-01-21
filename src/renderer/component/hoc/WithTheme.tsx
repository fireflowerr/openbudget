import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    obSizing: {
      appBar: {
        height: string;
      };
      appDrawer: {
        collapseWidth: string,
        expandWidth: string,
      }
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    obSizing?: {
      appBar?: {
        height?: string,
      };
      appDrawer?: {
        collapseWidth?: string;
        expandWidth?: string;
      };
    };
  }
}


export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#41477f',
    },
    secondary: {
      main: '#dc0e50',
    },
  },
  obSizing: {
    appBar: {
      height: '56px',
    },
    appDrawer: {
      collapseWidth: '90px',
      expandWidth: '230px',
    },
  },
});
export const WithTheme: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
