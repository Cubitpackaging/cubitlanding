'use client'
import { useEffect, useRef } from 'react'

const useGooglePlaces = (onPlaceSelect) => {
  const autocompleteRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!window.google || !inputRef.current) return

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: ['US', 'CA'] }, // Limit to US and Canada
      fields: ['address_components', 'formatted_address']
    })

    // Add place_changed event listener
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace()
      
      if (!place.address_components) return

      // Initialize address object
      const addressData = {
        street: '',
        unit: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }

      // Extract address components
      place.address_components.forEach(component => {
        const type = component.types[0]
        
        switch (type) {
          case 'street_number':
            addressData.street = component.long_name
            break
          case 'route':
            addressData.street += (addressData.street ? ' ' : '') + component.long_name
            break
          case 'subpremise':
            addressData.unit = component.long_name
            break
          case 'locality':
            addressData.city = component.long_name
            break
          case 'administrative_area_level_1':
            addressData.state = component.short_name
            break
          case 'postal_code':
            addressData.zipCode = component.long_name
            break
          case 'country':
            addressData.country = component.long_name
            break
        }
      })

      // Call the callback with the parsed address
      onPlaceSelect(addressData)
    })

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onPlaceSelect])

  return inputRef
}

export default useGooglePlaces 