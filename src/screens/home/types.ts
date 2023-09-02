export type ProfileType = 'author' | 'commentator';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  post_content: string;
  created_at: string;
  comments: Comment[];
  user: User;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  comment_content: string;
  created_at: string;
  user: User;
}
