'use client'
import { useEffect, useRef } from 'react'

const useGooglePlaces = (onPlaceSelect) => {
  const autocompleteRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    // Wait for Google Maps to be fully loaded
    const initAutocomplete = () => {
      if (!window.google?.maps?.places || !inputRef.current) return

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
    }

    // Define cleanup variables
    let handleGoogleMapsLoaded = null
    let checkGoogleMaps = null

    // Initialize immediately if Google Maps is already loaded
    if (window.google?.maps?.places) {
      initAutocomplete()
    } else {
      // Listen for Google Maps loaded event
      handleGoogleMapsLoaded = () => {
        initAutocomplete()
      }
      
      window.addEventListener('googleMapsLoaded', handleGoogleMapsLoaded)
      
      // Fallback: check periodically for Google Maps
      checkGoogleMaps = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(checkGoogleMaps)
          initAutocomplete()
        }
      }, 100)

      // Cleanup interval after 5 seconds to prevent infinite checking
      setTimeout(() => {
        if (checkGoogleMaps) {
          clearInterval(checkGoogleMaps)
        }
      }, 5000)
    }

    return () => {
      if (handleGoogleMapsLoaded) {
        window.removeEventListener('googleMapsLoaded', handleGoogleMapsLoaded)
      }
      if (checkGoogleMaps) {
        clearInterval(checkGoogleMaps)
      }
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onPlaceSelect])

  return inputRef
}

export default useGooglePlaces 