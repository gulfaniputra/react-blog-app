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
import {
  PostDetailSkeleton,
  CommentItemSkeleton,
} from '../components/PostDetailSkeleton';

const SKELETON_COMMENT_COUNT = 3;

export function PostDetailPage() {
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = postIdStr ? parseInt(postIdStr) : undefined;

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

  // Primary loading state
  // Show full page skeleton while post data is fetching
  if (postQuery.isLoading) {
    // Show the full page skeleton while the main post data is loading
    return <PostDetailSkeleton />;
  }

  if (postQuery.isError) {
    return (
      <div className="p-8 text-red-600 text-center">
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

      {/* Content is ready */}
      {/* Post Card*/}
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

      <div className="space-y-6">
        {commentsQuery.isLoading ? (
          // Secondary loading state
          // Show comment skeletons while comments are fetching
          Array.from({ length: SKELETON_COMMENT_COUNT }).map((_, index) => (
            <CommentItemSkeleton key={index} />
          ))
        ) : commentsQuery.isError ? (
          <div className="text-red-500 text-center p-4 border border-red-200 bg-red-50 rounded-md">
            Error loading comments: {commentsQuery.error.message}
          </div>
        ) : (
          // Comments data
          commentsQuery.data?.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
}
