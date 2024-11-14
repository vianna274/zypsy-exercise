import { useState, useEffect, useMemo } from "react";
import RadioButton from "../../components/RadioButton";
import axiosInstance from "../../utils/axiosConfig";
import Button from "../../components/Button";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 320px;
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

type Category = {
  id: string;
  name: string;
  favorite: boolean;
};

type Post = {
  id: string;
  description: string;
  date: string;
  categories: Category[];
};

const Sidebar: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "favorite">("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    axiosInstance
      .get<Category[]>("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // useEffect(() => {
  //   if (!selectedCategory) return;

  //   axiosInstance
  //     .get<Post[]>("/posts")
  //     .then((response) => setPosts(response.data))
  //     .catch((error) => console.error("Error fetching posts:", error));
  // }, [selectedCategory]);

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
