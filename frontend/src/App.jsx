import { useEffect, useState } from 'react'
import './App.css'

import MemeArea from './components/MemeArea'
import LabelList from './components/LabelList'

const LABEL_TEXTS = [
  'sarcastic', 'wholesome', 'dark humor', 'relatable', 'absurd',
  'ironic', 'political', 'silly', 'satire', 'reaction', 'mood',
  'throwback', 'meta', 'spoiler', 'spoof', 'parody', 'meme format',
  'captioned', 'image-only', 'viral', 'subtle', 'edgy', 'cute',
  'animal', 'facepalm', 'fail', 'win', 'unexpected', 'nostalgia',
  'punchline', 'setup', 'commentary', 'whisper', 'rant', 'caption',
  'two-panel', 'three-panel', 'remix', 'mashup', 'reaction-emoji'
]

function sample(arr, n) {
  const copy = arr.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

const SPECIAL_NONE = 'special:none'
const SPECIAL_DONT_UNDERSTAND = 'special:dont-understand'

const IMAGES = ['/spidey.jpg', '/meme .jpeg']

const POOL = LABEL_TEXTS.map((t, i) => ({ id: `l${i}`, text: t }))

export default function App() {
  const [labels, setLabels] = useState([])
  const [assigned, setAssigned] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    // initialize a fresh set of labels
    setLabels(sample(POOL, 6))
  }, [])

  function clearSpecials(arr) {
    return arr.filter((id) => id !== SPECIAL_NONE && id !== SPECIAL_DONT_UNDERSTAND)
  }

  function handleDropLabel(id) {
    if (!id) return
    if (id === SPECIAL_NONE || id === SPECIAL_DONT_UNDERSTAND) {
      // special options are exclusive
      setAssigned([id])
      return
    }
    setAssigned((s) => {
      if (s.includes(id)) return s
      const withoutSpecials = clearSpecials(s)
      return [...withoutSpecials, id]
    })
  }

  function handleToggleLabel(id) {
    if (assigned.includes(id)) {
      setAssigned((s) => s.filter((x) => x !== id))
    } else {
      const withoutSpecials = clearSpecials(assigned)
      setAssigned([...withoutSpecials, id])
    }
  }

  function handleToggleSpecial(id) {
    if (assigned.includes(id)) {
      setAssigned((s) => s.filter((x) => x !== id))
    } else {
      setAssigned([id])
    }
  }

  function handleRemoveLabel(id) {
    setAssigned((s) => s.filter((x) => x !== id))
  }

  function applyAndNext() {
    const currentImage = IMAGES[imageIndex]
    // record submission
    const payload = {
      image: currentImage,
      labels: assigned.slice(),
      timestamp: Date.now(),
    }
  setSubmissions((s) => [payload, ...s])
    console.log('Submitted:', payload)

    // move to next image and refresh labels
    setImageIndex((i) => (i + 1) % IMAGES.length)
  setLabels(sample(POOL, 6))
    setAssigned([])
  }

  const specialNoneActive = assigned.includes(SPECIAL_NONE)
  const specialDontUnderstandActive = assigned.includes(SPECIAL_DONT_UNDERSTAND)

  const imageUrl = IMAGES[imageIndex]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-semibold">Meme Labeler</h1>
          <div className="text-sm text-gray-500">Saved: {submissions.length}</div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <MemeArea
              imageUrl={imageUrl}
              assigned={assigned}
              labels={labels}
              onDropLabel={handleDropLabel}
              onRemoveLabel={handleRemoveLabel}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={applyAndNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
              >
                Apply & Next
              </button>

              <button
                onClick={() => setAssigned([])}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="col-span-5">
            <div className="rounded-lg shadow-sm bg-white dark:bg-gray-800 p-4 h-full flex flex-col">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">Available labels</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Drag a label onto the image or click to toggle apply.</p>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleToggleSpecial(SPECIAL_NONE)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${specialNoneActive ? 'bg-red-600 text-white ring-2 ring-offset-1 ring-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:opacity-90'}`}
                >
                  No applicable labels
                </button>

                <button
                  onClick={() => handleToggleSpecial(SPECIAL_DONT_UNDERSTAND)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${specialDontUnderstandActive ? 'bg-yellow-600 text-white ring-2 ring-offset-1 ring-yellow-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:opacity-90'}`}
                >
                  I don't understand this meme
                </button>
              </div>

              <div className="overflow-auto">
                <LabelList labels={labels} assigned={assigned} onToggle={handleToggleLabel} />
              </div>

              <div className="mt-4 text-xs text-gray-400">Select a special option to mark exclusivity.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
