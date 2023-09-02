import React from 'react';

import { Comment } from '@/screens/home/types';

import { Modal } from '@mui/material';
import { CommentItem } from '@/components';
import styles from './comments-modal.module.scss';

interface CommentsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  comments: Comment[];
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  handleClose,
  comments,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={styles['comments-modal']}>
        <div className={styles.comments}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </Modal>
  );
};
