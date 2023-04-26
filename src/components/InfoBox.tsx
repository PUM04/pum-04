/**
 * @file Contains the InfoBox component.
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

interface InfoBoxProps {
  siteId: string;
  fileHandler: any;
}

const style1 = { display: 'inline', color: 'primary.light3' };
const style2 = {
  display: 'inline',
  color: 'primary.light3',
  paddingLeft: '47px',
};

/**
 * Info box for showing site information
 *
 * @param props contains filehandler
 * @returns the info box
 */
function InfoBox(props: InfoBoxProps) {
  const { siteId } = props;
  const { fileHandler } = props;

  if (fileHandler === undefined) {
    return <Box data-testid="info-box" />;
  }

  const fileContent: string = fileHandler.GetInfoBox(siteId);

  if (fileContent === '{}') {
    return <Box data-testid="info-box" />;
  }

  const data = JSON.parse(fileContent);

  return (
    <Paper
      data-testid="info-box"
      elevation={3}
      sx={{
        display: 'flex',
        backgroundColor: 'primary.main',
        color: 'secondary.main',
        padding: '1vh',
        margin: '1vh',
        minWidth: '20vw',
      }}
    >
      <List>
        <Typography
          sx={{
            display: 'inline',
            textDecoration: 'underline',
            fontSize: '18px',
          }}
        >
          Site name:
        </Typography>
        <Typography
          sx={{ display: 'inline', color: 'primary.light3', fontSize: '18px' }}
        >
          {' '}
          {data.site_name}
        </Typography>
        <br />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <List sx={{ display: 'inline' }}>
            <Typography
              display="inline"
              style={{ textDecoration: 'underline' }}
            >
              RAM:
            </Typography>
            <Typography sx={style1}> Min:</Typography>
            <Typography sx={style1}>
              <span /> {data.min_ram}
            </Typography>
            <br />
            <Typography sx={style2}>
              <span /> Max:
            </Typography>
            <Typography sx={style1}>{data.max_ram}</Typography>
            <br />
            <Typography sx={style2}>
              <span /> Average:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.average_ram}
            </Typography>
            <br />
            <Typography sx={style2}>
              <span /> Total:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.total_ram}
            </Typography>
          </List>
          <List sx={{ display: 'inline' }}>
            <Typography
              display="inline"
              style={{ textDecoration: 'underline' }}
            >
              CPU:
            </Typography>
            <Typography sx={style1}>
              <span /> Min:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.min_cpu}
            </Typography>
            <br />
            <Typography sx={style2}>
              <span /> Max:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.max_cpu}
            </Typography>
            <br />
            <Typography sx={style2}>
              <span /> Average:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.average_cpu}
            </Typography>
            <br />
            <Typography sx={style2}>
              <span /> Total:
            </Typography>
            <Typography sx={style1}>
              <span /> {data.total_cpu}
            </Typography>
          </List>
        </Box>
      </List>
    </Paper>
  );
}

export default InfoBox;
