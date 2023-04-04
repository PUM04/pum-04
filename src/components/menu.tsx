/**
 * @file Contains an interactive drawermenu
 */
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Example from './example';
import DragAndDropzone from './DragAndDropzone';
import { GraphComponent, InfoboxComponent } from './BaseComponent';
import Dropdown from './Dropdown';
import '../App.css';

const drawerWidth = 200;
const size = 75;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: drawerWidth,
  right: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: drawerWidth,
    marginRight: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  height: size,

  padding: theme.spacing(0, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'right',
}));

/**
 * A drawermenu for showing available metrics, sites and to upload files
 *
 * @returns a menucomponent on top of the application component
 */
export default function Menu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // -------------------- FileReader example --------------------
  const [files, setFiles] = useState<File[]>([]);
  const filereader = new FileReader();

  if (files.length > 0) filereader.readAsText(files[0]);

  filereader.onload = () => {
    console.log(`file contents read: ${filereader.result}`);
  };
  filereader.onabort = () => console.log('file reading was aborted');
  filereader.onerror = () => console.log('file reading has failed');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <DrawerHeader>
            <p>S.and.A.H.L</p>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
        </AppBar>
        <Drawer
          sx={{
            width: '5%',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <p>S.and.A.H.L</p>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <MenuIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Divider />
          <div>
            <p>dropdown, snälla...</p>
            <Dropdown />
          </div>
          <div>
            <p>Uploaded files: {JSON.stringify(files)}</p>
            <DragAndDropzone setter={setFiles} value={files} />
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Box
            sx={{
              flexDirection: 'column',
              display: 'inline-flex',
              backgroundColor: 'grey',
            }}
          >
            <GraphComponent />
            <InfoboxComponent />
          </Box>

          <Example />
          <p>Hej</p>
        </Main>
      </Box>
    </div>
  );
}
