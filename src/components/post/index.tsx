import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { motion } from 'framer-motion';

import { variants } from './animations';
import type { Post, ProfileType } from '@/screens/home/types';

import { Divider } from '@mui/material';
import styles from './post.module.scss';

interface PostItemProps {
  post: Post;
  onShowCommentsClick: (post: Post) => () => void;
  onSelectPost?: (post: Post) => () => void;
  profileType?: ProfileType;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onShowCommentsClick,
  onSelectPost,
  profileType,
}) => {
  return (
    <motion.div
      className={styles.post}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={variants}
    >
      <Link href={`/author/${post.user_id}`} shallow={true}>
        <h4 className={styles.author}>{post.user.email}</h4>
      </Link>
      <Divider />
      <p className={styles.content}>{post.post_content}</p>
      <div className={styles['post-footer']}>
        <p className={styles.date}>{moment(new Date(post.created_at)).fromNow()}</p>
        <div>
          {post.comments.length > 0 && (
            <p className={styles['show-comments']} onClick={onShowCommentsClick(post)}>
              Show comments
            </p>
          )}
          {profileType === 'commentator' && (
            <p className={styles['add-comment']} onClick={onSelectPost?.(post)}>
              Comment
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
