import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function PostDetailSkeleton() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Skeleton for main title */}
      <Skeleton className="h-10 w-3/4 mb-8" />

      {/* Skeleton for post card */}
      <Card className="mb-12 shadow-lg">
        <CardHeader>
          {/* Skeleton for card title */}
          <CardTitle>
            <Skeleton className="h-7 w-1/2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Skeletons for body paragraphs */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          {/* Skeleton for small footer text */}
          <Skeleton className="h-3 w-1/4 mt-4" />
        </CardContent>
      </Card>

      {/* Skeleton for comments header */}
      <Skeleton className="h-8 w-1/3 mb-6" />
    </div>
  );
}

// Skeleton for a single comment item
export function CommentItemSkeleton() {
  return (
    <div className="border-l-4 border-gray-100 p-4 space-y-2 rounded-md bg-gray-50">
      {/* Skeleton for name & email */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/5" />
      </div>
      {/* Skeleton for body  */}
      <div className="space-y-1 pt-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
