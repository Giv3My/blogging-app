import React from 'react';

import { commentsService, postsService } from '@/services';
import { useUserSession } from '@/hooks';
import { Post, Comment } from '@/screens/home/types';

interface Context {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  createPost: (post_content: string) => void;
  createComment: (comment_content: string) => void;
}

interface PostsProviderProps {
  postList: Post[];
}

export const PostsContext = React.createContext<Context>({} as Context);

export const PostsProvider: React.FC<React.PropsWithChildren<PostsProviderProps>> = ({
  children,
  postList,
}) => {
  const session = useUserSession();

  const [posts, setPosts] = React.useState<Post[]>(postList);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const createPost = async (post_content: string) => {
    const newPost = {
      user_id: session?.user.id,
      post_content,
    };

    const { post } = await postsService.createPost(newPost as Post);

    setPosts((prev) => {
      return [post, ...prev];
    });
  };

  const createComment = async (comment_content: string) => {
    const newComment = {
      user_id: session?.user.id,
      post_id: selectedPost?.id,
      comment_content,
    };

    const { comment } = await commentsService.createComment(newComment as Comment);

    setPosts((prev) =>
      prev.map((post) =>
        post.id === selectedPost?.id
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      )
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        selectedPost,
        setSelectedPost,
        createPost,
        createComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
