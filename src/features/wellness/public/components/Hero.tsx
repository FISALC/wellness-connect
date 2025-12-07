import { Link } from "react-router-dom";
import { HeroConfig } from "../../admin/types/storefront";

export default function Hero({ config }: { config?: HeroConfig }) {
  if (!config) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[500px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={config.imageUrl}
          alt={config.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-2xl text-white space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
          New Collection 2025
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          {config.title}
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-lg">
          {config.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            to={config.ctaLink}
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
          >
            {config.ctaText}
          </Link>
          {config.secondaryCtaText && config.secondaryCtaLink && (
            <Link
              to={config.secondaryCtaLink}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold backdrop-blur-md transition-all"
            >
              {config.secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}