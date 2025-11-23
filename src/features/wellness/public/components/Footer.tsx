export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="border rounded-2xl p-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 grid place-items-center text-white font-bold">W</div>
          <div className="leading-tight"><div className="font-bold text-sm">WELLNESS</div><div className="text-[10px] text-gray-500">CONNECT</div></div>
        </div>
        <div className="text-xs text-gray-500">LOCATIONS: UAE | QATAR | INDIA</div>
      </div>
    </footer>
  )
}