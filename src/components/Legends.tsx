import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function renderLegends(props) {
  return (
    <Stack spacing={2} justifyContent="space-evenly" direction="row">
      createLegends(props)
    </Stack>
  );
}

function createLegends(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '10px',
          height: '10px',
          bgcolor: props.color,
          marginRight: '7px',
          marginTop: '5%',
        }}
      ></Box>
      <Typography variant="h8">props.name</Typography>
    </Box>
  );
}
