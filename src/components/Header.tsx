import { Button } from './ui/button';

interface HeaderProps {
  onCreatePostClick: () => void;
}

export function Header({ onCreatePostClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-2xl font-bold">React Blog App</h1>
      <Button
        variant="default"
        onClick={onCreatePostClick}
        className="cursor-pointer"
      >
        Create Post
      </Button>
    </header>
  );
}
