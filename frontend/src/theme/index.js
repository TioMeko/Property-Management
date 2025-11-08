import { extendTheme } from '@chakra-ui/react'

// Tokyo Neon Color Palette
// teal/aqua, dusty rose, slate blue, medium blue
const tokyoNeon = {
  // Primary Brand - Medium desaturated blue (from palette)
  brand: {
    50: '#e8f0f7',
    100: '#c5d9eb',
    200: '#9fc0de',
    300: '#78a7d1',
    400: '#5a94c7',
    500: '#3c81bd', // Primary brand color
    600: '#3673b0',
    700: '#2e629f',
    800: '#27518e',
    900: '#1a356f',
  },
  // Secondary - Light desaturated teal
  teal: {
    50: '#e6f7f5',
    100: '#b3e8e1',
    200: '#80d9cd',
    300: '#4dcab9',
    400: '#26bfa5',
    500: '#00b491', // Secondary accent
    600: '#00a483',
    700: '#009271',
    800: '#00805f',
    900: '#005f3f',
  },
  // Accent - Muted dusty rose/pink
  rose: {
    50: '#fceef0',
    100: '#f8d5da',
    200: '#f4bcc4',
    300: '#f0a3ae',
    400: '#ed909e',
    500: '#ea7d8e', // Accent color
    600: '#d37180',
    700: '#b9616e',
    800: '#9f515c',
    900: '#6b353c',
  },
  // Neutral - Dark desaturated slate blue
  slate: {
    50: '#f4f5f7',
    100: '#e3e6ea',
    200: '#d1d6dd',
    300: '#bfc6d0',
    400: '#b1bac6',
    500: '#a3aebc', // Base neutral
    600: '#939da9',
    700: '#7f8994',
    800: '#6b757f',
    900: '#4d555c',
  },
  // Greyscale
  gray: {
    50: '#fafbfc',
    100: '#f4f6f8',
    200: '#e8ecf0',
    300: '#d1d9e0',
    400: '#a8b5c1',
    500: '#7d8fa0',
    600: '#5d6f80',
    700: '#455260',
    800: '#2d3640',
    900: '#1a2026',
  },
  // Success
  success: {
    50: '#e6f7f5',
    100: '#b3e8e1',
    200: '#80d9cd',
    300: '#4dcab9',
    400: '#26bfa5',
    500: '#00b491',
    600: '#00a483',
    700: '#009271',
    800: '#00805f',
    900: '#005f3f',
  },
  // Warning
  warning: {
    50: '#fff8e6',
    100: '#ffecb3',
    200: '#ffe080',
    300: '#ffd44d',
    400: '#ffca26',
    500: '#ffc107',
    600: '#e6ae06',
    700: '#cc9905',
    800: '#b38504',
    900: '#996803',
  },
  // Error
  error: {
    50: '#fceef0',
    100: '#f8d5da',
    200: '#f4bcc4',
    300: '#f0a3ae',
    400: '#ed909e',
    500: '#ea7d8e',
    600: '#d37180',
    700: '#b9616e',
    800: '#9f515c',
    900: '#6b353c',
  },
  // Info
  info: {
    50: '#e8f0f7',
    100: '#c5d9eb',
    200: '#9fc0de',
    300: '#78a7d1',
    400: '#5a94c7',
    500: '#3c81bd',
    600: '#3673b0',
    700: '#2e629f',
    800: '#27518e',
    900: '#1a356f',
  },
}

const theme = extendTheme({
  colors: tokyoNeon,
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(0, 115, 230, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
        _focus: {
          boxShadow: 'outline',
        },
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4,
          py: 2,
        },
        md: {
          fontSize: 'md',
          px: 6,
          py: 3,
        },
        lg: {
          fontSize: 'lg',
          px: 8,
          py: 4,
        },
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
            _dark: {
              bg: `${props.colorScheme}.400`,
            },
          },
          _active: {
            bg: `${props.colorScheme}.700`,
            _dark: {
              bg: `${props.colorScheme}.500`,
            },
          },
          _disabled: {
            bg: `${props.colorScheme}.300`,
            color: 'white',
            opacity: 0.6,
            cursor: 'not-allowed',
            _dark: {
              bg: `${props.colorScheme}.800`,
              color: 'gray.400',
            },
          },
        }),
        outline: (props) => ({
          border: '2px solid',
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          bg: 'transparent',
          _hover: {
            bg: `${props.colorScheme}.50`,
            borderColor: `${props.colorScheme}.600`,
            color: `${props.colorScheme}.600`,
            _dark: {
              bg: `${props.colorScheme}.900`,
              borderColor: `${props.colorScheme}.400`,
              color: `${props.colorScheme}.300`,
            },
          },
          _active: {
            bg: `${props.colorScheme}.100`,
            borderColor: `${props.colorScheme}.700`,
            color: `${props.colorScheme}.700`,
            _dark: {
              bg: `${props.colorScheme}.800`,
              borderColor: `${props.colorScheme}.500`,
              color: `${props.colorScheme}.200`,
            },
          },
          _disabled: {
            borderColor: 'gray.300',
            color: 'gray.400',
            opacity: 0.6,
            cursor: 'not-allowed',
            _dark: {
              borderColor: 'gray.600',
              color: 'gray.500',
            },
          },
        }),
        ghost: (props) => ({
          color: `${props.colorScheme}.500`,
          bg: 'transparent',
          _hover: {
            bg: `${props.colorScheme}.50`,
            color: `${props.colorScheme}.600`,
            _dark: {
              bg: `${props.colorScheme}.900`,
              color: `${props.colorScheme}.300`,
            },
          },
          _active: {
            bg: `${props.colorScheme}.100`,
            color: `${props.colorScheme}.700`,
            _dark: {
              bg: `${props.colorScheme}.800`,
              color: `${props.colorScheme}.200`,
            },
          },
          _disabled: {
            color: 'gray.400',
            opacity: 0.6,
            cursor: 'not-allowed',
            _dark: {
              color: 'gray.500',
            },
          },
        }),
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            bg: 'white',
            _dark: {
              borderColor: 'gray.600',
              bg: 'gray.800',
            },
            _hover: {
              borderColor: 'gray.400',
              _dark: {
                borderColor: 'gray.500',
              },
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: 'gray.200',
          bg: 'white',
          _dark: {
            borderColor: 'gray.700',
            bg: 'gray.800',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 2,
        py: 1,
        fontSize: 'xs',
        fontWeight: 'semibold',
        textTransform: 'uppercase',
        letterSpacing: 'wide',
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
        }),
        subtle: (props) => ({
          bg: `${props.colorScheme}.100`,
          color: `${props.colorScheme}.800`,
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'semibold',
        color: 'gray.900',
        _dark: {
          color: 'gray.50',
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.700',
        _dark: {
          color: 'gray.300',
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.50' : 'gray.900',
      },
    }),
  },
  semanticTokens: {
    colors: {
      'chakra-body-text': {
        _light: 'gray.900',
        _dark: 'gray.50',
      },
      'chakra-body-bg': {
        _light: 'gray.50',
        _dark: 'gray.900',
      },
      'chakra-border-color': {
        _light: 'gray.200',
        _dark: 'gray.700',
      },
      'chakra-placeholder-color': {
        _light: 'gray.400',
        _dark: 'gray.500',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme

