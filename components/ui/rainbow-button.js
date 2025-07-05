'use client'

import React from 'react'

const RainbowButton = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`
        relative inline-flex items-center justify-center
        px-8 py-4 text-lg font-semibold text-white
        rounded-lg shadow-lg
        hover:shadow-xl hover:scale-105
        transition-all duration-300 ease-in-out
        border-0 outline-none
        focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50
        active:scale-95
        overflow-hidden
        ${className}
      `}
      style={{
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'rainbow 4s ease infinite'
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite'
        }}
      ></div>
      
      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 0% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  )
})

RainbowButton.displayName = 'RainbowButton'

export { RainbowButton } 