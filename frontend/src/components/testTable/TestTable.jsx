// src/components/TestTable/TestTable.js

import React, { useState } from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import TableHeader from './TableHeader';
import TableBodySection from './TableBodySection';
import TableFooterSection from './TableFooterSection';

const TestTable = ({
  columns,
  data,
  totalCount,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table stickyHeader aria-label="custom table">
        <TableHeader
          columns={columns}
          showColumnFilters={showColumnFilters}
          columnFilters={columnFilters}
          onColumnFilterChange={onColumnFilterChange}
          onSortRequest={onSortRequest}
          onClearSortRequest={onClearSortRequest}
          onHideColumnRequest={onHideColumnRequest}
          onShowAllColumnsRequest={onShowAllColumnsRequest}
          onFilterRequest={onFilterRequest}
          sortConfig={sortConfig}
          hiddenColumns={hiddenColumns}
        />

        <TableBodySection
          columns={columns}
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          onEdit={(row) => console.log('Edit item:', row)}
          onDelete={(row) => console.log('Delete item:', row)}
        />

        <TableFooterSection
          columns={columns}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default TestTable;