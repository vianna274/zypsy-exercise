import { useEffect } from 'react';
import { PostResponse, usePosts } from './context';
import axiosInstance from '../../utils/axiosConfig';
import PostCard from './PostCard';
import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-left: ${({ theme }) => theme.spacing(3)};
  margin-right: ${({ theme }) => theme.spacing(3)};
  min-height: calc(100vh - 128px);
`;

const ContentHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) =>
    `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  color: ${({ theme }) => theme.colors.foregroundSecondary};
  font-weight: 600;
`;

const Content: React.FC = () => {
  const { selectedCategory, posts, setPosts } = usePosts();

  useEffect(() => {
    if (!selectedCategory) {
      setPosts([]);
      return;
    }

    axiosInstance
      .get<PostResponse[]>(`/categories/${selectedCategory.id}/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <Container>
      <ContentHeader>
        {posts.length > 0
          ? `Found ${posts.length} posts of ${selectedCategory?.name}`
          : 'No posts found'}
      </ContentHeader>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default Content;
