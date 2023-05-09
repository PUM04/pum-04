/**
 * @file Contains the menu component which is the top Appbar containing the dropdown and the legend bar
 */
import React, { useEffect, useState, Dispatch } from 'react';
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

import CHART_COLORS from './CHART_COLORS';
import Dropdown from './Dropdown';
import { Site } from './SiteInterface';
import '../App.css';

const size = 55;
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: 0,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: 0,
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
  siteProps: Map<string, Site>;
  setSiteProps: Dispatch<React.SetStateAction<Map<string, Site>>>;
  setMetricProps: Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Adds files to the backend.
 *
 * @param files files which are added to the backend
 * @param fileHandler is used to add the files to the backend
 */
export const addFilesToBackend = (files: File[], fileHandler: any) => {
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
 * Gets the sites from the backend.
 *
 * @param fileHandler used to get the site names
 * @returns an array of site names
 */
const getSites = (fileHandler: any): Site[] => {
  const sites = fileHandler ? JSON.parse(fileHandler.GetSites()).sites : [];
  return sites;
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
  const { fileHandler, siteProps, setSiteProps, setMetricProps } = props;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [oldFiles, setOldFiles] = useState<File[]>([]);

  const [sites, setSites] = useState<Site[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);

  const [selectedSites, setSelectedSites] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedMetrics, setSelectedMetrics] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const oldFileNames = oldFiles.map((v) => v.name);
    const newFiles = files.filter((file) => !oldFileNames.includes(file.name));
    setOldFiles(oldFiles.concat(newFiles));
    addFilesToBackend(newFiles, fileHandler);
  }, [files]);

  // get site names and metrics from backend when files are added to the backend
  useEffect(() => {
    fileHandler?.ComputeFiles();

    setSites(getSites(fileHandler));
    setMetrics(getMetrics(fileHandler));
  }, [oldFiles]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelectedMetrics = (key: string, value: boolean) => {
    selectedMetrics[key] = value;
    setSelectedMetrics(selectedMetrics);

    const newSelectedMetrics: string[] = [];
    Object.keys(selectedMetrics).forEach((metric) => {
      if (selectedMetrics[metric]) newSelectedMetrics.push(metric);
    });
    setMetricProps(newSelectedMetrics);
  };

  const handleSelectedSites = (key: string, value: boolean) => {
    selectedSites[key] = value;
    setSelectedSites(selectedSites);

    const newMap = new Map<string, Site>(siteProps);
    const PHI = (1 + Math.sqrt(5)) / 2;
    let index = newMap.size;

    // Map colors to the sites
    sites.forEach((site) => {
      if (site.id) {
        let hexColor = '';
        if (index < CHART_COLORS.length) {
          hexColor = CHART_COLORS[index];
        } else {
          console.info('no more default colors, generating random colors');
          const n = index * PHI - Math.floor(index * PHI);
          const hue = Math.floor(n * 180);
          hexColor = `#0${hue.toString(16)}`;
        }
        newMap.set(site.id, {
          ...site,
          color: hexColor,
          enabled: selectedSites[site.name] ? selectedSites[site.name] : false,
        });
        index++;
      }
    });
    setSiteProps(newMap);
  };
  const minNavWidth = `calc(100vw - ${drawerWidth}px)`;
  return (
    <div className="App">
      <Box sx={{ display: 'fixed' }}>
        <AppBar
          id="appbar"
          position="sticky"
          sx={{
            ...(open
              ? {
                  minWidth: minNavWidth,
                  maxWidth: minNavWidth,
                  minHeight: size,
                }
              : {
                  minWidth: '100vw',
                  minHeight: size,
                }),
          }}
          open={open}
        >
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
            <LegendBar siteProps={siteProps} />
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
              value={sites.map((site) => site.name)}
              onSelected={handleSelectedSites}
              setSiteProps={setSiteProps}
            />
            <Dropdown
              dropdownName="Metrics"
              value={metrics}
              onSelected={handleSelectedMetrics}
              setSiteProps={setSiteProps}
            />
          </Paper>
          <div style={{ position: 'fixed', bottom: 0, width: drawerWidth }}>
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
  );
}
