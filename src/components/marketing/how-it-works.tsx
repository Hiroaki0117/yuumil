"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { UserPlus, Settings, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up in Seconds",
    description: "Create your account with just one click using social login",
    icon: UserPlus,
    color: "from-purple-500 to-pink-500",
    image: "/images/step1.svg",
  },
  {
    number: "02",
    title: "Set Your Preferences",
    description: "Choose your favorite genres and topics to personalize your feed",
    icon: Settings,
    color: "from-blue-500 to-cyan-500",
    image: "/images/step2.svg",
  },
  {
    number: "03",
    title: "Discover Amazing Content",
    description: "Get AI-powered recommendations tailored just for you",
    icon: Sparkles,
    color: "from-green-500 to-emerald-500",
    image: "/images/step3.svg",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4"
          >
            <ChevronRight className="w-4 h-4" />
            <span>Simple Process</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              How it works
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start discovering personalized content in just three simple steps
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Desktop View */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 -translate-y-1/2 z-0" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative z-10"
                onMouseEnter={() => setActiveStep(index)}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 ${
                    activeStep === index ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  {/* Step Number */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: activeStep === index ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {step.description}
                  </p>
                  
                  {/* Visual */}
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <motion.div
                      animate={{ scale: activeStep === index ? 1.1 : 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="text-slate-400 text-sm">
                        Visual Preview
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {step.number}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-24 bg-gradient-to-b from-purple-200 to-transparent mt-2" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}