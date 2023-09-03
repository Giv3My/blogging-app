import React from 'react';

import { PostsContext } from '@/contexts';
import { useToggle, useUserSession } from '@/hooks';
import type { Post, ProfileType } from './types';

import { NewMessageForm, PostItem } from '@/components';
import { CommentsModal } from '@/components/ui';
import styles from './home.module.scss';

interface HomeProps {
  // posts: Post[];
}

export const Home: React.FC<HomeProps> = () => {
  const session = useUserSession();
  const { posts, createPost, selectedPost, setSelectedPost } =
    React.useContext(PostsContext);
  const [isModalOpen, onToggleModal] = useToggle();
  const [postContent, setPostContent] = React.useState('');

  const profileType: ProfileType = session?.user.user_metadata.profileType;

  const handlePostChange = (value: string) => {
    setPostContent(value);
  };

  const handleShowCommentsClick = (post: Post) => () => {
    onToggleModal();
    setSelectedPost(post);
  };

  const onSubmit = () => {
    createPost(postContent);
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
              onSubmit={onSubmit}
            />
          )}

          <div className={styles.posts}>
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
        handleClose={onToggleModal}
        comments={selectedPost?.comments ?? []}
      />
    </>
  );
};
