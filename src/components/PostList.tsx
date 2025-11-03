import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';
import { PostCard } from './PostCard';
import type { Post } from '../types';

interface PostListProps {
  onPostSelect: (postId: number) => void;
}

const POSTS_QUERY_KEY = ['posts'];

export function PostList({ onPostSelect }: PostListProps) {
  // Use 'useQuery' to fetch data
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
  });

  // 2. Handle loading state
  if (isLoading) {
    return <div className="p-8 text-center text-xl">Loading posts...</div>;
  }

  // Handle error state
  if (isError) {
    // Show a user-friendly error message
    return (
      <div className="p-8 text-center text-red-600">
        Error loading posts: {error.message}
      </div>
    );
  }

  // Render data
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map(post => (
        <div
          key={post.id}
          onClick={() => onPostSelect(post.id)}
        >
          <PostCard
            post={post}
            onSelect={onPostSelect}
          />
        </div>
      ))}
    </div>
  );
}
