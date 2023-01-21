import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled'
import {Mail, Assessment, AccountBox, Receipt} from '@mui/icons-material'
import { FunctionComponent } from 'react';
import { css } from '@emotion/css';


const HeaderClip = () => {
  const appBarHeight = useTheme().obSizing.appBar.height;
  return (<Box sx={{height: appBarHeight}}/>);
}

export type AppDrawerProps = {
  expand?: boolean
};

const StyledDrawer =  styled(Drawer)`
  .MuiDrawer-paper {
    z-index: 98;
    width: inherit;
  }
`;

export const AppDrawer: FunctionComponent<AppDrawerProps> = ({expand}) => {
  const appDrawerTheme = useTheme().obSizing.appDrawer;
  const {expandWidth, collapseWidth} = appDrawerTheme;
  return (
      <StyledDrawer variant='permanent' sx={{width: expand ? expandWidth : collapseWidth, overflow: 'hidden'}}>
        <HeaderClip/>
        <Collapse orientation='horizontal' in={expand} collapsedSize={collapseWidth}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Mail/>
              </ListItemIcon>
              <ListItemText primary='Envelopes' sx={{opacity: expand ? 1 : 0}}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Receipt/>
              </ListItemIcon>
              <ListItemText primary='Transactions' sx={{opacity: expand ? 1 : 0}}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox/>
              </ListItemIcon>
              <ListItemText primary='Accounts' sx={{opacity: expand ? 1 : 0}}/>
            </ListItemButton>
          </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Assessment/>
            </ListItemIcon>
            <ListItemText primary='Reports' sx={{opacity: expand ? 1 : 0}}/>
          </ListItemButton>
        </ListItem>
        </List>
        </Collapse>
      </StyledDrawer>
  );
};
