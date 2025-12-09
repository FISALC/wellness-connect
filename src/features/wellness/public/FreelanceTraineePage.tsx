import { useState } from "react";
import { Send, CheckCircle, Clock, Wallet, UserCheck, Dumbbell, Star, ArrowRight } from "lucide-react";

export default function FreelanceTraineePage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => setSubmitted(true), 1000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Sent!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for your interest. We will connect you with a dedicated freelance gym trainee shortly.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

                <div className="relative container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-sm font-medium mb-6 animate-fade-in">
                        <span className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            Premium Fitness Training
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
                        Find Your Dedicated <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                            Freelance Trainee
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-100">
                        Experience the ultimate convenience and personalized coaching.
                        Affordable, dedicated, and ready to transform your fitness journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                        <a href="#contact-form" className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
                            Get Started Now <ArrowRight className="w-5 h-5" />
                        </a>
                        <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 text-lg">We connect you with the best freelance professionals for a fraction of the cost.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <Clock className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Maximum Convenience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Train on your schedule, at your location. Our freelancers adapt to your busy lifestyle seamlessly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <Wallet className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cost-Effective</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get premium personal training without the expensive gym overheads. Quality service for less.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <UserCheck className="w-7 h-7 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated to You</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Enjoy the full attention of a dedicated trainee focused solely on your progress and goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Split Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                                <img
                                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                                    alt="Fitness Trainer"
                                    className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/40">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-600 p-2 rounded-full">
                                            <Dumbbell className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Professional Coaching</p>
                                            <p className="text-xs text-gray-500">Certified Freelancers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2 block">Why It Works</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Unlock Your Potential with Personalized Attention</h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Unlike crowded gym classes, a freelance trainee focuses entirely on your form, progress, and motivation. We bridge the gap between you and expert fitness professionals.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Customized workout plans tailored to your body",
                                    "Flexible timing that works around your life",
                                    "Direct accountability and support",
                                    "No hidden gym membership fees"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-form" className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-5/12 bg-indigo-900 p-12 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Connect Today</h3>
                                <p className="text-indigo-200 mb-8">Fill out the form and we'll match you with the perfect freelance trainee for your goals.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-indigo-800 rounded-lg">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Top Rated</p>
                                        <p className="text-sm text-indigo-300">Verified Professionals</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-indigo-800 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Guaranteed Match</p>
                                        <p className="text-sm text-indigo-300">Optimization for your needs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-7/12 p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                                    <select name="goal" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-white">
                                        <option>Weight Loss</option>
                                        <option>Muscle Gain</option>
                                        <option>Cardio Training</option>
                                        <option>Yoga & Flexibility</option>
                                        <option>General Fitness</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition h-32 resize-none"
                                        placeholder="Tell us a bit more about what you're looking for..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition transform flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" /> Send Request
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
