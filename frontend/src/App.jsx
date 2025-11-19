import { useState } from 'react'
import './App.css'

import MemeArea from './components/MemeArea'
import LabelList from './components/LabelList'

const initialLabels = [
  { id: 'funny', text: 'Funny' },
  { id: 'sarcastic', text: 'Sarcastic' },
  { id: 'wholesome', text: 'Wholesome' },
  { id: 'political', text: 'Political' },
  { id: 'memeable', text: 'Meme-able' },
]

function App() {
  const [labels] = useState(initialLabels)
  const [assigned, setAssigned] = useState([]) // array of label ids

  function assignLabel(id) {
    setAssigned((s) => (s.includes(id) ? s : [...s, id]))
  }

  function unassignLabel(id) {
    setAssigned((s) => s.filter((x) => x !== id))
  }

  function toggleLabel(id) {
    setAssigned((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Meme Labeler</h1>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <MemeArea
              imageUrl={'spidey.jpg'}
              assigned={assigned}
              labels={labels}
              onDropLabel={assignLabel}
              onRemoveLabel={unassignLabel}
            />
          </div>

          <div className="col-span-5">
            <LabelList
              labels={labels}
              assigned={assigned}
              onDragStart={() => {}}
              onToggle={toggleLabel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
