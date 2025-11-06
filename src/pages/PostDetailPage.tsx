import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, fetchComments } from '../api/posts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { CommentItem } from '../components/CommentItem';

export function PostDetailPage() {
  // Get the postId from the URL parameters
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = postIdStr ? parseInt(postIdStr) : undefined;

  // Handle invalid/missing ID
  if (!postId) {
    return <div className="p-8 text-red-500">Invalid Post ID.</div>;
  }

  // Fetch the post data
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  // Fetch the comments data
  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  // Loading states
  if (postQuery.isLoading) {
    return (
      <div className="p-8 text-center text-xl">Loading post details...</div>
    );
  }
  if (postQuery.isError) {
    return (
      <div className="p-8 text-red-600">
        Error loading post: {postQuery.error.message}
      </div>
    );
  }
  const post = postQuery.data;

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        {post?.title}
      </h1>

      {/* Post card */}
      <Card className="mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{post?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">{post?.body}</p>
          <p className="text-sm text-gray-400 mt-4">
            Posted by User ID: {post?.userId}
          </p>
        </CardContent>
      </Card>

      {/* Comments section */}
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">Comments</h2>
      {commentsQuery.isLoading && (
        <div className="text-center text-lg text-gray-500">
          Loading comments...
        </div>
      )}
      {commentsQuery.isError && (
        <div className="text-red-500">
          Error loading comments: {commentsQuery.error.message}
        </div>
      )}

      {commentsQuery.data && (
        <div className="space-y-6">
          {commentsQuery.data.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
