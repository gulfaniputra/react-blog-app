import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import type { CreatePostPayload } from '../api/posts';

// Custom hook to handle the creation of a new post
// It uses 'useMutation' & handles cache invalidation
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const POSTS_QUERY_KEY = ['posts'];

  return useMutation({
    // The function that performs the API call
    mutationFn: (newPost: CreatePostPayload) => createPost(newPost),

    // What to do on successful mutation
    onSuccess: newPostData => {
      // Invalidate the cache for the posts list
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });

      console.log('Post created successfully:', newPostData.id);
    },

    // What to do on error
    onError: error => {
      console.error('Failed to create post:', error);
      alert(`Error: Failed to create post! ${error.message}`);
    },
  });
};
