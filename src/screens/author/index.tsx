import React from 'react';

import { supabase } from '@/supabase/client';
import { useUserSession } from '@/hooks';
import type { Post, Comment, User, ProfileType } from '../home/types';

import { NewMessageForm, PostItem } from '@/components';
import { CommentsModal } from '@/components/ui';
import styles from './author.module.scss';

interface AuthorProps {
  author: User;
  postList: Post[];
}

export const Author: React.FC<AuthorProps> = ({ author, postList }) => {
  const session = useUserSession();
  const profileType: ProfileType = session?.user.user_metadata.profileType;

  const [posts, setPosts] = React.useState(postList);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [commentContent, setCommentContent] = React.useState('');
  const [postId, setPostId] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSelectPost = (id: string) => () => {
    if (id === postId) {
      setPostId('');
    } else {
      setPostId(id);
    }
  };

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentContent(e.target.value);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleShowCommentsClick = (id: string) => () => {
    setIsModalOpen(true);

    const selectedComments = posts.find((post) => post.id === id)?.comments;
    setComments(selectedComments!);
  };

  const handleCreateComment: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newComment = {
      user_id: session?.user.id!,
      post_id: postId,
      comment_content: commentContent,
    };

    const { data: comment } = await supabase
      .from('comments')
      .insert(newComment)
      .select(`*, post:posts (*), user:profiles (*)`)
      .single();

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [comment as Comment, ...post.comments] }
          : post
      )
    );

    setCommentContent('');
    setPostId('');
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.author}>Author: {author.email}</h2>
          {postId && (
            <NewMessageForm
              messageType="comment"
              message={commentContent}
              onMessageChange={handleCommentChange}
              onSubmit={handleCreateComment}
            />
          )}
          <div
            className={styles.posts}
            style={{ maxHeight: profileType === 'commentator' ? '550px' : 'fit-content' }}
          >
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
        handleClose={handleModalClose}
        comments={comments}
      />
    </>
  );
};
