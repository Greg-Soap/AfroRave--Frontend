export function LoadingFallback() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
      <div className='relative size-12'>
        <div className='absolute inset-0 rounded-full border-4 border-secondary/20' />
        <div className='absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <img
            src='/assets/resell/lighting.svg'
            alt='Loading'
            className='size-8 animate-spin'
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>
      <p className='font-input-mono text-secondary/80 animate-pulse'>Loading...</p>
    </div>
  )
}
