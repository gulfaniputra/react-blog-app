import type { Post } from '../types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  onPostSelect: (postId: number) => void;
}

// We use the posts prop directly (static version)
export function PostList({ posts, onPostSelect }: PostListProps) {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        // Pass the post object & a placeholder selection handler
        <PostCard
          key={post.id}
          post={post}
          onSelect={onPostSelect}
        />
      ))}
    </div>
  );
}
