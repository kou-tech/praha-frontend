import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <Skeleton className="h-6 w-32 mx-auto mt-2" />
          </div>

          <div className="text-center">
            <Skeleton className="h-6 w-40 mx-auto" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    </div>
  );
}
