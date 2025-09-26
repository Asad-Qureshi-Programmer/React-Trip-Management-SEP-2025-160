const cache = new Map()

export const getCoordinatesFromDestination = async (destination) => {
  const cacheKey = destination.toLowerCase().trim()
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const searchQueries = [
      destination,
      `${destination} city`,
      `${destination.split(',')[0]} city`
    ]

    for (const query of searchQueries) {
      try {
        const encodedQuery = encodeURIComponent(query.trim())
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1&addressdetails=1&extratags=1`
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'TripManager/1.0 (contact@example.com)',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          
          if (data && data.length > 0) {
            const result = data[0]
            const lat = parseFloat(result.lat)
            const lon = parseFloat(result.lon)
            
            if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
              const locationData = {
                coordinates: [lat, lon],
                displayName: result.display_name || destination,
                success: true,
                fallback: false
              }
              
              cache.set(cacheKey, locationData)
              return locationData
            }
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
      } catch (error) {
        console.warn(`Geocoding attempt failed for query: ${query}`, error)
        continue
      }
    }

    const fallbackData = getFallbackCoordinates(destination)
    cache.set(cacheKey, fallbackData)
    return fallbackData

  } catch (error) {
    console.error('Geocoding service error:', error)
    const fallbackData = getFallbackCoordinates(destination)
    cache.set(cacheKey, fallbackData)
    return fallbackData
  }
}

const getFallbackCoordinates = (destination) => {
  const destinationLower = destination.toLowerCase().trim()
  
  const knownLocations = {
    'paris': [48.8566, 2.3522],
    'london': [51.5074, -0.1278],
    'tokyo': [35.6762, 139.6503],
    'rome': [41.9028, 12.4964],
    'new york': [40.7128, -74.0060],
    'sydney': [-33.8688, 151.2093],
    'barcelona': [41.3851, 2.1734],
    'amsterdam': [52.3676, 4.9041],
    'dubai': [25.2048, 55.2708],
    'bangkok': [13.7563, 100.5018],
    'berlin': [52.5200, 13.4050],
    'madrid': [40.4168, -3.7038],
    'istanbul': [41.0082, 28.9784],
    'mumbai': [19.0760, 72.8777],
    'singapore': [1.3521, 103.8198],
    'hong kong': [22.3193, 114.1694],
    'los angeles': [34.0522, -118.2437],
    'chicago': [41.8781, -87.6298],
    'toronto': [43.6532, -79.3832],
    'mexico city': [19.4326, -99.1332],
    'rio de janeiro': [-22.9068, -43.1729],
    'buenos aires': [-34.6037, -58.3816],
    'cairo': [30.0444, 31.2357],
    'cape town': [-33.9249, 18.4241],
    'mumbai': [19.0760, 72.8777],
    'delhi': [28.7041, 77.1025],
    'beijing': [39.9042, 116.4074],
    'shanghai': [31.2304, 121.4737],
    'seoul': [37.5665, 126.9780],
    'osaka': [34.6937, 135.5023]
  }
  
  for (const [city, coords] of Object.entries(knownLocations)) {
    if (destinationLower.includes(city) || city.includes(destinationLower)) {
      return {
        coordinates: coords,
        displayName: destination,
        success: false,
        fallback: true
      }
    }
  }
  
  return {
    coordinates: [40.7128, -74.0060],
    displayName: destination,
    success: false,
    fallback: true
  }
}