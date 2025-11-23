import ContactAndDiet from './components/ContactAndDiet'
import Footer from './components/Footer'

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
      <ContactAndDiet />
      <Footer />
    </div>
  )
}
