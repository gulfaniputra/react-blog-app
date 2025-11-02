import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import type { Post } from '../types';

interface ViewPostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // We pass the actual data the component should render
  post: Post | null;
}

export function ViewPostDialog({
  isOpen,
  onOpenChange,
  post,
}: ViewPostDialogProps) {
  // Only render if we have a post to view (static check)
  if (!post) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{post.title}</DialogTitle>
          <DialogDescription className="mt-2">
            **User ID:** {post.userId}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="whitespace-pre-wrap">{post.body}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
