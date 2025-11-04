import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CreatePostForm } from './CreatePostForm';
import type { CreatePostPayload } from '../api/posts';

interface CreatePostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // Prop to handle the final submission with the form data
  onPostCreate: (values: CreatePostPayload) => Promise<void>;
  isSubmitting: boolean;
}

export function CreatePostDialog({
  isOpen,
  onOpenChange,
  onPostCreate,
  isSubmitting,
}: CreatePostDialogProps) {
  // Wrapper function to handle submission and close the dialog
  const handleSubmit = async (values: CreatePostPayload) => {
    await onPostCreate(values);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <CreatePostForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
