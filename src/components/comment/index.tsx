import React from 'react';
import moment from 'moment';

import { Comment } from '@/screens/home/types';

import { Divider } from '@mui/material';
import styles from './comment.module.scss';

interface CommentProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div key={comment.id} className={styles.comment}>
      <h4 className={styles.author}>{comment.user.email}</h4>
      <Divider />
      <p className={styles.content}>{comment.comment_content}</p>
      <p className={styles.date}>{moment(new Date(comment.created_at)).fromNow()}</p>
    </div>
  );
};
