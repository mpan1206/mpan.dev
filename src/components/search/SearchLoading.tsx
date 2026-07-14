import { Skeleton } from '@/components/ui/skeleton'

export function SearchLoading() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Group header skeleton */}
      <Skeleton className="h-4 w-20 bg-muted/60" />

      {/* Hit items skeletons */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-md border border-border/50 bg-muted/20 p-3"
          >
            <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SearchLoading
