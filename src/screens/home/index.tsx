import React from 'react';

import { postsService } from '@/services';
import { useUserSession } from '@/hooks';
import type { Comment, Post, ProfileType } from './types';

import { NewMessageForm, PostItem } from '@/components';
import { CommentsModal } from '@/components/ui';
import styles from './home.module.scss';

interface HomeProps {
  postList: Post[] | null;
}

export const Home: React.FC<HomeProps> = ({ postList }) => {
  const session = useUserSession();
  const profileType: ProfileType = session?.user.user_metadata.profileType;

  const [postContent, setPostContent] = React.useState('');
  const [posts, setPosts] = React.useState(postList ?? []);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handlePostChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPostContent(e.target.value);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleShowCommentsClick = (id: string) => () => {
    setIsModalOpen(true);

    const selectedComments = posts.find((post) => post.id === id)?.comments!;
    setComments(selectedComments);
  };

  const handleCreatePost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newPost = {
      user_id: session?.user.id!,
      post_content: postContent,
    };

    const { post } = await postsService.createPost(newPost as Post);

    setPostContent('');
    setPosts((prev) => {
      return prev && [post, ...prev];
    });
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
        handleClose={handleModalClose}
        comments={comments}
      />
    </>
  );
};
