import type { Post } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// GET all posts
export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

// GET a single post by ID
export async function fetchPostById(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with ID: ${id}`);
  }
  return (await response.json()) as Post;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId?: number;
}

// POST a new post
export async function createPost(newPost: CreatePostPayload): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newPost, userId: 1 }),
  });

  if (!response.ok) {
    throw new Error('Failed to create new post');
  }

  return (await response.json()) as Post;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// GET comments for a specific post
export async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ID: ${postId}`);
  }
  return response.json();
}
