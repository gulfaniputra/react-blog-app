# react-blog-app

## Table Of Contents

- [About](#about)
- [Description](#description)
- [Stack](#stack)
- [Plan](#plan)
- [Features](#features)
- [Demo](#demo)

## About

A simple React blog.

## Description

This project is a clean, scalable application demonstrating modern front-end development patterns using React, TypeScript, and a best-in-class supporting ecosystem. It focuses on integrating an external API, managing state, and handling complex forms.

### Key Exploration Topics

- Server state vs. UI state
- One-way data flow
- Formik for control

## Stack

- React
- Vite
- TypeScript
- pnpm
- React Query
- Formik
- shadcn
- JSONPlaceholder
- React Router

## Plan

### Task #3:

- Step #0 (Mockups & JSON API):
  - Mockups: [Homepage](https://gist.github.com/user-attachments/assets/11832f53-e0d0-42d3-87e8-d995a2533362), ['Create Post' button](https://gist.github.com/user-attachments/assets/8f69d9ab-ea45-49e2-92e3-7f2f253053c1), & [Post card dialog](https://gist.github.com/user-attachments/assets/2c175678-b157-4f2e-8620-c2a1bbd41f74)
  - JSON API: https://jsonplaceholder.typicode.com/
- Step #1 (Break the UI into a component hierarchy):
  - Homepage:
    - Header
    - PostList:
      - PostCard
  - 'Create Post' button dialog:
    - CreatePostDialog
      - CreatePostForm
        - FormField:
          - Input
          - Textarea
        - FormActions
  - Post card view dialog:
    - ViewPostDialog:
      - PostDetails:
        - PostTitle
        - PostBody
        - CloseButton
- Step #2 (Build a static version in React):
  - Set up data structure & mock data (`types.ts`).
  - Create component for a single post (`PostCard.tsx`).
  - Create component for top navigation bar (`Header.tsx`).
  - Create components for placeholder dialogs (`CreatePostDialog.tsx` & `ViewPostDialog.tsx`).
  - Create component to render the grid of posts (`PostList.tsx`).
  - Create a page to put everything together (`HomePage.tsx`).
  - Update the entry point’s configuration (`App.tsx`).
- Step #3 (Set up API state with React Query):
  - Initialize `QueryClient`.
  - Create a utility file for API fetching logic.
  - Integrate `useQuery`to fetch all posts.
  - Integrate `useQuery` to fetch a single post.
- Step #4 (Set up form state with Formik):
  - Create component to encapsulate Formik logic (`CreatePostForm.tsx`).
  - Update `CreatePostDialog.tsx` to use the Formik form.
  - Create a custom hook to place the mutation logic (`useCreatePost.ts`).
  - Integrate mutation into `HomePage.tsx`.
- Step #5 (Check if JSONPlaceholder is set up properly as the back-end):
  - `src/api/posts.ts`:
    - The `createPost` function handles the ‘create post’ requirement, including setting the `Content-Type: application/json` header, as required by JSONPlaceholder for POST requests.
    - The `fetchPosts` function handles the ‘homepage list’ requirement, which correctly retrieves the list of posts.
    - The `fetchPostById` function handles the ‘view specific post’ requirement, which correctly retrieves the details for the specific ID.

### Task #4:

- Step #1 (Implement post detailed view with data and comments):
  - [Mockup](https://gist.github.com/user-attachments/assets/943c2267-48c2-4953-81bf-9a65dc2df80f)
  - Components:
    - `PostDetailPage`
    - `PostDetailCard`
    - `PostContent`
    - `CommentsSection`
    - `CommentItem`
  - API mappings:
    - `PostDetailCard` > `GET https://jsonplaceholder.typicode.com/posts/:postId`
    - `CommentsSection` > `GET https://jsonplaceholder.typicode.com/posts/:postId/comments`
  - Set up React Router.
  - Create a function to fetch comments (`posts.ts`).
  - Create a component to list comments (`CommentItem.tsx`).
  - Create a page to fetch post and its comments (`PostDetailPage.tsx`).
  - Update `App.tsx` to use React Router.
  - Add React Router `Link` component to navigate to the detail page (`PostCard.tsx`).
- Step #2 (Add shadcn skeleton component to posts and comments's loading state):
  - Create a component to define shadcn skeleton (`PostDetailSkeleton.tsx`).
  - Update the page logic to conditionally render the skeletons (`PostDetailPage.tsx`).
- Step #3 (Add a text box to create comment with loading indicator and shadcn toast component):
  - [Mockup](https://gist.github.com/user-attachments/assets/237f44a8-600b-4f7a-a247-b393eae3319a)
  - Components:
    - `PostDetailPage`
    - `CommentsSection`
    - `CreateCommentSection`
      - `CreateCommentForm`
        - `FormField` (Name)
        - `FormField` (Email)
        - `FormField` (Body)
        - `SubmitButton`
  - API mappings:
    - `CommentsSection` > `POST https://jsonplaceholder.typicode.com/posts/:postId/comments`
    - `CreateCommentForm` > `POST https://jsonplaceholder.typicode.com/posts/:postId/comments`
  - Define `createComment` API function (`posts.ts`).
  - Create a hook to handle comment submission (`useCreateComment.ts`).
  - Create Formik component with basic validation (`CreateCommentForm.tsx`).
  - Integrate the form and mutation hook into the post detail page (`PostDetailPage.tsx`).
- `// In progress...`

## Features

- **Homepage**: Fetches and displays a list of all posts using the `GET /posts` API endpoint. Each post is rendered as an interactive **Card** component.
- **Create New Post**: A dedicated button in the header triggers a **Dialog** (modal). The form uses Formik to handle input for the title and description, submitting the data via the `POST /posts` endpoint.
- **View Post Details**: Clicking on any post card opens a **Dialog** that fetches and displays the full details of that specific post using the `GET /posts/:id` endpoint.

## Demo

https://react-blog-app-task3.vercel.app/
