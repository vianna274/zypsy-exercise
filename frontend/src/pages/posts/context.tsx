import { createContext, useState, useContext, ReactNode } from "react";

export type Category = {
  id: string;
  name: string;
  favorite: boolean;
};

export type Post = {
  id: string;
  description: string;
  date: string;
  categories: Category[];
};

type PostsContextType = {
  posts: Post[];
  categories: Category[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        setPosts,
        setCategories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }

  return context;
};
