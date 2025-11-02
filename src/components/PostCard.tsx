import type { Post } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface PostCardProps {
  post: Post;
  // We'll add onClick handler later, but for static version, it's just a prop
  onSelect: (postId: number) => void;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        {/* Only show the first 50 characters of the title for brevity */}
        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Only show the first 100 characters of the body */}
        <p className="text-sm text-gray-500 line-clamp-3">
          {post.body.substring(0, 100)}...
        </p>
      </CardContent>
    </Card>
  );
}
