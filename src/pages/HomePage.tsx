import { useState } from 'react';
import { Header } from '../components/Header';
import { PostList } from '../components/PostList';
import { CreatePostDialog } from '../components/CreatePostDialog';
import { ViewPostDialog } from '../components/ViewPostDialog';
import { useCreatePost } from '../hooks/useCreatePost';
import type { CreatePostPayload } from '../api/posts';

export function HomePage() {
  // Minimal UI state identification for interactivity
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Use the custom mutation hook
  const createPostMutation = useCreatePost();

  // Handlers for dialogs and data flow
  const handleCreatePostSubmit = async (values: CreatePostPayload) => {
    try {
      // Call the mutate function from React Query
      await createPostMutation.mutateAsync(values);
      setIsCreateDialogOpen(false);
    } catch (error) {
      // Error handling is managed inside useCreatePost hook
    }
  };

  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleViewDialogClose = (open: boolean) => {
    if (!open) {
      setSelectedPostId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header component */}
      <Header onCreatePostClick={() => setIsCreateDialogOpen(true)} />

      {/* List of Posts component*/}
      <main>
        <PostList
          onPostSelect={handlePostSelect} // Pass the handler to open the view dialog
        />
      </main>

      {/* Create Post dialog */}
      <CreatePostDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPostCreate={handleCreatePostSubmit}
        isSubmitting={createPostMutation.isPending}
      />

      {/* View Post dialog */}
      <ViewPostDialog
        isOpen={!!selectedPostId}
        onOpenChange={handleViewDialogClose}
        selectedPostId={selectedPostId}
      />
    </div>
  );
}
