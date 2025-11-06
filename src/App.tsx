import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { PostDetailPage } from './pages/PostDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  // Provide a default handler for 'Header'
  const handleCreatePostClick = () => {};
  return (
    <Router>
      <Header onCreatePostClick={handleCreatePostClick} />

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
