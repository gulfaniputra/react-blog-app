import { Header } from '../components/Header';
import { PostList } from '../components/PostList';
import { CreatePostDialog } from '../components/CreatePostDialog';
import { ViewPostDialog } from '../components/ViewPostDialog';
import { MOCK_POSTS } from '../types';

export function HomePage() {
  // Placeholder functions for props in the static version
  const handleCreateClick = () => alert('Create button clicked (Static)');
  const handlePostSelect = (postId: number) =>
    alert(`Post ID ${postId} selected (Static)`);

  // Static control for dialog visibility
  const isCreateDialogOpen = false;
  const isViewDialogOpen = false;
  const selectedPost = MOCK_POSTS[0] || null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header Component */}
      <Header onCreatePostClick={handleCreateClick} />

      {/* 2. List of Posts Component */}
      <main>
        <PostList
          posts={MOCK_POSTS}
          onPostSelect={handlePostSelect}
        />
      </main>

      {/* 3. Dialog Components*/}
      <CreatePostDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={() => {}}
      />

      <ViewPostDialog
        isOpen={isViewDialogOpen}
        onOpenChange={() => {}}
        post={selectedPost}
      />
    </div>
  );
}
