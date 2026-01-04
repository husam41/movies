import { useState } from 'react'

function FilterMenu({ filter, setFilter }){
  const [open, setOpen] = useState(false)

  return (
    <div className="text-right">
      <button
        aria-label="Open filters"
        className="flex items-center gap-2 text-white px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg"
        onClick={() => setOpen((s) => !s)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="hidden sm:inline">Filter</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 p-3 w-44">
          <div className="flex flex-col gap-2">
            <button onClick={() => { setFilter('popular'); setOpen(false); }} className={`px-3 py-2 rounded text-left ${filter === 'popular' ? 'bg-gray-700 text-white' : 'text-white'}`}>Most Viewed</button>
            <button onClick={() => { setFilter('top'); setOpen(false); }} className={`px-3 py-2 rounded text-left ${filter === 'top' ? 'bg-gray-700 text-white' : 'text-white'}`}>Top Rated</button>
            <button onClick={() => { setFilter('recent'); setOpen(false); }} className={`px-3 py-2 rounded text-left ${filter === 'recent' ? 'bg-gray-700 text-white' : 'text-white'}`}>Most Recent</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterMenu
