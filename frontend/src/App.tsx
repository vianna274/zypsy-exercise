import { ThemeProvider } from "styled-components";
import theme from "./theme";
import Posts from "./pages/posts/Posts";
import { PostsProvider } from "./pages/posts/context";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PostsProvider>
        <Posts />
      </PostsProvider>
    </ThemeProvider>
  );
}

export default App;
