import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#1A2E05',
    hoverPrimary: 'rgba(26, 46, 5, 0.3)',
    hoverTransparent: 'rgba(255, 255, 255, 0.3)',
    primaryBackground: '#E3E3E3',
    surface: '#FFFFFF',
    foreground: '#252525',
    accent: '#E5E7EB'
  },
  spacing: (factor: number) => `${8 * factor}px`, 
  fonts: {
    main: 'Arial, sans-serif',
  },
  borderRadius: '4px',
};

export default theme;