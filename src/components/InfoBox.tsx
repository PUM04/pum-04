/**
 * @file Contains the InfoBox component.
 */
import React from 'react';
import { Box } from '@mui/material';

interface InfoBoxProps {
  siteId: string;
  fileHandler: any;
}

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
    <Box
      data-testid="info-box"
      sx={{
        display: 'flex',
      }}
    >
      <ul>
        <li>Site name: {data.site_name} </li>
        <li>Number of hosts {data.hosts} </li>
        <li>
          RAM:
          <ul>
            <li>Min: {data.min_ram} </li>
            <li>Max: {data.max_ram} </li>
            <li>Average: {data.average_ram}</li>
            <li>Total: {data.total_ram}</li>
          </ul>
          <ul>
            <li>Min: data.min_cpu </li>
            <li>Max: {data.max_cpu} </li>
            <li>Average: {data.average_cpu} </li>
            <li>Total: {data.total_cpu} </li>
          </ul>
        </li>
      </ul>
    </Box>
  );
}

export default InfoBox;
