import React from 'react';

import { supabase } from '@/supabase/client';
import { useUserSession } from '@/hooks';
import type { Comment, Post, ProfileType } from './types';

import { NewMessageForm, PostItem } from '@/components';
import { CommentsModal } from '@/components/ui';
import styles from './home.module.scss';

interface HomeProps {
  postList: Post[];
}

export const Home: React.FC<HomeProps> = ({ postList }) => {
  const session = useUserSession();
  const profileType: ProfileType = session?.user.user_metadata.profileType;

  const [postContent, setPostContent] = React.useState('');
  const [posts, setPosts] = React.useState<Post[]>(postList);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handlePostChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPostContent(e.target.value);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleShowCommentsClick = (id: string) => () => {
    setIsModalOpen(true);

    const selectedComments = posts.find((post) => post.id === id)?.comments;
    setComments(selectedComments!);
  };

  const handleCreatePost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newPost = {
      user_id: session?.user.id!,
      post_content: postContent,
    };

    const { data: post } = await supabase
      .from('posts')
      .insert(newPost)
      .select('*, user:profiles (*), comments (*)')
      .single();

    setPostContent('');
    setPosts((prev) => [post as Post, ...prev]);
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          {profileType === 'author' && (
            <NewMessageForm
              messageType="post"
              message={postContent}
              onMessageChange={handlePostChange}
              onSubmit={handleCreatePost}
            />
          )}

          <div
            className={styles.posts}
            style={{ maxHeight: profileType === 'author' ? '600px' : 'fit-content' }}
          >
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onShowCommentsClick={handleShowCommentsClick}
                />
              ))
            ) : (
              <h3>Post list is currently empty</h3>
            )}
          </div>
        </div>
      </main>
      <CommentsModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        comments={comments}
      />
    </>
  );
};
