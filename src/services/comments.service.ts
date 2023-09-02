import { supabase } from '@/supabase/client';
import { Comment } from '@/screens/home/types';

export const createComment = async (newComment: Comment) => {
  const { data: comment, error } = await supabase
    .from('comments')
    .insert(newComment)
    .select(`*, post:posts (*), user:profiles (*)`)
    .single();

  return {
    comment: comment as Comment,
    error,
  };
};
