import * as Yup from 'yup';

// Create post schema
export const CreatePostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters.')
    .max(100, 'Title cannot exceed 100 characters.')
    .required('Post Title is required.'),

  body: Yup.string()
    .min(20, 'Description must be at least 20 characters.')
    .required('Post Description is required.'),
});

// Create comment schema
export const CreateCommentSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .required('Name is required.'),

  email: Yup.string()
    .email('Invalid email format (e.g., user@example.com).')
    .required('Email is required.'),

  body: Yup.string()
    .min(5, 'Comment must be at least 5 characters.')
    .max(500, 'Comment is too long (max 500 characters).')
    .required('Comment body is required.'),
});

export type CreatePostFormValues = Yup.InferType<typeof CreatePostSchema>;
export type CreateCommentFormValues = Yup.InferType<typeof CreateCommentSchema>;
