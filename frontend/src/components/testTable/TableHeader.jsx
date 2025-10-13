// src/components/TestTable/TableHeader.js

import React, { useState } from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Box,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fade,
} from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SortIcon from '@mui/icons-material/Sort';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const TableHeader = ({
  columns,
  showColumnFilters,
  columnFilters,
  onColumnFilterChange,
  onSortRequest,
  onClearSortRequest,
  onHideColumnRequest,
  onShowAllColumnsRequest,
  onFilterRequest,
  sortConfig,
  hiddenColumns,
}) => {
  const [menuState, setMenuState] = useState({ anchorEl: null, columnId: null });
  const activeColumn = columns.find((col) => col.id === menuState.columnId);

  const handleMenuClick = (event, columnId) => {
    setMenuState({ anchorEl: event.currentTarget, columnId });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, columnId: null });
  };

  const handleSort = () => { onSortRequest(menuState.columnId); handleMenuClose(); };
  const handleClearSort = () => { onClearSortRequest(); handleMenuClose(); };
  const handleFilter = () => { onFilterRequest(); handleMenuClose(); };
  const handleClearFilter = () => { onColumnFilterChange(menuState.columnId, ''); handleMenuClose(); };
  const handleHideColumn = () => { onHideColumnRequest(menuState.columnId); handleMenuClose(); };
  const handleShowAllColumns = () => { onShowAllColumnsRequest(); handleMenuClose(); };
  
  const isSortActive = sortConfig && sortConfig.key === menuState.columnId;
  const isFilterActive = columnFilters[menuState.columnId];
  const hasHiddenColumns = hiddenColumns.length > 0;
  const isMenuOpen = Boolean(menuState.anchorEl);

  return (
    <TableHead
      sx={{
        backgroundColor: "#f9fafc",
        "& th": { borderBottom: "2px solid #e0e0e0", fontWeight: "bold", color: "#333", paddingY: 1.5, verticalAlign: "bottom" },
      }}
    >
      <TableRow>
        {columns.map((column) => {
          const isThisColumnSorted = sortConfig && sortConfig.key === column.id;
          
          return (
            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "6px", cursor: 'pointer' }}
                    onClick={() => onSortRequest(column.id)}
                  >
                    {column.label}
                    
                    {/* === منطق جدید برای نمایش آیکون‌های سه حالته === */}
                    {isThisColumnSorted ? (
                      <Fade in={true} key={sortConfig.direction}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ArrowUpwardIcon
                            fontSize="small"
                            sx={{
                              // اگر حالت صعودی (از کوچک به بزرگ) بود، 180 درجه بچرخان
                              transform: sortConfig.direction === 'ascending' ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.2s ease-in-out', // انیمیشن چرخش
                            }}
                          />
                        </Box>
                      </Fade>
                    ) : (
                      <SyncAltIcon
                        fontSize="small"
                        sx={{
                          transform: "rotate(-90deg) scaleX(0.9)",
                          opacity: 0.6,
                          cursor: "pointer",
                          "&:hover": { opacity: 1 },
                        }}
                      />
                    )}
                  </Box>

                  <IconButton size="small" aria-label="Column Actions" onClick={(e) => handleMenuClick(e, column.id)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>

                {!column.disableFilter && (
                  <Collapse in={showColumnFilters} timeout="auto" unmountOnExit sx={{ mt: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={`Filter by ${column.label}`}
                      value={columnFilters[column.id] || ''}
                      onChange={(e) => onColumnFilterChange(column.id, e.target.value)}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>),
                        endAdornment: columnFilters[column.id] && (
                          <InputAdornment position="end">
                            <IconButton aria-label="Clear filter" onClick={() => onColumnFilterChange(column.id, '')} edge="end" size="small">
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Collapse>
                )}
              </Box>
            </TableCell>
          );
        })}
      </TableRow>

      <Menu
        anchorEl={menuState.anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClearSort} disabled={!isSortActive}>
          <ListItemIcon><ClearAllIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Clear sort</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSort}>
          <ListItemIcon><SortIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Sort by {activeColumn?.label}</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClearFilter} disabled={!isFilterActive}>
          <ListItemIcon><FilterListOffIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Clear filter</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFilter}>
          <ListItemIcon><FilterListIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Filter by {activeColumn?.label}</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleHideColumn}>
          <ListItemIcon><VisibilityOffIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Hide {activeColumn?.label} column</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShowAllColumns} disabled={!hasHiddenColumns}>
          <ListItemIcon><ViewColumnIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Show all columns</ListItemText>
        </MenuItem>
      </Menu>
    </TableHead>
  );
};

export default TableHeader;