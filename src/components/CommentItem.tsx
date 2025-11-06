import { Card, CardHeader, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Comment } from '../api/posts';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card className="shadow-sm border-l-4 border-gray-200">
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-700">{comment.name}</p>
          <Badge
            variant="secondary"
            className="text-xs"
          >
            {comment.email}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2 px-4">
        <p className="text-sm text-gray-600">{comment.body}</p>
      </CardContent>
    </Card>
  );
}
