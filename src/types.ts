// Define the structure of a Post object fetched from the API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Mock data to render the static UI
export const MOCK_POSTS: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Thinking in React and TypeScript',
    body: 'Understanding the separation of concerns between state, props, and side effects is crucial for scalable applications. This body contains a detailed description.',
  },
  {
    userId: 1,
    id: 2,
    title: 'Mastering React Query for Server State',
    body: 'React Query simplifies data fetching, caching, and synchronization. It turns complex data logic into simple hooks.',
  },
  {
    userId: 2,
    id: 3,
    title: 'Formik and Zod: The Type-Safe Form Duo',
    body: 'Using Formik for form management and Zod for validation ensures that our form data is always correct and well-typed.',
  },
];
