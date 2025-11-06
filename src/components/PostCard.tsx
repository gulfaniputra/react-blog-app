import type { Post } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  // Add 'onSelect' prop for compatibility with 'PostList'
  onSelect?: (postId: number) => void;
}

export function PostCard({ post, onSelect }: PostCardProps) {
  return (
    // Use React Router 'Link' component to wrap the card & navigate to the detail page
    <Link
      to={`/posts/${post.id}`}
      className="block hover:no-underline"
      onClick={() => onSelect?.(post.id)}
    >
      <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
        <CardHeader>
          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 line-clamp-3">
            {post.body.substring(0, 100)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
