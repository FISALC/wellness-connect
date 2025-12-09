import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, User, Zap } from "lucide-react";

/**
 * NEW HOME DESIGN - LIGHTER & CLEANER
 * Focus: Freelance Trainers (1st), Proteins (2nd), T-Shirts (3rd).
 * Style: Premium, Attractive, "Walkthrough" feel.
 * 
 * Addressed User Feedback: "Need to change its feel, made it less dark and big"
 */

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* HERO / WELCOME SECTION - LIGHTER & CLEANER */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-fade-in-up order-2 lg:order-1 pt-12 lg:pt-0">
            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-6">
              WELLNESS CONNECT
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Full Potential</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              The premium ecosystem for freelance personal training, elite supplements, and gym-ready aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/freelance-trainee" className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full font-bold text-lg transition transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                Find a Trainer <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/categories" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 hover:border-gray-400 rounded-full font-bold text-lg transition shadow-sm hover:shadow-md flex items-center justify-center">
                Shop Collection
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 h-[400px] lg:h-auto flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] lg:aspect-auto lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-700 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                alt="Fitness Lifestyle"
              />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="font-bold text-xl">Train with the Best</p>
                <p className="text-white/80 text-sm">Join the community today</p>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 -left-10 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>


      {/* 1. FREELANCE TRAINEES SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative z-10">
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Personalized Coaching</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Expert Freelance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Personal Trainers</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Connect directly with elite freelance coaches who understand your goals.
                No middleman, just you and personalized guidance to transform your physique.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Custom plans tailored to your lifestyle",
                  "Direct communication & accountability",
                  "More affordable than commercial gyms",
                  "Train anywhere, anytime"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-1.5 rounded-full">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/freelance-trainee" className="inline-flex items-center gap-2 text-indigo-600 font-bold border-b-2 border-indigo-200 hover:border-indigo-600 pb-1 transition-all text-lg group">
                Meet Our Trainers <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition" />
              </Link>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                  alt="Trainer 1"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8 hover:translate-y-6 transition duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop"
                  alt="Trainer 2"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover hover:-translate-y-2 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. PREMIUM PROTEINS SECTION */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-orange-100 rounded-full blur-3xl -z-10 opacity-60" />
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop"
                  alt="Protein Supplements"
                  className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
                />
                <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <span className="font-bold text-gray-900">Top Rated Purity</span>
                </div>
                <p className="text-sm text-gray-500">Lab-tested supplements for maximum absorption.</p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">Fuel Your Body</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                High-Performance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Proteins & Supplements</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Don't let your hard work go to waste. Fuel your recovery with our premium selection of whey, plant-based proteins, and essential vitamins designed for peak performance.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Whey Isolate</h4>
                  <p className="text-sm text-gray-500">Fast absorption for post-workout recovery.</p>
                </div>
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Mass Gainers</h4>
                  <p className="text-sm text-gray-500">Calorie-dense formulas for size and strength.</p>
                </div>
              </div>

              <Link to="/categories?tab=supplements" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition shadow-lg inline-flex items-center gap-2">
                Shop Supplements <Zap className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 3. ACTIVEWEAR & T-SHIRTS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="text-rose-600 font-bold tracking-wider uppercase text-sm mb-4 block">Look Good, Feel Good</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Activewear</span> Collection
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Designed for movement and engineered for style. Check out our latest drops of oversized tees, compression gear, and gym essentials.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <Link to="/categories?tab=active" className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=987&auto=format&fit=crop"
                  alt="Black T-Shirt"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition">View Details</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition">Oversized Pump Tee</h3>
              <p className="text-gray-500 font-medium">$35.00</p>
            </Link>

            {/* Item 2 */}
            <Link to="/categories?tab=active" className="group block mt-8 md:mt-0">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1760&auto=format&fit=crop"
                  alt="White T-Shirt"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition">View Details</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition">Performance Tank</h3>
              <p className="text-gray-500 font-medium">$28.00</p>
            </Link>

            {/* Item 3 */}
            <Link to="/categories?tab=active" className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=927&auto=format&fit=crop"
                  alt="Grey Hoodie"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition">View Details</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition">Essential Hoodie</h3>
              <p className="text-gray-500 font-medium">$55.00</p>
            </Link>
          </div>

          <div className="mt-12">
            <Link to="/categories?tab=active" className="text-rose-600 font-bold border-b-2 border-rose-100 hover:border-rose-600 pb-1 hover:text-rose-700 transition text-lg">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FOOTER SLIVER */}
      <section className="py-20 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">Join the Wellness Connect community and start your journey today.</p>
          <Link to="/freelance-trainee" className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-block">
            Find Your Trainer Now
          </Link>
        </div>
      </section>

    </div>
  );
}
