import { useState, useEffect, useMemo } from "react";
import RadioButton from "../../components/RadioButton";
import axiosInstance from "../../utils/axiosConfig";
import Button from "../../components/Button";
import styled from "styled-components";
import { Category, usePosts } from "./context";

const SidebarContainer = styled.div`
  width: 320px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.accent};
`;

const SidebarContent = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 320px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;  

const Sidebar: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "favorite">("all");
  const { categories, setCategories, setSelectedCategory, selectedCategory } = usePosts();

  useEffect(() => {
    axiosInstance
      .get<Category[]>("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [setCategories]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredCategories = useMemo(
    () =>
      filter === "favorite"
        ? categories.filter((category) => category.favorite)
        : categories,
    [filter, categories]
  );

  return (
    <SidebarContainer>
      <SidebarHeader>Posts</SidebarHeader>
      <SidebarContent>
        <FiltersContainer>
          <RadioButton
            value="all"
            label="All Categories"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          <RadioButton
            value="favorite"
            label="Favorite Categories"
            checked={filter === "favorite"}
            onChange={() => setFilter("favorite")}
          />
        </FiltersContainer>
        <CategoriesContainer>
        {filteredCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryChange(category)}
            favorite={category.favorite}
            variant={selectedCategory?.id === category.id ? "secondary" : "primary"}
          >
            {category.name}
          </Button>
        ))}
        </CategoriesContainer>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
