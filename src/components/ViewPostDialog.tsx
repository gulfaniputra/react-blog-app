import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import type { Post } from '../types';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/posts';

interface ViewPostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPostId: number | null;
}

export function ViewPostDialog({
  isOpen,
  onOpenChange,
  selectedPostId,
}: ViewPostDialogProps) {
  // Use 'useQuery', but only enable if 'selectedPostId' is present
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<Post, Error>({
    queryKey: ['post', selectedPostId],
    queryFn: () => fetchPostById(selectedPostId as number),
    enabled: !!selectedPostId,
    // Stale time is shorter for specific data maybe 1 minute
    staleTime: 1000 * 60,
  });

  if (!isOpen) return null;

  let content;

  if (isLoading) {
    content = <p>Loading post details...</p>;
  } else if (isError) {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else if (post) {
    content = (
      <>
        <DialogTitle className="text-2xl">{post.title}</DialogTitle>
        <DialogDescription className="mt-2">
          **User ID:** {post.userId}
        </DialogDescription>
        <div className="py-4">
          <p className="whitespace-pre-wrap">{post.body}</p>
        </div>
      </>
    );
  } else {
    content = <p>No post selected.</p>;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>{content}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
