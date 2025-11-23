export default function Hero() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <div className="relative h-40 w-full bg-gradient-to-r from-emerald-900 to-emerald-600">
        <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1600&auto=format&fit=crop" alt="gym" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6">
          <h2 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">PROTEINS & SUPPLEMENTS</h2>
          <p className="text-emerald-50/90 text-xs sm:text-sm mt-1">Explore our daily fitness supplement picks</p>
        </div>
      </div>
    </div>
  )
}