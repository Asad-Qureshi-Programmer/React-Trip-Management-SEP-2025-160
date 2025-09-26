// services/imageService.js
export const getDestinationImage = async (destination) => {
  try {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        destination
      )}&orientation=landscape&per_page=1&client_id=${accessKey}`
    )

    if (!response.ok) throw new Error("Unsplash fetch failed")

    const data = await response.json()
    return data.results[0]?.urls?.regular || `https://picsum.photos/800/600?random=${Date.now()}`
  } catch (err) {
    console.error("Error fetching image:", err)
    return `https://picsum.photos/800/600?random=${Date.now()}`
  }
}
