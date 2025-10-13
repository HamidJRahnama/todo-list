// src/pages/TestTablePage.js

import React, { useState, useMemo } from 'react';
import { Paper } from '@mui/material';
import TestTable from '../components/testTable/TestTable';
import TableToolbar from '../components/testTable/TableToolbar';

const TestTablePage = () => {
  const initialColumns = [
    { id: 'id', label: 'ID', minWidth: 70, disableFilter: true },
    { id: 'taskTitle', label: 'Task Title', minWidth: 170 },
    { id: 'assignee', label: 'Assignee', minWidth: 150 },
    { id: 'dueDate', label: 'Due Date', minWidth: 120, align: 'center', disableFilter: true },
    { id: 'priority', label: 'Priority', minWidth: 100, align: 'center', disableFilter: true },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center', disableFilter: true },
    { id: 'actions', label: 'Actions', minWidth: 120, align: 'center', disableFilter: true },
  ];

  const sampleData = [
    { id: 1, taskTitle: 'Design new landing page', assignee: 'John Doe', dueDate: '2024-02-15', priority: 'high', status: 'active' },
    { id: 2, taskTitle: 'Fix login bug', assignee: 'Jane Smith', dueDate: '2024-01-20', priority: 'high', status: 'active' },
    { id: 3, taskTitle: 'Update user documentation', assignee: 'Peter Jones', dueDate: '2024-03-10', priority: 'low', status: 'inactive' },
    { id: 4, taskTitle: 'Implement search feature', assignee: 'Mary Johnson', dueDate: '2024-02-28', priority: 'medium', status: 'active' },
    { id: 5, taskTitle: 'Code review for module X', assignee: 'Chris Williams', dueDate: '2024-01-25', priority: 'medium', status: 'active' },
    { id: 6, taskTitle: 'Optimize database queries', assignee: 'Patricia Brown', dueDate: '2024-04-05', priority: 'low', status: 'inactive' },
    { id: 7, taskTitle: 'Prepare Q1 report', assignee: 'Robert Davis', dueDate: '2024-04-01', priority: 'high', status: 'active' },
    { id: 8, taskTitle: 'Refactor authentication logic', assignee: 'Linda Miller', dueDate: '2024-03-20', priority: 'medium', status: 'active' },
    { id: 9, taskTitle: 'Set up CI/CD pipeline', assignee: 'Michael Wilson', dueDate: '2024-02-10', priority: 'high', status: 'active' },
    { id: 10, taskTitle: 'Write unit tests', assignee: 'Sarah Moore', dueDate: '2024-03-15', priority: 'low', status: 'inactive' },
    { id: 11, taskTitle: 'Client meeting preparation', assignee: 'David Taylor', dueDate: '2024-01-30', priority: 'high', status: 'active' },
    { id: 12, taskTitle: 'Deploy to production', assignee: 'Jennifer Anderson', dueDate: '2024-02-05', priority: 'medium', status: 'active' },
  ];

  // State ها
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // توابع کنترل‌کننده
  const handleAddClick = () => console.log('Add new item clicked!');
  const handleSortRequest = (columnId) => {
    let newSortConfig = null;
    if (sortConfig && sortConfig.key === columnId) {
      if (sortConfig.direction === 'descending') newSortConfig = { key: columnId, direction: 'ascending' };
      else if (sortConfig.direction === 'ascending') newSortConfig = null;
    } else {
      newSortConfig = { key: columnId, direction: 'descending' };
    }
    setSortConfig(newSortConfig);
  };
  const handleClearSortRequest = () => setSortConfig(null);
  const handleHideColumnRequest = (columnId) => setHiddenColumns((prev) => [...prev, columnId]);
  const handleShowAllColumnsRequest = () => setHiddenColumns([]);
  const handleColumnFilterChange = (columnId, value) => setColumnFilters((prev) => ({ ...prev, [columnId]: value }));
  const handleFilterRequest = () => setShowColumnFilters(true);

  // منطق پردازش داده‌ها
  const processedData = useMemo(() => {
    let filteredItems = [...sampleData];
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    filteredItems = filteredItems.filter((item) => {
      return Object.keys(columnFilters).every((key) => {
        if (!columnFilters[key]) return true;
        return item[key].toString().toLowerCase().includes(columnFilters[key].toLowerCase());
      });
    });
    if (sortConfig !== null) {
      filteredItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filteredItems;
  }, [searchTerm, columnFilters, sortConfig, sampleData]);

  const visibleColumns = useMemo(() => {
    return initialColumns.filter((col) => !hiddenColumns.includes(col.id));
  }, [hiddenColumns, initialColumns]);

  return (
    // این Paper به عنوان کارت اصلی جدول عمل می‌کند
    <Paper sx={{ width: '100%', overflow: 'hidden' ,boxSizing:"border-box", p:3 }}>
      <TableToolbar
        title="Task Management Table"
        showFilters={showColumnFilters}
        onToggleFilters={() => setShowColumnFilters(!showColumnFilters)}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onAddClick={handleAddClick}
      />
      <TestTable
        columns={visibleColumns}
        data={processedData}
        totalCount={processedData.length}
        showColumnFilters={showColumnFilters}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        onSortRequest={handleSortRequest}
        onClearSortRequest={handleClearSortRequest}
        onHideColumnRequest={handleHideColumnRequest}
        onShowAllColumnsRequest={handleShowAllColumnsRequest}
        onFilterRequest={handleFilterRequest}
        sortConfig={sortConfig}
        hiddenColumns={hiddenColumns}
      />
    </Paper>
  );
};

export default TestTablePage;