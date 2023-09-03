import React from 'react';

import { PostsContext } from '@/contexts';
import { useToggle, useUserSession } from '@/hooks';
import type { Post, User, ProfileType } from '../home/types';

import { NewMessageForm, PostItem } from '@/components';
import { CommentsModal } from '@/components/ui';
import styles from './author.module.scss';

interface AuthorProps {
  author: User;
  postList: Post[];
}

export const Author: React.FC<AuthorProps> = ({ author, postList }) => {
  const session = useUserSession();
  const { posts, setPosts, selectedPost, setSelectedPost, createComment } =
    React.useContext(PostsContext);
  const [isModalOpen, onToggleModal] = useToggle();
  const [commentContent, setCommentContent] = React.useState('');
  const [isCommenting, setIsCommenting] = React.useState(false);

  const profileType: ProfileType = session?.user.user_metadata.profileType;

  const handleSelectPost = (post: Post) => () => {
    if (post.id === selectedPost?.id) {
      setSelectedPost(null);
      setIsCommenting(false);
    } else {
      setSelectedPost(post);
      setIsCommenting(true);

      scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleCommentChange = (value: string) => {
    setCommentContent(value);
  };

  const handleShowCommentsClick = (post: Post) => () => {
    onToggleModal();
    setSelectedPost(post);
  };

  const onSubmit = () => {
    createComment(commentContent);
    setCommentContent('');
    setSelectedPost(null);
    setIsCommenting(false);
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.author}>Author: {author.email}</h2>
          {isCommenting && (
            <NewMessageForm
              messageType="comment"
              message={commentContent}
              onMessageChange={handleCommentChange}
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
                  onSelectPost={handleSelectPost}
                  profileType={profileType}
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
