/**
 * @file Contains an interactive drawermenu
 */
import React, { useEffect, useState } from 'react';
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
import Paper from '@mui/material/Paper';
import DragAndDropzone from './DragAndDropzone';
import LegendBar from './LegendBar';
import Dropdown from './Dropdown';
import '../App.css';

const size = 75;
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
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

interface MenuProps {
  // TODO: Get the actual type
  fileHandler: any;
}

/**
 * Adds files to the backend.
 *
 * @param files files which are added to the backend
 * @param fileHandler is used to add the files to the backend
 */
const addFilesToBackend = (files: File[], fileHandler: any) => {
  if (files.length > 0) {
    files.forEach((file) => {
      const filereader = new FileReader();
      filereader.readAsText(file);
      filereader.onload = () => {
        // Send the file to the backend
        fileHandler.AddFile(filereader.result, file.name);
      };
      filereader.onabort = () =>
        console.error(`Reading file ${file.name} was aborted`);
      filereader.onerror = () =>
        console.error(`Reading file ${file.name} failed.`);
    });
  }
};

/**
 * Gets the site names from the backend.
 *
 * @param fileHandler used to get the site names
 * @returns an array of site names
 */
const getSiteNames = (fileHandler: any): string[] => {
  const names = fileHandler ? JSON.parse(fileHandler.GetSiteNames()).names : [];
  return names;
};

/**
 * Gets the metrics from the backend.
 *
 * @param fileHandler used to get the metrics
 * @returns an array of metrics
 */
const getMetrics = (fileHandler: any): string[] => {
  const metrics = fileHandler
    ? JSON.parse(fileHandler.GetMetrics()).metrics
    : [];
  return metrics;
};

/**
 * A drawermenu for showing available metrics, sites and to upload files
 *
 * @param props contains filehandler
 * @returns a menucomponent on top of the application component
 */
export default function Menu(props: MenuProps) {
  const { fileHandler } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [oldFiles, setOldFiles] = useState<File[]>([]);

  const [siteNames, setSiteNames] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);

  // add files to backend when they are added to the state
  useEffect(() => {
    const oldFileNames = oldFiles.map((v) => v.name);
    const newFiles = files.filter((file) => !oldFileNames.includes(file.name));

    setOldFiles(oldFiles.concat(newFiles));

    addFilesToBackend(newFiles, fileHandler);
  }, [files]);

  // get site names and metrics from backend when files are added to the backend
  useEffect(() => {
    fileHandler?.ComputeFiles();

    setSiteNames(getSiteNames(fileHandler));
    setMetrics(getMetrics(fileHandler));
  }, [oldFiles]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sites = [
    { name: 'first', color: 'red', enabled: true },
    { name: 'second', color: 'blue', enabled: true },
    { name: 'third', color: 'orange', enabled: true },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <DrawerHeader id="test123">
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
          <Dropdown dropdownName="Sites" value={siteNames} />
          <Dropdown dropdownName="Metrics" value={metrics} />
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
  );
}
