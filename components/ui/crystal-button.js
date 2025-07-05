'use client'

import React from 'react'

const CrystalButton = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`
        relative inline-flex items-center justify-center
        px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold
        bg-white text-gray-900 
        border border-gray-200
        rounded-xl shadow-lg
        hover:shadow-xl hover:scale-105 hover:bg-gray-50
        transition-all duration-300 ease-in-out
        focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50
        active:scale-95
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Crystal shine effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        style={{
          transform: 'translateX(-100%) skewX(-15deg)',
          animation: 'shine 2s infinite'
        }}
      ></div>
      
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-20 rounded-xl"></div>
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </button>
  )
})

CrystalButton.displayName = 'CrystalButton'

export { CrystalButton } 