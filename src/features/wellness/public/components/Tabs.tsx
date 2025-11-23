import { TABS, Tab } from '../../../../data'

export default function Tabs({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="flex gap-2 p-1 bg-emerald-50 rounded-xl w-full">
      {TABS.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={`px-4 py-2 text-sm rounded-lg transition ${value===t? 'bg-white shadow text-emerald-700 font-semibold':'text-gray-700 hover:bg-white'}`}>{t}</button>
      ))}
    </div>
  )
}