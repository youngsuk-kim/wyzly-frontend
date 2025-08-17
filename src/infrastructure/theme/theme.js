import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green 800
      light: '#4caf50', // Green 500
      dark: '#1b5e20', // Green 900
      contrastText: '#fff',
    },
    secondary: {
      main: '#00796b', // Teal 700
      light: '#26a69a', // Teal 400
      dark: '#004d40', // Teal 900
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    success: {
      main: '#43a047', // Green 600
      light: '#66bb6a', // Green 400
      dark: '#2e7d32', // Green 800
      contrastText: '#fff',
    },
    background: {
      default: '#f1f8e9', // Light Green 50
      paper: '#fff',
    },
  },
  typography: {
    // Use Poppins for headings, Nunito for body text
    fontFamily: [
      'Nunito',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.8rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.6rem',
      },
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.6rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.4rem',
      },
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontSize: '0.9rem',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          padding: '8px 22px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2e7d32 30%, #43a047 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #00796b 30%, #26a69a 90%)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(46, 125, 50, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px 12px',
        },
        title: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        },
        subheader: {
          fontFamily: 'Nunito, sans-serif',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '12px 24px 20px',
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          background: 'linear-gradient(90deg, #2e7d32 0%, #1b5e20 100%)',
          borderRadius: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 24,
          paddingBottom: 24,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            fontFamily: 'Nunito, sans-serif',
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#43a047',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            padding: '14px 16px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 500,
          borderRadius: 8,
        },
        label: {
          padding: '0 12px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(46, 125, 50, 0.15)',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 600,
        },
        secondary: {
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 16px',
        },
        message: {
          fontFamily: 'Nunito, sans-serif',
          fontSize: '0.95rem',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
