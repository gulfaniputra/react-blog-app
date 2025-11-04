import { useFormik } from 'formik';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { CreatePostPayload } from '../api/posts';

interface CreatePostFormProps {
  // A prop to handle the form submission
  onSubmit: (values: CreatePostPayload) => Promise<void>;
  // A prop to handle closing the dialog
  onCancel: () => void;
  // A prop to show loading state
  isSubmitting: boolean;
}

export function CreatePostForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: CreatePostFormProps) {
  // Initialize Formik hook
  const formik = useFormik<CreatePostPayload>({
    initialValues: {
      title: '',
      body: '',
    },

    onSubmit: async values => {
      await onSubmit(values);
      formik.resetForm();
    },

    // Simple manual validation
    // Replace with Zod/Yup later for scalability
    validate: values => {
      const errors: Partial<CreatePostPayload> = {};
      if (!values.title) {
        errors.title = 'Title is required';
      } else if (values.title.length < 5) {
        errors.title = 'Title must be at least 5 characters';
      }
      if (!values.body) {
        errors.body = 'Description is required';
      }
      return errors;
    },
  });

  return (
    // Attach 'formik.handleSubmit' to the form
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
              placeholder="Enter post title"
              // Bind value and change handler
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
            />
            {/* Show validation error */}
            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            ) : null}
          </div>
        </div>

        {/* Body field */}
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
              placeholder="Enter post description/body"
              rows={5}
              // Bind value & change handler
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
            />
            {/* Show validation error */}
            {formik.touched.body && formik.errors.body ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.body}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Form actions*/}
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        {/* Submit button */}
        <Button
          type="submit"
          disabled={!formik.isValid || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}
