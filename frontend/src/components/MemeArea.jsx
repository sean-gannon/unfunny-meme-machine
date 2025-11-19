import React from 'react'

export default function MemeArea({ imageUrl, labels = [], assigned = [], onDropLabel, onRemoveLabel }) {
  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e) {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id && onDropLabel) onDropLabel(id)
  }

  return (
    <div
      className="rounded-lg shadow-sm bg-white dark:bg-gray-800 p-4 h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="relative overflow-hidden rounded-md">
        <img src={imageUrl} alt="meme" className="w-full h-auto object-cover rounded-md" />

        <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
          {assigned.map((id) => {
            const label = labels.find((l) => l.id === id)
            if (!label) return null
            return (
              <button
                key={id}
                onClick={() => onRemoveLabel && onRemoveLabel(id)}
                className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow-sm hover:opacity-90"
              >
                {label.text} ✕
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Drop labels onto the image or click labels on the right to toggle them.
      </div>
    </div>
  )
}
