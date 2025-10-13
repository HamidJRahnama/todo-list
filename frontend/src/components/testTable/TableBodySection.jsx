// src/components/TestTable/TableBodySection.js
import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableBodySection = ({ columns, data, page, rowsPerPage, onEdit, onDelete }) => {
  const getPriorityChipProps = (priority) => {
    switch (priority) {
      case 'high': return { color: 'error', label: 'High' };
      case 'medium': return { color: 'warning', label: 'Medium' };
      case 'low': return { color: 'default', label: 'Low' };
      default: return { color: 'default', label: priority };
    }
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'active': return { color: 'success', label: 'Active' };
      case 'inactive': return { color: 'error', label: 'Inactive' };
      default: return { color: 'default', label: status };
    }
  };

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => {
            const value = row[column.id];
            if (column.id === 'priority') {
              const { color, label } = getPriorityChipProps(value);
              return <TableCell key={column.id}><Chip label={label} color={color} size="small" /></TableCell>;
            }
            if (column.id === 'status') {
              const { color, label } = getStatusChipProps(value);
              return <TableCell key={column.id}><Chip label={label} color={color} size="small" /></TableCell>;
            }
            if (column.id === 'actions') {
              return (
                <TableCell key={column.id} align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton color="primary" onClick={() => onEdit(row)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => onDelete(row)}><DeleteIcon /></IconButton>
                  </Box>
                </TableCell>
              );
            }
            return <TableCell key={column.id}>{value}</TableCell>;
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodySection;
