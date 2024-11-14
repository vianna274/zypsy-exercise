import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Button from './components/Button';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
      </>
    </ThemeProvider>
  );
}

export default App;
