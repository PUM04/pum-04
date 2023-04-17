/**
 * @file Contains an interactive drawermenu
 */
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DragAndDropzone from './DragAndDropzone';
import LegendBar from './LegendBar';
import Paper from '@mui/material/Paper';
import Dropdown from './Dropdown';
import '../App.css';

const size = 75;
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    overflow: 'hidden',
    maxHeight: '100vh',
    display: 'flex',
    marginRight: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(1, 0),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: 'left',
}));

/**
 * A drawermenu for showing available metrics, sites and to upload files
 *
 * @param props contains list of sites
 * @param props.sites list of sites
 * @returns a menucomponent on top of the application component
 */
export default function Menu(props: {
  sites: { enabled: any; name: any; color: any }[];
}): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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

  const { sites } = props;
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open}>
          <DrawerHeader>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              data-testid="menu-open-button"
              sx={{
                ...(open && {
                  display: 'none',
                  pt: '0',
                }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <LegendBar sites={sites} />
          </DrawerHeader>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
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
            <IconButton
              onClick={handleDrawerClose}
              data-testid="menu-close-button"
            >
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <Typography padding="8px">S.and.A.H.L </Typography>
          </DrawerHeader>
          <Divider />
          <Divider />
          <Paper
            elevation={1}
            style={{
              overflow: 'auto',
              maxHeight: '70vh',
              position: 'fixed',
              top: size + 5,
              left: 5,
              width: drawerWidth - 10,
            }}
          >
            <Dropdown
              dropdownName="Sites"
              value={['site_1', 'site_2', 'site_3']}
            />
            <Dropdown
              dropdownName="Metrics"
              value={['metric_1', 'metric_2', 'metric_3']}
            />
          </Paper>
          <div style={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
            <p data-testid="uploaded-files">
              Uploaded files: {JSON.stringify(files)}
            </p>
            <DragAndDropzone
              setter={setFiles}
              value={files}
              data-testid="drop-zone"
            />
          </div>
        </Drawer>
        <Main open={open} />
      </Box>
    </div>
    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <AppBar position="fixed" open={open}>
    //     <DrawerHeader
    //       sx={{ backgroundColor: 'primary.main', color: 'secondary.main' }}
    //     >
    //       <p>S.and.A.H.L</p>

    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         data-testid="menu-open-button"
    //         sx={{ ...(open && { display: 'none' }) }}
    //       >
    //         <MenuIcon sx={{ color: 'secondary.main' }} />
    //       </IconButton>
    //     </DrawerHeader>
    //   </AppBar>
    //   <Drawer
    //     sx={{
    //       width: '0%',
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //         boxSizing: 'border-box',
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={open}
    //   >
    //     <DrawerHeader
    //       sx={{ backgroundColor: 'primary.main', color: 'secondary.main' }}
    //     >
    //       <p>S.and.A.H.L</p>
    //       <IconButton
    //         onClick={handleDrawerClose}
    //         data-testid="menu-close-button"
    //         sx={{ ...(!open && { display: 'none' }) }}
    //       >
    //         {theme.direction === 'ltr' ? (
    //           <MenuIcon sx={{ color: 'secondary.main' }} />
    //         ) : (
    //           <ChevronRightIcon />
    //         )}
    //       </IconButton>
    //     </DrawerHeader>
    //     <Divider />
    //     <Divider />
    //     <Paper
    //       elevation={1}
    //       style={{
    //         overflow: 'auto',
    //         maxHeight: '70vh',
    //         position: 'fixed',
    //         top: size + 5,
    //         left: 5,
    //         width: drawerWidth - 10,
    //       }}
    //     >
    //       <Dropdown
    //         dropdownName="Sites"
    //         value={['site_1', 'site_2', 'site_3']}
    //       />
    //       <Dropdown
    //         dropdownName="Metrics"
    //         value={['metric_1', 'metric_2', 'metric_3']}
    //       />
    //     </Paper>

    //     <div style={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
    //       <p data-testid="uploaded-files">
    //         Uploaded files: {JSON.stringify(files)}
    //       </p>
    //       <DragAndDropzone
    //         setter={setFiles}
    //         value={files}
    //         data-testid="drop-zone"
    //       />
    //     </div>
    //   </Drawer>
    //   <Main open={open}>
    //     <DrawerHeader />
    //   </Main>
    // </Box>
  );
}
