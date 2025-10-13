// src/components/testTable/TableToolbar.js

import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  FilterListOff as FilterListOffIcon,
} from '@mui/icons-material';

const TableToolbar = ({
  title,
  showFilters,
  onToggleFilters,
  onAddClick,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const theme = useTheme();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        background: `linear-gradient(to right, ${theme.palette.grey[50]}, ${theme.palette.common.white})`,
            borderTopLeftRadius: '12px !important',
    borderTopRightRadius: '12px !important',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: `1px solid ${theme.palette.divider}`,
        minHeight: '72px',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* === کانتینر اصلاح‌شده جستجو === */}
        <Box
          sx={{
            position: 'relative',
            // عرض متغیر برای انیمیشن
            width: isSearchOpen ? 280 : 48,
            // ارتفاع ثابت برای هم‌ترازی با دکمه‌ها
            height: 36.5, // کمی بیشتر از ارتفاع استاندارد دکمه برای تراز بهتر
            transition: 'width 0.3s ease-in-out',
            borderRadius: 2,
            backgroundColor: isSearchOpen ? theme.palette.background.paper : 'transparent',
            border: isSearchOpen ? `1px solid ${theme.palette.divider}` : 'none',
          }}
        >
          {/* آیکون جستجو - همیشه در مرکز عمودی کانتینر قرار دارد */}
          <Tooltip title="Search">
            <IconButton
              onClick={handleSearchClick}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)', // مرکز کردن عمودی
                opacity: isSearchOpen ? 0 : 1,
                pointerEvents: isSearchOpen ? 'none' : 'auto',
                transition: 'opacity 0.2s ease-in-out',
                p: 1.5,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* فیلد ورودی جستجو - کل کانتینر را پر می‌کند */}
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%', // ارتفاع کامل کانتینر
              opacity: isSearchOpen ? 1 : 0,
              pointerEvents: isSearchOpen ? 'auto' : 'none',
              transition: 'opacity 0.2s ease-in-out 0.1s',
              // حذف top: -10 و استایل‌های اضافی
              '& .MuiOutlinedInput-root': {
                height: '100%', // ارتفاع کامل کانتینر
                borderRadius: 2,
                backgroundColor: 'transparent',
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              },
            }}
            InputProps={{
              sx: { height: '100%' }, // اطمینان از پر شدن ارتفاع
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 1 }}>
                  <SearchIcon fontSize="small" sx={{ color: theme.palette.action.active }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 0.5 }}>
                  <IconButton
                    aria-label="clear search"
                    onClick={handleSearchClose}
                    edge="end"
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoFocus
          />
        </Box>



        {/* دکمه نمایش/مخفی کردن فیلترها */}
        <Tooltip title={showFilters ? 'Hide Filters' : 'Show Filters'}>
          <Button
            variant="outlined"
            startIcon={showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
            onClick={onToggleFilters}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              px: 2,
              borderColor: theme.palette.grey[400],
              color: theme.palette.text.secondary,
              '&:hover': {
                borderColor: theme.palette.grey[600],
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Filters
          </Button>
        </Tooltip>

                {/* دکمه افزودن داده جدید */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            borderRadius: 2,
            boxShadow: `0 2px 4px ${theme.palette.primary.main}30`,
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3,
            '&:hover': {
              boxShadow: `0 4px 8px ${theme.palette.primary.main}50`,
            },
          }}
        >
          Add New
        </Button>
      </Box>
    </Toolbar>
  );
};

export default TableToolbar;