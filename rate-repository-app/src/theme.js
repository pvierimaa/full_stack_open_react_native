import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.OS === 'ios' ? 'Arial' : Platform.OS === 'android' ? 'Roboto' : 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
