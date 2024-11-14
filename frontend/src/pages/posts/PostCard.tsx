import React from "react";
import Button from "../../components/Button";
import { format } from "date-fns";
import { Category, Post, usePosts } from "./context";
import { styled } from "styled-components";
import axiosInstance from "../../utils/axiosConfig";

const Container = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  border-left: 1px solid ${({ theme }) => theme.colors.accent};
  border-right: 1px solid ${({ theme }) => theme.colors.accent};
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  padding-top: ${({ theme }) => theme.spacing(4)};
  margin-top: 0;
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const DescriptionText = styled(DateText)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 400;
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CategoriesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const { setSelectedCategory, enhancedUpdateCategory } = usePosts();

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleFavoriteClick = (category: Category) => {
    axiosInstance
      .put<Category>(`/categories/${category.id}`, {
        ...category,
        favorite: !category.favorite,
      })
      .then((response) => enhancedUpdateCategory(response.data));
  };

  return (
    <Container>
      <DateText>{format(new Date(post.date), "EEEE, MMMM do yyyy")}</DateText>
      <DescriptionText>{post.description}</DescriptionText>
      <CategoriesContainer>
        {post.categories.map((category) => (
          <Button
            key={category.id}
            favorite={category.favorite}
            onClick={() => handleCategoryClick(category)}
            onIconClick={() => handleFavoriteClick(category)}
          >
            {category.name}
          </Button>
        ))}
      </CategoriesContainer>
    </Container>
  );
};

export default PostCard;
