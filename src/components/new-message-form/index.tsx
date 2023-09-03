import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { variants } from './animations';

import { TextareaAutosize } from '@mui/material';
import { SendIcon } from '@/assets/icons';
import styles from './new-message-form.module.scss';

interface NewMessageFormProps {
  messageType: 'post' | 'comment';
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: () => void;
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({
  messageType,
  message,
  onMessageChange,
  onSubmit,
}) => {
  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onMessageChange(e.target.value);
  };

  const handleCreatePost: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
    onMessageChange('');
  };

  return (
    <AnimatePresence>
      <motion.form
        {...variants}
        transition={{ ease: 'easeIn', duration: 0.2 }}
        className={styles['new-message-form']}
        onSubmit={handleCreatePost}
      >
        <div className={styles['input-field']}>
          <TextareaAutosize
            placeholder={`Send a ${messageType}`}
            value={message}
            onChange={handleMessageChange}
          />
          <button
            type="submit"
            className={styles['send-btn']}
            style={{
              backgroundColor: !message ? 'transparent' : '#5087b5',
            }}
            disabled={!message}
          >
            <span>
              <SendIcon fill={!message ? '#6b6b6b' : '#fff'} />
            </span>
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};
