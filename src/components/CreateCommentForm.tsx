import { useFormik } from 'formik';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { CreateCommentPayload } from '../api/posts';
import { Loader2 } from 'lucide-react';

interface CreateCommentFormProps {
  postId: number;
  onSubmit: (values: CreateCommentPayload) => Promise<void>;
  isSubmitting: boolean;
}

export function CreateCommentForm({
  onSubmit,
  isSubmitting,
}: CreateCommentFormProps) {
  const formik = useFormik<CreateCommentPayload>({
    initialValues: {
      name: '',
      email: '',
      body: '',
    },

    // Simple validation
    // This will be replaced with Yup in the next step
    validate: values => {
      const errors: Partial<CreateCommentPayload> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.body) errors.body = 'Comment body is required';
      return errors;
    },

    // Submission handler
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  // Helper function to render validation errors
  const renderError = (field: keyof CreateCommentPayload) =>
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
        {/* Name & email fields */}
        <div className="flex gap-4">
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

        {/* Submit Button with loading indicator */}
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
