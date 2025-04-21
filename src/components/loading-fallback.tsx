export function LoadingFallback() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 min-h-[200px]'>
      <div className='relative size-12'>
        <div className='absolute inset-0 rounded-full border-4 border-secondary/20' />
        <div className='absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin' />
      </div>
      <p className='font-input-mono text-secondary/80 animate-pulse'>Loading...</p>
    </div>
  )
}
