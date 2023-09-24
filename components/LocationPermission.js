import { useEffect } from 'react'

const LocationPermission = ({ onPermissionGranted, onPermissionDenied }) => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          onPermissionGranted()
        } else {
          result.onchange = () => {
            if (result.state === 'granted') {
              onPermissionGranted()
            } else {
              onPermissionDenied()
            }
          }
        }
      })
    } else {
      onPermissionDenied()
    }
  }, [onPermissionGranted, onPermissionDenied])

  return null
}

export default LocationPermission
