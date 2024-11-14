import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export type PostResponse = {
  id: string;
  description: string;
  date: string;
  categories: string[];
};

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
  enhancedUpdateCategory: (category: Category) => void;
  setSelectedCategory: (category: Category) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded || !categories.length) return;

    const selectedCategoryId = sessionStorage.getItem("selectedCategoryId");
    const selectedCategory = categories.find(
      (c) => c.id === selectedCategoryId
    );

    setSelectedCategory(selectedCategory);
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const enhancedSetSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
    sessionStorage.setItem("selectedCategoryId", category.id);
  };

  const enhancedSetPosts = (posts: PostResponse[]) => {
    const enhancedPosts = posts.map((post) => ({
      ...post,
      categories: post.categories.map(
        (categoryId) => categories.find((c) => c.id === categoryId)!
      ),
    }));

    setPosts(enhancedPosts);
  };

  const enhancedUpdateCategory = (category: Category) => {
    setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    setPosts(
      posts.map((p) => ({
        ...p,
        categories: p.categories.map((c) =>
          c.id === category.id ? category : c
        ),
      }))
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        setCategories,
        selectedCategory,
        enhancedUpdateCategory,
        setSelectedCategory: enhancedSetSelectedCategory,
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
