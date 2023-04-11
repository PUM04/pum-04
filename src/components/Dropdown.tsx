/**
 * @file contains a dropdown-menu with checkboxes
 */

import React, { useState } from 'react';
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
 * @param props dropdownProps - name of dropdown and name of items in dropdown
 * @returns a dropdop component designed for menu
 */
export default function Dropdown(props: any): JSX.Element {
  const { dropdownName, value: givenItems } = props;

  // Extract items from given items and mark their checkboxes as checked.
  const extractedItems: any[] | (() => any[]) = [];
  givenItems.forEach((Item: any) => {
    extractedItems.push({ item: Item, selected: true });
  });

  // should probably have some params for setting the content
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(extractedItems);
  const [checked, setChecked] = useState(true);
  // If clicked on: open if closed and close if open.
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setOpen(open);
    const newContent: React.SetStateAction<any[]> = [];
    // controlls the sub-checkboxes with the main checkbox

    if (checked) {
      // If checkbox currently checked and gets clicked on, uncheck it.
      content.forEach((contentItem) => {
        const item = { ...contentItem };
        item.selected = false;
        newContent.push(item);
      });
    } else {
      // If checkbox currently unchecked and gets clicked on, check it.
      content.forEach((contentItem) => {
        const item = { ...contentItem };
        item.selected = true;
        newContent.push(item);
      });
    }
    setContent(newContent);
  };
  // When a sub-checkbox get clicked on.
  const contentClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Finds the relevant checkbox.
    const newContent = [...content];
    const item = newContent.find((a) => a.item === event.target.name);
    // Sets the corresponding checkbox to it opposite value.
    if (item != null) item.selected = !item.selected;
    setContent(newContent);

    // If all sub-checkboxes are checked, check the main checkbox too.
    let anyChecked = true;
    content.forEach((contentItem) => {
      if (!contentItem.selected) anyChecked = false;
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
          width: 1,
          height: 1,
        },
      }}
    >
      <ListItemButton onClick={handleClick} data-testid="dropdown-button">
        <ListItemIcon>
                  <Checkbox
            checked={checked}
            onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      data-testid="dropdown-checkbox"
          />
        </ListItemIcon>
        <ListItemText primary={dropdownName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={10} unmountOnExit>
        <List component="div" disablePadding >
          {content.map(({ item, selected }) => (
            <ListItemButton key={item} data-testid="list-button">
              <ListItemIcon key={item}>
                      <Checkbox
                          
                          checked={selected}
                          onChange={contentClick}
                          name={item}
                          key={item}
                          data-testid="list-checkbox"

                />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}
