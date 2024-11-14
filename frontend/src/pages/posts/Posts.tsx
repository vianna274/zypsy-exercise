import { styled } from "styled-components";
import Content from "./Content";
import Sidebar from "./Sidebar";

const PostsContainer = styled.div`
  display: flex;
`;

const Posts: React.FC = () => (
  <PostsContainer>
    <Sidebar />
    <Content />
  </PostsContainer>
);

export default Posts;
