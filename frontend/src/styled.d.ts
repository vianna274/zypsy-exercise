import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      hoverPrimary: string;
      hoverTransparent: string;
      primaryBackground: string;
      surface: string;
      foreground: string;
      foregroundSecondary: string;
      accent: string;
    };
    spacing: (factor: number) => string;
    fonts: {
      main: string;
    };
    borderRadius: string;
  }
} 