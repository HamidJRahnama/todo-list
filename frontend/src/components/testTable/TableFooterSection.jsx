// src/components/TestTable/TableFooterSection.js
import React from 'react';
import { TableFooter, TableRow, TablePagination } from '@mui/material';

const TableFooterSection = ({ columns, totalCount, page, rowsPerPage, onChangePage, onChangeRowsPerPage }) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={columns.length}
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{ inputProps: { 'aria-label': 'rows per page' }, native: true }}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </TableRow>
  </TableFooter>
);

export default TableFooterSection;
