import { FunctionComponent, PropsWithChildren, useState } from 'react';
import {Layout} from './Layout';
import { HeaderBar } from './HeaderBar';
import { AppDrawer } from './AppDrawer';

export const AppLayout: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout
      north={(<HeaderBar onMenuClick={() => {
        setDrawerOpen(!drawerOpen)
      }}/>)}
      west={(<AppDrawer expand={drawerOpen}/>)}>
      {children}
    </Layout>
  );
};
