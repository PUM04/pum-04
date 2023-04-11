import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

function Legend(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '10px',
          height: '10px',
          bgcolor: props.color,
          marginRight: '6px',
          marginTop: '4px',
        }}
      ></Box>
      <Typography variant="h8">{props.name}</Typography>
    </Box>
  );
}

function Legends(props) {
  // eslint-disable-next-line react/prop-types
  const { legendList } = props;
  return (
    <Stack
      spacing={2}
      justifyContent="space-evenly"
      direction="row"
      width="100vW"
      flexWrap="wrap"
    >
      {legendList.map((legend, index) => (
        <Legend key={index} color={legend.color} name={legend.name} />
      ))}
    </Stack>
  );
}

export default Legends;
