// src/pages/WellnessHubPage.tsx
import { useState } from "react";

/* ---------- Types ---------- */
type Video = { id: string; title: string; subtitle: string; thumb: string; duration?: string };
type Guide = { id: string; title: string; subtitle: string; icon: string; cta: string; img: string };
type Blog  = { id: string; title: string; meta: string; thumb: string };

/* ---------- Mock Data (swap with API later) ---------- */
const VIDEOS: Video[] = [
  { id: "v1", title: "Full Body Yoga Flow", subtitle: "Strength • Flexibility • Mobility", thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop", duration: "18:24" },
  { id: "v2", title: "HIIT Cardio Blast",   subtitle: "Toning • Fat Burn • Endurance",    thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop", duration: "21:03" },
  { id: "v3", title: "Mobility Morning",    subtitle: "Warm-up • Joint Care • Flow",       thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop", duration: "09:12" },
];

const GUIDES: Guide[] = [
  {
    id: "g1",
    title: "DIET PLANS & GUIDES",
    subtitle: "Calories & macro basics",
    icon: "🥗",
    cta: "Watch Now",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "g2",
    title: "7-Day Detox Reset Meal Plan",
    subtitle: "Dietetics • Gut health",
    icon: "🍵",
    cta: "Watch Now",
    img: "https://images.unsplash.com/photo-1505575972945-280b9f262c0f?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "g3",
    title: "Beginner Guide to Mindful Fasting",
    subtitle: "Protocols • Safety notes",
    icon: "🕊️",
    cta: "Read Now",
    img: "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "g4",
    title: "Protein Timing Cheat Sheet",
    subtitle: "Pre/Post-workout tips",
    icon: "⏱️",
    cta: "Read Now",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop"
  },
];

const BLOGS: Blog[] = [
  { id: "b1", title: "Premium Blended Smoothies 101",      meta: "7 MIN • Reading",    thumb: "https://images.unsplash.com/photo-1553530979-7ee52c8f2d1d?q=80&w=1600&auto=format&fit=crop" },
  { id: "b2", title: "Proper HIIT Basics",                  meta: "6 MIN • Cardio",     thumb: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=1600&auto=format&fit=crop" },
  { id: "b3", title: "High-Protein Training: Faster Gains", meta: "8 MIN • Muscle",     thumb: "https://images.unsplash.com/photo-1518459031867-a89b944bffe1?q=80&w=1600&auto=format&fit=crop" },
  { id: "b4", title: "Fitness-Friendly Easy Meals",         meta: "5 MIN • Nutrition",  thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop" },
  { id: "b5", title: "Morning Mobility Routine",            meta: "4 MIN • Flexibility",thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop" },
  { id: "b6", title: "Hydration Myths Debunked",            meta: "6 MIN • Wellness",   thumb: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop" },
];

/* ---------- Page ---------- */
export default function WellnessHubPage() {
  // simple pager for blogs (client-only for now)
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(BLOGS.length / pageSize));
  const visibleBlogs = BLOGS.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* HERO */}
      <HeroBanner />

      {/* SECTION 1: EXERCISE VIDEOS */}
      <Section title="EXERCISE VIDEOS" className="mt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      </Section>

      {/* SECTION 2: DIET PLANS & GUIDES (full width below videos) */}
      <Section title="DIET PLANS & GUIDES" className="mt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map(g => <GuideTile key={g.id} guide={g} />)}
        </div>
      </Section>

      {/* SECTION 3: WELLNESS BLOG */}
      <Section title="WELLNESS BLOG" className="mt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleBlogs.map(b => <BlogCard key={b.id} post={b} />)}
        </div>

        {/* pager dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2.5 w-2.5 rounded-full border transition ${
                page === i ? "bg-emerald-600 border-emerald-600" : "bg-white border-gray-300 hover:border-emerald-600"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function HeroBanner() {
  return (
    <div className="rounded-2xl overflow-hidden border bg-gray-900/5">
      <div
        className="h-48 sm:h-56 lg:h-64 w-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600&auto=format&fit=crop)"
        }}
      />
      <div className="px-5 py-4 -mt-24 sm:-mt-28 relative">
        <div className="inline-block rounded-xl bg-emerald-700 text-white px-4 py-2 shadow-lg">
          <div className="text-sm font-semibold">FREE WELLNESS HUB</div>
          <div className="text-xs opacity-90 -mt-0.5">Explore our promoted deals</div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className}>
      <h2 className="text-sm font-semibold tracking-wide text-gray-800">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <article className="rounded-2xl border bg-white overflow-hidden">
      <div className="relative">
        <img src={video.thumb} alt={video.title} className="h-44 w-full object-cover" />
        {/* play button */}
        <button className="absolute inset-0 m-auto h-12 w-12 grid place-items-center rounded-full bg-white/90 text-emerald-700 shadow">
          ▶
        </button>
        {video.duration && (
          <span className="absolute bottom-2 right-2 text-[11px] px-2 py-0.5 rounded bg-black/70 text-white">
            {video.duration}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold leading-snug">{video.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{video.subtitle}</p>
        <button className="btn-primary mt-3">Watch Now</button>
      </div>
    </article>
  );
}

function GuideTile({ guide }: { guide: Guide }) {
  return (
    <article className="relative rounded-2xl overflow-hidden border bg-white group">
      {/* background image */}
      <img
        src={guide.img}
        alt={guide.title}
        className="h-44 sm:h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <div className="text-xl leading-none">{guide.icon}</div>
        <h3 className="mt-1 font-semibold leading-snug drop-shadow-sm">{guide.title}</h3>
        <p className="text-xs opacity-90">{guide.subtitle}</p>
        <div className="mt-2">
          <button className="btn-primary !bg-emerald-600 hover:!bg-emerald-700">{guide.cta}</button>
        </div>
      </div>
    </article>
  );
}

function BlogCard({ post }: { post: Blog }) {
  return (
    <article className="rounded-2xl border bg-white overflow-hidden">
      <img src={post.thumb} alt={post.title} className="h-36 w-full object-cover" />
      <div className="p-3">
        <h3 className="font-semibold leading-snug">{post.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{post.meta}</p>
        <button className="btn mt-3">Read Now</button>
      </div>
    </article>
  );
}
