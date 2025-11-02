import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface CreatePostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostDialog({
  isOpen,
  onOpenChange,
}: CreatePostDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="title"
              className="text-right"
            >
              Title
            </Label>
            <Input
              id="title"
              placeholder="Post Title"
              className="col-span-3"
              value="Static Title"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="body"
              className="text-right pt-2"
            >
              Description
            </Label>
            <Textarea
              id="body"
              placeholder="Post Body Content"
              className="col-span-3"
              rows={5}
              value="Static Body Content"
              readOnly
            />
          </div>
        </div>
        <DialogFooter>
          {/* These buttons are static placeholders for now */}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled
          >
            Create Post (Static)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
