import { useFormik } from 'formik';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { CreatePostPayload } from '../api/posts';
import { CreatePostSchema } from '../schemas/validationSchemas';
import type { CreatePostFormValues } from '../schemas/validationSchemas';
import { Loader2 } from 'lucide-react';

interface CreatePostDialogProps {
  onPostCreate: (values: CreatePostPayload) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CreatePostForm({
  onPostCreate,
  onCancel,
  isSubmitting,
}: CreatePostDialogProps) {
  const formik = useFormik<CreatePostFormValues>({
    initialValues: { title: '', body: '' },
    validationSchema: CreatePostSchema,
    onSubmit: async (values, { resetForm }) => {
      // Formik's validation ensures data is clean before calling API
      await onPostCreate(values);
      resetForm();
    },
  });

  // Helper function for rendering the validation alert
  const renderError = (field: keyof CreatePostFormValues) =>
    formik.touched[field] && formik.errors[field] ? (
      // The alert UI below the field
      <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
    ) : null;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-4 py-4">
        {/* Title field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="title"
            className="text-right"
          >
            Title
          </Label>
          <div className="col-span-3">
            <Input
              id="title"
              name="title"
              placeholder="Post Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
            />
            {renderError('title')}
          </div>
        </div>

        {/* Description/body field */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label
            htmlFor="body"
            className="text-right pt-2"
          >
            Description
          </Label>
          <div className="col-span-3">
            <Textarea
              id="body"
              name="body"
              placeholder="Post Body Content"
              rows={5}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
            />
            {renderError('body')}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formik.isValid || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Create Post'
          )}
        </Button>
      </div>
    </form>
  );
}
