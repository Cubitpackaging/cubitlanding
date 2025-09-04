// Submit quote form to both email and admin panel
export const submitQuoteForm = async (formData) => {
  const results = {
    email: { success: false, error: null },
    admin: { success: false, error: null },
    overall: { success: false, errors: [] }
  }

  try {
    // Submit to email and admin panel in parallel
    const [emailResult, adminResult] = await Promise.allSettled([
      fetch('/api/send-quote-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(async res => {
        const data = await res.json()
        return { ...data, status: res.status }
      }),
      fetch('/api/admin/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(async res => {
        const data = await res.json()
        return { ...data, status: res.status }
      })
    ])

    // Handle email result
    if (emailResult.status === 'fulfilled' && emailResult.value.success) {
      results.email.success = true
    } else {
      const error = emailResult.reason || emailResult.value?.error || 'Email sending failed'
      results.email.error = error
      results.overall.errors.push(`Email: ${error}`)
    }

    // Handle admin result
    if (adminResult.status === 'fulfilled' && adminResult.value.success) {
      results.admin.success = true
    } else {
      const error = adminResult.reason || adminResult.value?.error || 'Admin panel save failed'
      results.admin.error = error
      results.overall.errors.push(`Admin: ${error}`)
    }

    // Overall success if at least one method worked
    results.overall.success = results.email.success || results.admin.success

    return results

  } catch (error) {
    results.overall.errors.push(`System error: ${error.message}`)
    return results
  }
}

// Submit rush order to both email and admin panel
export const submitRushOrder = async (formData) => {
  const results = {
    email: { success: false, error: null },
    admin: { success: false, error: null },
    overall: { success: false, errors: [] }
  }

  try {
    // Submit to email and admin panel in parallel
    const [emailResult, adminResult] = await Promise.allSettled([
      fetch('/api/send-rush-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(async res => {
        const data = await res.json()
        return { ...data, status: res.status }
      }),
      fetch('/api/admin/rush-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(async res => {
        const data = await res.json()
        return { ...data, status: res.status }
      })
    ])

    // Handle email result
    if (emailResult.status === 'fulfilled' && emailResult.value.success) {
      results.email.success = true
    } else {
      const error = emailResult.reason || emailResult.value?.error || 'Email sending failed'
      results.email.error = error
      results.overall.errors.push(`Email: ${error}`)
    }

    // Handle admin result
    if (adminResult.status === 'fulfilled' && adminResult.value.success) {
      results.admin.success = true
    } else {
      const error = adminResult.reason || adminResult.value?.error || 'Admin panel save failed'
      results.admin.error = error
      results.overall.errors.push(`Admin: ${error}`)
    }

    // Overall success if at least one method worked
    results.overall.success = results.email.success || results.admin.success

    return results

  } catch (error) {
    results.overall.errors.push('Unexpected error occurred')
    return results
  }
}

// Get user-friendly error message
export const getSubmissionErrorMessage = (results) => {
  if (results.overall.success) {
    return null
  }

  if (results.email.success && !results.admin.success) {
    return 'Your request was emailed successfully, but there was an issue saving to our system. We have received your request and will respond soon.'
  }

  if (!results.email.success && results.admin.success) {
    return 'Your request was saved successfully, but there was an issue sending the email notification. We have received your request and will respond soon.'
  }

  return 'There was an issue submitting your request. Please try again or contact us directly.'
}

// Get user-friendly success message
export const getSubmissionSuccessMessage = (type) => {
  if (type === 'quote') {
    return 'Your quote request has been submitted successfully! We\'ve received your request and will respond within 24 hours.'
  } else if (type === 'rush-order') {
    return 'Your rush order has been submitted successfully! We\'ve received your urgent request and will prioritize it accordingly.'
  }
  return 'Your request has been submitted successfully!'
}