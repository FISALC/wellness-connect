import { useState } from "react";
import {
  Phone,
  Mail,
  User,
  Send,
  Utensils,
  Dumbbell,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api"; // ⬅️ adjust path if needed

type FeedbackState = { type: "success" | "error"; msg: string } | null;

export default function WellnessHub() {
  // 1. Shared Identity State
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    age: "", // kept as string for input
  });

  // 2. Service Specific State
  const [trainerMessage, setTrainerMessage] = useState("");
  const [diet, setDiet] = useState({ weight: "", height: "", target: "" });

  const [loading, setLoading] = useState({ trainer: false, diet: false });
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  // 3. Independent Validation Logic
  const isContactValid =
    contact.name.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.age.trim();

  const weightNum = Number(diet.weight);
  const heightNum = Number(diet.height);
  const targetNum = Number(diet.target);

  // Trainer button only needs Contact + Message
  const canTrainerSubmit =
    Boolean(isContactValid && trainerMessage.trim().length > 0) &&
    !loading.trainer;

  // Diet button only needs Contact + valid numbers
  const canDietSubmit =
    Boolean(
      isContactValid &&
        weightNum > 0 &&
        heightNum > 0 &&
        targetNum > 0
    ) && !loading.diet;

  // ----- Handlers -----
  const handleTrainerSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!canTrainerSubmit) return;

    setLoading((prev) => ({ ...prev, trainer: true }));
    setFeedback(null);

    try {
      await api.post("/api/v1/public/wellness/leads/trainer", {
        customerName: contact.name,
        email: contact.email,
        phone: contact.phone,
        age: contact.age,
        message: trainerMessage,
      });

      setFeedback({
        type: "success",
        msg: "Request sent! A trainer will contact you shortly.",
      });
      setTrainerMessage("");
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        msg: "Failed to send trainer request. Please try again.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, trainer: false }));
    }
  };

  const handleDietSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!canDietSubmit) return;

    setLoading((prev) => ({ ...prev, diet: true }));
    setFeedback(null);

    try {
      await api.post("/api/v1/public/wellness/leads/diet-plan", {
        customerName: contact.name,
        email: contact.email,
        phone: contact.phone,
        age: contact.age,
        weightKg: weightNum,
        heightCm: heightNum,
        targetReductionKg: targetNum,
      });

      setFeedback({
        type: "success",
        msg: "Stats received! Check your email soon for your diet plan.",
      });
      setDiet({ weight: "", height: "", target: "" });
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        msg: "Failed to send diet plan request. Please try again.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, diet: false }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Start Your Transformation
        </h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Whether you need a 1:1 coach or a personalized meal plan, we&apos;ve
          got you covered. Fill in your details once, then choose your path.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Identity Section (Sticky on large screens) */}
        <div className="lg:col-span-4 h-fit">
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-emerald-100/50 border border-emerald-50 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-700">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Your Profile</h3>
                <p className="text-xs text-gray-500">
                  Required for all services
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="John Doe"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="john@example.com"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 ml-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <input
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="+974..."
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 ml-1">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <input
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="28"
                      value={contact.age}
                      onChange={(e) =>
                        setContact({ ...contact, age: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {!isContactValid && (
              <div className="mt-6 p-3 bg-amber-50 text-amber-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                <span>
                  Please complete your profile above to unlock the services
                  below.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Service Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Feedback Alert */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 ${
                feedback.type === "success"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {feedback.type === "success" ? <CheckCircle2 /> : <AlertCircle />}
              <span className="text-sm font-medium">{feedback.msg}</span>
            </div>
          )}

          {/* Card 1: Trainer */}
          <form
            onSubmit={handleTrainerSubmit}
            className={`group relative bg-white rounded-3xl p-1 shadow-sm border transition-all duration-300 ${
              !isContactValid
                ? "opacity-50 grayscale-[0.5] cursor-not-allowed"
                : "hover:shadow-xl border-gray-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Dumbbell />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Hire a Trainer</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Get a 1:1 freelance coach to build your routine.
                </p>
              </div>

              <div className="md:w-2/3 flex flex-col gap-4">
                <textarea
                  disabled={!isContactValid}
                  className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none disabled:bg-gray-100"
                  placeholder={
                    isContactValid
                      ? "I want to lose 5kg and build muscle..."
                      : "Fill profile details first..."
                  }
                  value={trainerMessage}
                  onChange={(e) => setTrainerMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!canTrainerSubmit}
                  className="self-end flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                >
                  {loading.trainer ? "Sending..." : "Request Callback"}{" "}
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* Card 2: Diet Plan */}
          <form
            onSubmit={handleDietSubmit}
            className={`group relative bg-white rounded-3xl p-1 shadow-sm border transition-all duration-300 ${
              !isContactValid
                ? "opacity-50 grayscale-[0.5] cursor-not-allowed"
                : "hover:shadow-xl border-gray-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                  <Utensils />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Get Diet Plan
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Automated meal suggestions based on your stats.
                </p>
              </div>

              <div className="md:w-2/3 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Weight
                    </label>
                    <input
                      disabled={!isContactValid}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-100"
                      placeholder="kg"
                      value={diet.weight}
                      onChange={(e) =>
                        setDiet({ ...diet, weight: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Height
                    </label>
                    <input
                      disabled={!isContactValid}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-100"
                      placeholder="cm"
                      value={diet.height}
                      onChange={(e) =>
                        setDiet({ ...diet, height: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Target
                    </label>
                    <input
                      disabled={!isContactValid}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-100"
                      placeholder="- kg"
                      value={diet.target}
                      onChange={(e) =>
                        setDiet({ ...diet, target: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!canDietSubmit}
                  className="self-end flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                >
                  {loading.diet ? "Generating..." : "Send My Plan"}{" "}
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
