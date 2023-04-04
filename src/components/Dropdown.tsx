/**
 * @file contains a dropdown-menu with checkboxes
 */

import React from 'react';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

/**
 * Dropdown-menu with checkboxes for dynamic content
 *
 * @returns a dropdop component designed for menu
 */
export default function Dropdown() {
  // should probably have some params for setting the content
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState([
    { metric: 'metric_1', selected: true },
    { metric: 'metric_2', selected: true },
    { metric: 'metric_3', selected: true },
  ]); // Just an examplesStructure of how metric might be stored. should not be in final code
  const [checked, setChecked] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setOpen(open);
    const newContent = [...content];
    // controlls the sub-checkboxes with the main checkbox
      // ERROR: Assignment to property of function parameter 'contentItem', needs to be fixed
    if (checked) {
      newContent.forEach((contentItem) => {
        contentItem.selected = false;
      });
    } else {
      newContent.forEach((contentItem) => {
        contentItem.selected = true;
      });
    }
    setContent(newContent);
  };
  const contentClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Sets the corresponding checkbox to it opposite value
    const newContent = [...content];
    const item = newContent.find((a) => a.metric === event.target.name);
    if (item != null) item.selected = !item.selected;
    setContent(newContent);
    // controlls the main checkbox with the sub-checkboxes
    let anyChecked = false;
    content.forEach((contentItem) => {
      if (contentItem.selected) anyChecked = true;
    });
    setChecked(anyChecked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 1,
        },
      }}
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </ListItemIcon>
        <ListItemText primary="Metrics" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {content.map(({ metric, selected }) => (
            <ListItemButton>
              <ListItemIcon>
                <Checkbox
                  checked={selected}
                  onChange={contentClick}
                  name={metric}
                />
              </ListItemIcon>
              <ListItemText primary={metric} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}
