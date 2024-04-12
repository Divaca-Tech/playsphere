import React from 'react'

export default function events() {
  return (
    // pageLayout
    <div className='grid grid-rows-[auto] grid-cols-[2fr_1fr] min-h-[40vh] h-full'>
      {/* mainContent */}
      <section className='px-[1em] py-[0]'>
      Events
      </section>

      <aside className=''>
        {/* space */}
        <section className="bg-[green] h-full px-[1em] py-[0]">
        aside
        </section>
      </aside>
    </div>
  )
}
