import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { PostDetailPage } from './pages/PostDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CreatePostDialog } from './components/CreatePostDialog';
import { useCreatePost } from './hooks/useCreatePost';
import type { CreatePostPayload } from './api/posts';

export default function App() {
  // Global state for create post dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const createPostMutation = useCreatePost();

  // Handler for opening dialog from header
  const handleCreatePostClick = () => setIsCreateDialogOpen(true);

  // Handler for submitting post
  const handleCreatePostSubmit = async (values: CreatePostPayload) => {
    try {
      await createPostMutation.mutateAsync(values);
      setIsCreateDialogOpen(false);
    } catch {
      // An empty 'catch' block
    }
  };

  return (
    <Router>
      <Toaster />
      <Header onCreatePostClick={handleCreatePostClick} />
      <CreatePostDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPostCreate={handleCreatePostSubmit}
        isSubmitting={createPostMutation.isPending}
      />
      <Routes>
        {/* Route for the homepage */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Route for the post detail page */}
        <Route
          path="/posts/:postId"
          element={<PostDetailPage />}
        />

        {/* Add a 404 handler */}
        <Route
          path="*"
          element={<div className="p-8 text-center">404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}
