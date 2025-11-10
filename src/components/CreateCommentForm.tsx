import { useFormik } from 'formik';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { CreateCommentPayload } from '../api/posts';
import { Loader2 } from 'lucide-react';
import { CreateCommentSchema } from '../schemas/validationSchemas';
import type { CreateCommentFormValues } from '../schemas/validationSchemas';

interface CreateCommentFormProps {
  postId: number;
  onSubmit: (values: CreateCommentPayload) => Promise<void>;
  isSubmitting: boolean;
}

export function CreateCommentForm({
  onSubmit,
  isSubmitting,
}: CreateCommentFormProps) {
  const formik = useFormik<CreateCommentFormValues>({
    initialValues: { name: '', email: '', body: '' },
    validationSchema: CreateCommentSchema,

    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  // Helper function for rendering the validation alert
  const renderError = (field: keyof CreateCommentFormValues) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
    ) : null;

  return (
    <Card className="p-6 bg-gray-50 border-none shadow-none">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
      >
        {/* Name field */}
        <div className="flex-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
          />
          {renderError('name')}
        </div>

        {/* Email field */}
        <div className="flex-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
          />
          {renderError('email')}
        </div>

        {/* Comment body */}
        <div>
          <Label htmlFor="body">Comment</Label>
          <Textarea
            id="body"
            name="body"
            placeholder="Write your comment here..."
            rows={4}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
          />
          {renderError('body')}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={!formik.isValid || isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Posting Comment...' : 'Post Comment'}
        </Button>
      </form>
    </Card>
  );
}
