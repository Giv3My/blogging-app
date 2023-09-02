import React from 'react';

import { TextareaAutosize } from '@mui/material';
import { SendIcon } from '@/assets/icons';
import styles from './new-message-form.module.scss';

interface NewMessageFormProps {
  messageType: 'post' | 'comment';
  message: string;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({
  messageType,
  message,
  onMessageChange,
  onSubmit,
}) => {
  return (
    <form className={styles['new-message-form']} onSubmit={onSubmit}>
      <div className={styles['input-field']}>
        <TextareaAutosize
          placeholder={`Send a ${messageType}`}
          value={message}
          onChange={onMessageChange}
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
    </form>
  );
};
