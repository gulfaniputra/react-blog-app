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

## Plan

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
- Step #3 (Find the minimal but complete representation of UI state):
  - `// In progress...`

## Features

- **Homepage**: Fetches and displays a list of all posts using the `GET /posts` API endpoint. Each post is rendered as an interactive **Card** component.
- **Create New Post**: A dedicated button in the header triggers a **Dialog** (modal). The form uses Formik to handle input for the title and description, submitting the data via the `POST /posts` endpoint.
- **View Post Details**: Clicking on any post card opens a **Dialog** that fetches and displays the full details of that specific post using the `GET /posts/:id` endpoint.

## Demo

`// In progress...`
