'use client'

import React, { useState } from 'react'
import { MessageSquare, Paintbrush, Globe, Zap, BarChart3, ArrowRight } from 'lucide-react'

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Tell Us What You Need",
      description: "You don't need to know paper weights or dielines - just tell us what you're building, and we'll guide you to the right packaging type, size, and finish.",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Design, Refined",
      description: "Upload your own design, or let our creative team step in. We'll align every panel with your brand and even help place scannable QR/NFC for a smart, connected experience.",
      icon: <Paintbrush className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Smart Meets Sustainable",
      description: "Choose eco-conscious materials, and we'll help you turn that effort into a story your customers can see, scan, and believe in right from the box.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Production Begins Fast",
      description: "Once approved, your packaging goes into production. Our process is streamlined, fast, and consistent with no long waits, no last-minute surprises.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Track, Manage, Scale",
      description: "Need more? Reordering is easy. You'll soon be able to manage your packaging, microsite links, and tracking all in one place, under your login.",
      icon: <BarChart3 className="w-6 h-6" />
    }
  ]

  const handleNextStep = () => {
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How We Make Custom Packaging…<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Feel Effortless</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From first idea to unboxing moment, we simplify every step so you can focus on building your brand, not managing packaging chaos.
          </p>
        </div>

        {/* Interactive Process Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Featured Step Card */}
          <div className="lg:col-span-7 lg:row-span-1">
            <div className="h-full overflow-hidden border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <div className="p-0">
                <div className="relative h-full">
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
                  
                  {/* Content */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                        {steps[activeStep].icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-bold text-blue-600">{steps[activeStep].number}</span>
                        <ArrowRight className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {steps[activeStep].description}
                    </p>
                    
                    <div className="mt-auto">
                      <button 
                        onClick={handleNextStep}
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step Selection Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className={`h-full border border-gray-200 rounded-xl bg-white ${activeStep === index ? 'bg-blue-50' : ''}`}>
                  <div className="p-4 flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      activeStep === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Overview - Redesigned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <ProcessCard 
              key={index} 
              step={step} 
              index={index} 
              isLast={index === steps.length - 1} 
            />
          ))}
        </div>

        {/* Closing Section */}

      </div>
    </section>
  )
}

// Process Card Component - Redesigned with modern styling and animations
const ProcessCard = ({ step, index, isLast }) => {
  return (
    <div className="relative">
      <div className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        {/* Diagonal lines pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.03)_25%,rgba(0,0,0,0.03)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.03)_75%)] bg-[length:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        
        <div className="relative p-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100/80 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
            {step.icon}
          </div>
          
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-3">
            {step.number}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
          
          {/* Animated underline on hover */}
          <div className="h-0.5 w-12 bg-blue-500/50 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
      </div>
      
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200">
          <div className="absolute right-0 top-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  )
}

export default HowItWorks