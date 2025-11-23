export default function AdminFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-sm text-gray-500">
        <span>© {new Date().getFullYear()} WellnessConnect</span>
        <span>UAE • QATAR • INDIA</span>
      </div>
    </footer>
  );
}
