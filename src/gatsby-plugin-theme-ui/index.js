//Changes to theme need to changed in ./styles/_variables file as well for consistency
//Theme: https://coolors.co/28a745-e91d1d-0d1321-1d2d44-84acce

// eslint-disable-next-line no-unused-vars
import { darken, lighten } from '@theme-ui/color'

const theme = {
  styles: {
    root: {
      body: {
        fontFamily: `'Arial', Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace`,
        margin: '0px',
        fontSize: '0.875rem',
        fontWeight: 'normal',
        lineHeight: 1.5,
        color: 'gray700',
        textAlign: 'left',
        backgroundColor: 'white'
      },
      h1: {
        variant: 'text.heading',
        fontSize: '2.5rem'
      },
      h2: {
        variant: 'text.heading',
        fontSize: '2rem'
      },
      h3: {
        variant: 'text.heading',
        fontSize: '1.75rem'
      },
      h4: {
        variant: 'text.heading',
        fontSize: '1.5rem'
      },
      h5: {
        variant: 'text.heading',
        fontSize: '1.25rem'
      },
      h6: {
        variant: 'text.heading',
        fontSize: '1rem'
      },
      p: {
        variant: 'text.body',
        marginBottom: '0.6rem'
      },
      table: {
        width: '100%',
        border: '1px solid #e9ecef',
        marginBottom: '1rem',
        color: 'gray700',
        backgroundColor: 'white', // Reset for nesting within parents with `background-color`.
        borderCollapse: 'collapse'
      },
      th: {
        padding: '.75rem',
        verticalAlign: 'top',
        border: '1px solid #e9ecef'
      },
      td: {
        padding: '.75rem',
        verticalAlign: 'top',
        border: '1px solid #e9ecef'
      },
      tBody: {
        border: '1px solid #e9ecef'
      },
      thead: {
        verticalAlign: 'bottom',
        borderBottom: '2px solid #e9ecef'
      },
      a: {
        color: 'warning',
        '&:visited': {
          textDecoration: 'none'
        }
      }
    }
  },

  text: {
    heading: {
      marginTop: '0px',
      marginBottom: '0.5rem',
      fontFamily: `'Arial', Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace`,
      lineHeight: 1.1,
      fontWeight: 500
    },
    body: {
      marginTop: '0px',
      marginBottom: '0.6rem',
      fontFamily: `'Open sans', sans-serif`,
      fontWeight: 400,
      lineHeight: 1.5,
      fontSize: '0.875rem'
    }
  },
  colors: {
    primary: '#1d2d44',
    accentBlue: '#06a9f5',
    primaryLight: '#06a9f540',
    orangeLight: '#fd7e1440',
    warningLight: '#ffc10740',
    successLight: '#28a74540',
    dangerLight: '#e91d1d40',
    secondary: '#868e96',
    warning: '#84acce',
    danger: '#e91d1d',
    success: '#28a745',
    orange: '#fd7e14',
    info: '#17a2b8',
    white: '#fff',
    purpleLight: '#D5AEFF',
    teal: '#84acce',
    yellow: '#ffc107',
    gray100: '#f8f9fa',
    gray200: '#e9ecef',
    gray300: '#dee2e6',
    gray400: '#ced4da',
    gray500: '#adb5bd',
    gray600: '#8e959c',
    gray700: '#495057',
    gray800: '#343a40',
    gray900: '#212529',
    black: '#000'
  },
  breakpoints: ['0px', '576px', '768px', '992px', '1200px'],
  space: [
    `${1}rem`,
    `${1 * 0.25}rem`,
    `${1 * 0.5}rem`,
    `${1 * 1}rem`,
    `${1 * 1.5}rem`,
    `${1 * 3}rem`
  ],
  borders: {
    default: '1px solid #e9ecef'
  },
  shadows: {
    card: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)'
  },
  card: {
    borderRadius: '0.2rem',
    backgroundColor: 'white',
    padding: 3,
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'gray300'
  },
  cards: {
    default: {
      backgroundColor: 'white',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0px',
      wordWrap: 'break-word',
      backgroundClip: 'border-box',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'gray300',
      borderRadius: '0.2rem'
    }
  },
  container: {
    maxWidth: '1600px',
    margin: '0 auto',
    height: '100%',
    padding: '40px 20px',
    flex: 1,
    width: '100%',
    '@media(max-width: 768px)': {
      width: '100%',
      padding: '20px 10px 10px 10px',
      marginLeft: '0px'
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '0 -15px'
  },
  column: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
    padding: '0 15px'
  },
  label: {
    marginBottom: '0.5rem',
    width: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  ListGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '0px',
    marginBottom: '0px'
  },
  ListGroupItem: {
    position: 'relative',
    display: 'block',
    padding: '0.75rem 1.25rem',
    bg: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.125)',
    '&:first-child': {
      borderTopLeftRadius: '0.2rem',
      borderTopRightRadius: '0.2rem'
    },
    '&:last-child': {
      marginBottom: '0px',
      borderBottomLeftRadius: '0.2rem',
      borderBottomRightRadius: '0.2rem'
    }
  },
  Jumbotron: {
    padding: ['4rem 2rem', null, null, '2rem 1rem'],
    marginBottom: '2rem',
    backgroundColor: 'gray200',
    borderRadius: '0.3rem'
  },
  NavBar: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem'
  },
  NavbarBrand: {
    display: 'inline-block',
    marginRight: '1rem',
    // fontSize: '1.25rem',
    lineHeight: 'inherit',
    padding: '0px',
    whiteSpace: 'nowrap',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  Nav: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '0px',
    marginBottom: '0px',
    listStyle: 'none',
    alignItems: 'center'
  },
  NavItem: {
    padding: '0px',
    margin: '0px',
    listStyle: 'none'
  },
  ModalFooter: {
    display: 'flex',
    width: '100%',

    gap: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',

    pt: '1rem'
  },
  ModalBody: {
    position: 'relative',
    flex: '1 1 auto',
    paddingTop: '1rem'
  },
  ModalHeader: {
    display: 'flex',
    alignItems: 'flex-start', // so the close btn always stays on the upper right corner
    justifyContent: 'space-between', // Put modal header elements (title and dismiss) on opposite ends
    paddingb: '15px',
    borderTopRadius: '0.3rem'
  },
  forms: {
    input: {
      primary: {
        display: 'block',
        width: '100%',
        height: 'auto',
        padding: '0.5rem 0.75rem',
        fontFamily: 'inherit',
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: 1.25,
        color: 'gray700',
        backgroundColor: 'white',
        backgroundClip: 'padding-box',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray300',
        borderRadius: '0.2rem',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: theme =>
            `inset 0px 1px 1px ${theme.colors.gray200}`
        },
        '&::placeholder': {
          color: theme => `${theme.colors.gray600}`,
          fontSize: 'small',
          opacity: 1
        }
      },
      tappableInput: {
        minHeight: '70px',
        position: 'relative',
        backgroundColor: 'secondary',
        whiteSpace: 'normal',
        overflowWrap: 'normal',
        fontFamily: 'inherit',
        border: 'none',
        color: 'white',
        outline: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:active': {
          filter: 'brightness(0.75)'
        },
        '&:focus': {
          filter: 'brightness(0.75)'
        },
        '&:hover': {
          filter: 'brightness(0.75)'
        }
      }
    },
    textarea: {
      variant: 'forms.input'
    }
  },
  buttons: {
    primary: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      gap: '4px',
      cursor: 'pointer',
      textTransform: 'capitalize',
      color: 'white',
      bg: 'primary',
      fontFamily: 'inherit',
      fontSize: '.775rem',
      boxSizing: 'border-box',
      transition: 'all 0.15s ease-in-out',
      padding: '0.5rem 0.75rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary',
      borderRadius: '0.2rem',
      lineHeight: 1.25,
      verticalAlign: 'middle',
      textAlign: 'center',
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(63, 77, 96, 0.3)'
      },
      '&:hover': {
        backgroundColor: darken('primary', 0.05)
      },

      '&:disabled': {
        opacity: 0.4,
        boxShadow: 'none',
        cursor: 'not-allowed'
      }
    },
    secondary: {
      variant: 'buttons.primary',
      bg: 'secondary',
      borderColor: 'secondary',
      '&:hover': {
        backgroundColor: darken('secondary', 0.05)
      }
    },
    danger: {
      variant: 'buttons.primary',
      borderColor: 'danger',
      bg: 'danger',
      '&:hover': {
        backgroundColor: darken('danger', 0.1)
      }
    },
    warning: {
      variant: 'buttons.primary',
      borderColor: 'warning',
      bg: 'warning',
      '&:hover': {
        backgroundColor: darken('warning', 0.1)
      }
    },
    success: {
      variant: 'buttons.primary',
      borderColor: 'success',
      bg: 'success',
      '&:hover': {
        backgroundColor: darken('success', 0.1)
      }
    },
    linkSecondary: {
      variant: 'buttons.primary',
      borderColor: 'transparent',
      background: 'none',
      color: 'secondary',
      boxShadow: 'none',
      '&:hover': {
        cursor: 'pointer',
        color: darken('secondary', 0.1)
      },
      '&:disabled': {
        color: 'gray600'
      }
    },
    link: {
      variant: 'buttons.primary',
      borderColor: 'transparent',
      background: 'none',
      color: 'warning',
      boxShadow: 'none',
      '&:hover': {
        cursor: 'pointer',
        color: darken('warning', 0.1)
      },
      '&:disabled': {
        color: 'gray600'
      }
    },
    naked: {
      variant: 'buttons.primary',
      backgroundColor: 'transparent',
      border: 'transparent',
      boxShadow: 'none',
      color: 'primary',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    dropdown: {
      variant: 'buttons.naked',
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start'
    }
  },
  badges: {
    primary: {
      bg: 'secondary',
      color: 'white',
      display: 'inline-block',
      padding: '0.25em 0.4em',
      fontSize: '90%',
      fontWeight: 'bold',
      lineHeight: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'baseline',
      borderRadius: '0.2rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'secondary',
      wrap: 'nowrap'
    },
    danger: {
      variant: 'badges.primary',
      borderColor: 'danger',
      bg: 'danger'
    },
    warning: {
      variant: 'badges.primary',
      borderColor: 'warning',
      bg: 'warning'
    },
    success: {
      variant: 'badges.primary',
      borderColor: 'success',
      bg: 'success'
    },
    orange: {
      variant: 'badges.primary',
      borderColor: 'orange',
      bg: 'orange'
    }
  }
}

export default theme
