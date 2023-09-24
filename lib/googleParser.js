export default function getCountryNameFromCoordinates(latitude, longitude, apiKey) {
  return new Promise((resolve, reject) => {
    // Construct the Geocoding API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    // Make the fetch request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains results
        if (data.results && data.results.length > 0) {
          // Loop through address components to find the country
          for (const component of data.results[0].address_components) {
            // Check if the component has the type "country"
            if (component.types.includes('country')) {
              const countryName = component.long_name; // Extract the country name
              resolve(countryName);
              return; // You can return to exit the loop if you've found the country
            }
          }
          // If no country was found, reject the promise
          return;
        } else {
          return;
        }
      })
      .catch((error) => {
        reject('Error fetching geocoding data: ' + error);
      });
  });
}