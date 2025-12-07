import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article, ArticleCategory } from "../admin/types/wellness-hub";
import { getArticles } from "../admin/api/wellness-hub.api";

const CATEGORIES: ArticleCategory[] = ["Nutrition", "Workouts", "Mental Health", "Lifestyle"];

export default function WellnessHubPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<ArticleCategory | "All">("All");

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCat === "All"
    ? articles
    : articles.filter(a => a.category === activeCat);

  const featured = articles[0]; // Simple featured logic for now

  if (loading) return <div className="min-h-screen pt-24 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO */}
      <div className="relative bg-emerald-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">The Wellness Hub</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Expert advice, nutrition tips, and workout guides to help you live your healthiest life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCat("All")}
            className={`px-6 py-3 rounded-full font-medium transition-all shadow-sm
              ${activeCat === "All" ? "bg-emerald-600 text-white shadow-emerald-200" : "bg-white text-gray-600 hover:bg-gray-100"}`}
          >
            All Posts
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-3 rounded-full font-medium transition-all shadow-sm
                ${activeCat === cat ? "bg-emerald-600 text-white shadow-emerald-200" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED ARTICLE (Only show on 'All') */}
        {activeCat === "All" && featured && (
          <div className="mb-16 bg-white rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2 group cursor-pointer hover:shadow-2xl transition-all duration-300">
            <div className="h-64 md:h-auto overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{featured.category}</span>
                <span className="text-gray-400">{featured.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 text-lg line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  {featured.author[0]}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{featured.author}</p>
                  <p className="text-gray-500">{new Date(featured.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCat === "All" ? filtered.filter(a => a.id !== featured?.id) : filtered).map(article => (
            <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-900">{article.author}</span>
                  <button className="text-emerald-600 font-semibold text-sm hover:underline">Read More &rarr;</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
