import { createContext, useState, useContext, ReactNode } from "react";

export type PostResponse = {
  id: string;
  description: string;
  date: string;
  categories: string[];
}

export type Category = {
  id: string;
  name: string;
  favorite: boolean;
};

export type Post = Omit<PostResponse, "categories"> & {
  categories: Category[];
};

type PostsContextType = {
  posts: Post[];
  categories: Category[];
  setPosts: (posts: PostResponse[]) => void;
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

  const enhancedSetPosts = (posts: PostResponse[]) => {
    const enhancedPosts = posts.map(post => ({
      ...post,
      categories: post.categories.map(categoryId => categories.find(c => c.id === categoryId)!),
    }));

    setPosts(enhancedPosts);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        setPosts: enhancedSetPosts,
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
