import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, ShieldCheck, Eye, Bot, Globe, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Hero */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-blue-700 mb-6"
        >
          EduAid: Decentralized Education Sponsorship
        </motion.h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Transforming real-world student needs into verifiable on-chain assets —
          ensuring transparency, trust, and impact for education across Africa.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Create an Account
          </Link>
          <Link
            to="/login"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-8 bg-blue-100">
        <h2 className="text-3xl font-bold text-center mb-12">The Problem</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 shadow-lg">
            <Users className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">No Trusted Verification</h3>
            <p>No reliable way to confirm who genuinely needs support.</p>
          </Card>
          <Card className="p-6 shadow-lg">
            <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Rampant Fraud</h3>
            <p>Ghost students, fake fundraisers, and corruption destroy trust.</p>
          </Card>
          <Card className="p-6 shadow-lg">
            <Eye className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">No Visibility Into Impact</h3>
            <p>Donors rarely see where their money went or if it made a difference.</p>
          </Card>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="/images/logo.png" alt="EduAid" className="rounded-2xl shadow-md" />
          <div>
            <h2 className="text-3xl font-bold mb-6">The Solution: EduAid</h2>
            <p className="mb-4">
              EduAid transforms verified student needs into Real-World Assets (RWAs) on-chain. Sponsors fund these RWAs directly — with every donation, update, and thank-you stored immutably.
            </p>
            <Button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-20 px-8 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div>
            <GraduationCap className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <p className="text-4xl font-bold text-blue-800">1,200+</p>
            <p>Students Verified</p>
          </div>
          <div>
            <Globe className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <p className="text-4xl font-bold text-blue-800">3,500+</p>
            <p>Donations Made</p>
          </div>
          <div>
            <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <p className="text-4xl font-bold text-blue-800">850+</p>
            <p>Sponsors Onboarded</p>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-blue-100 p-10 rounded-2xl shadow-lg">
          <Bot className="w-16 h-16 text-blue-700" />
          <div>
            <h2 className="text-2xl font-bold mb-4">AI Chatbot Assistant</h2>
            <p className="mb-4">Available in Swahili & English — guiding students, sponsors, and admins via web or WhatsApp.</p>
            <Button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700">
              Try the Chatbot
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-2">EduAid</h3>
            <p className="text-sm text-blue-200">Decentralized Education Sponsorship on ICP.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-300">About</a>
            <a href="#" className="hover:text-blue-300">Docs</a>
            <a href="#" className="hover:text-blue-300">GitHub</a>
            <a href="#" className="hover:text-blue-300">Contact</a>
          </div>
        </div>
        <p className="text-center mt-8 text-blue-300 text-sm">
          © {new Date().getFullYear()} EduAid. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
