import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createComment } from '../api/posts';
import type { CreateCommentPayload } from '../api/posts';

interface CommentMutationArgs {
  postId: number;
  data: CreateCommentPayload;
}

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  const COMMENTS_QUERY_KEY = ['comments', postId];

  return useMutation({
    mutationFn: ({ postId, data }: CommentMutationArgs) =>
      createComment(postId, data),

    // Success handler
    onSuccess: () => {
      // Invalidate the comments query to force a refetch & show the new comment
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });

      // Show a success toast
      toast.success('Comment Posted!', {
        description: 'Your comment has been successfully added.',
      });
    },

    // Error handler
    onError: error => {
      // Show an error toast
      toast.error('Failed to Post Comment', {
        description:
          error.message || 'Please check your connection and try again.',
      });
    },
  });
};
