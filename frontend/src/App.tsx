import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Button from './components/Button';
import RadioButton from './components/RadioButton';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
        <RadioButton label="Radio button" value="radio" checked={false} onChange={() => {}} />
        <RadioButton label="Radio button" value="radio" checked={true} onChange={() => {}} />
      </>
    </ThemeProvider>
  );
}

export default App;
