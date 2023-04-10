import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import React from 'react';
import Paper from '@mui/material/Paper';
/**
 *
 * @param p
 */

/* export default function renderLegends(props) {
  return (
    <Stack spacing={2} justifyContent="space-evenly" direction="row">
      createLegends(props)
    </Stack>
  );
} */

const Legend = ({ name, color, enabled }) => (
  <Box
    // style={enabled ? {height: '0', width: '0'} : {}}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    }}
  >
    <Paper
      sx={{
        width: '15px',
        height: '15px',
        bgcolor: color,
        marginTop: '3px',
      }}
    />
    <Typography variant="h8">{name}</Typography>
  </Box>
);

export default Legend;
