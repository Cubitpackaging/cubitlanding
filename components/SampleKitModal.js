'use client'
import { useState, useCallback } from 'react'
import useGooglePlaces from '../hooks/useGooglePlaces'

const SampleKitModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    sampleType: '',
    specialRequests: '',
    // Address fields
    street: '',
    unit: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })
  
  const [errors, setErrors] = useState({})

  const sampleTypes = [
    { value: 'basic', label: 'Basic Sample Kit', description: 'Essential samples of our most popular materials and finishes' },
    { value: 'premium', label: 'Premium Sample Kit', description: 'Complete range including specialty finishes and premium materials' },
    { value: 'custom', label: 'Custom Sample Request', description: 'Specific samples tailored to your project needs' },
    { value: 'material', label: 'Material Samples Only', description: 'Focus on cardboard, kraft, and specialty materials' },
    { value: 'finish', label: 'Finish Samples Only', description: 'Spot UV, foil stamping, embossing, and coating samples' }
  ]

  const industries = [
    'E-commerce/Retail',
    'Cosmetics & Beauty',
    'Food & Beverage',
    'Electronics',
    'Fashion & Apparel',
    'Health & Wellness',
    'Automotive',
    'Home & Garden',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePlaceSelect = useCallback((addressData) => {
    setFormData(prev => ({
      ...prev,
      ...addressData
    }))
    
    // Clear any existing address errors
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.street
      delete newErrors.city
      delete newErrors.state
      delete newErrors.zipCode
      delete newErrors.country
      return newErrors
    })
  }, [])

  const addressInputRef = useGooglePlaces(handlePlaceSelect)

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    }
    
    if (step === 2) {
      if (!formData.sampleType) newErrors.sampleType = 'Please select a sample type'
      if (!formData.street.trim()) newErrors.street = 'Street address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
      if (!formData.country.trim()) newErrors.country = 'Country is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const generateWhatsAppMessage = () => {
    const selectedSample = sampleTypes.find(s => s.value === formData.sampleType)
    
    const message = `SAMPLE KIT REQUEST

CONTACT INFORMATION
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not specified'}
Industry: ${formData.industry || 'Not specified'}

SAMPLE REQUEST DETAILS
Sample Type: ${selectedSample?.label || 'Not specified'}
Description: ${selectedSample?.description || ''}

SHIPPING ADDRESS
${formData.street}${formData.unit ? `, ${formData.unit}` : ''}
${formData.city}, ${formData.state} ${formData.zipCode}
${formData.country}

SPECIAL REQUESTS
${formData.specialRequests || 'None'}

Please confirm availability and shipping timeline for this sample kit request.

Thank you!`

    return encodeURIComponent(message)
  }

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/15102038855?text=${message}`
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  const resetForm = () => {
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      name: '', email: '', phone: '', company: '', industry: '', 
      sampleType: '', specialRequests: '', shippingAddress: '',
      street: '', unit: '', city: '', state: '', zipCode: '', country: ''
    })
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(2)) {
      setIsSubmitted(true)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                Request Sample Kit
              </h2>
              <p className="text-gray-600 mt-1">Get physical samples delivered to your door</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Step {currentStep} of 2</span>
                <span>{Math.round((currentStep / 2) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sample Kit Request Ready!</h3>
            <p className="text-gray-600 mb-6">
              Continue on WhatsApp to confirm your sample kit request and get shipping details.
            </p>
            
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Continue on WhatsApp
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Click above to finalize your sample kit request and get shipping confirmation
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your company (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="">Select your industry (optional)</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Sample Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Kit Details</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Sample Type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {sampleTypes.map((type) => (
                        <div key={type.value} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="sampleType"
                              value={type.value}
                              checked={formData.sampleType === type.value}
                              onChange={handleInputChange}
                              className="mt-1 text-green-600 focus:ring-green-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-600">{type.description}</div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.sampleType && <p className="mt-1 text-sm text-red-500">{errors.sampleType}</p>}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          ref={addressInputRef}
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            errors.street ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Start typing your street address..."
                        />
                        {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment, suite, etc.
                        </label>
                        <input
                          type="text"
                          name="unit"
                          value={formData.unit}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleAddressChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="City"
                          />
                          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State / Province <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleAddressChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="State / Province"
                          />
                          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP / Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleAddressChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.zipCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="ZIP / Postal code"
                          />
                          {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleAddressChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.country ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Country"
                          />
                          {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                      placeholder="Any specific samples or requirements you'd like to include..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Request Sample Kit
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default SampleKitModal 