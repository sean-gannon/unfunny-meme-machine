import React from 'react'

export default function LabelList({ labels = [], assigned = [], onToggle }) {
  function handleDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="rounded-lg shadow-sm bg-white dark:bg-gray-800 p-4 h-full">
      <h2 className="text-lg font-medium mb-4">Labels</h2>

      <div className="flex flex-col gap-3">
        {labels.map((label) => {
          const active = assigned.includes(label.id)
          return (
            <div
              key={label.id}
              draggable
              onDragStart={(e) => handleDragStart(e, label.id)}
              className={`flex items-center justify-between p-3 rounded-md border ${active ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700'} cursor-grab`}
            >
              <div>
                <div className="text-sm font-medium">{label.text}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">drag or click to apply</div>
              </div>

              <div>
                <button
                  onClick={() => onToggle && onToggle(label.id)}
                  className={`px-3 py-1 rounded-full text-sm ${active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                >
                  {active ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
