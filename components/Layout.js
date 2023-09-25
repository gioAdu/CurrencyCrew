import { Card, CardContent, Container } from '@mui/material'
import { useQuery } from 'react-query'
import CountrySelect from './CountrySelect'
import { useEffect, useState } from 'react'
import { useGeoLocation } from './LocationPermission'
import getCountryNameFromCoordinates from '@/lib/googleParser'
import { useRouter } from 'next/router'
import { CountriesMapper } from '@/lib/CountriesMapper'
import Head from 'next/head'

export default function Layout({ children }) {
  const router = useRouter()
  const { status, lat, lng } = useGeoLocation()
  const apiKey = 'AIzaSyCQlaWJHlvEuYiCXRUEGQf79EWxwkPR-hg'
  const { data, isLoading, error } = CountriesMapper()

  const [countryName, setCountryName] = useState('')

  useEffect(() => {
    if (status === 'granted' && lat !== null && lng !== null) {
      if (router.pathname === '/') {
        getCountryNameFromCoordinates(lat, lng, apiKey)
          .then((name) => setCountryName(name))
          .catch((error) => console.error(error))
      }
    }
  }, [lat, lng, apiKey])

  useEffect(() => {
    if (countryName && data) {
      // Find the country with matching short_name (cca2)
      const matchingCountry = data.find(
        (country) => country.name === countryName
      )

      if (matchingCountry) {
        // Programmatically navigate to the corresponding route
        router.push(`/${matchingCountry.short}`)
      }
    }
  }, [countryName])

  return (
    <>
      <Head>
        <title>Home</title>
        <meta property='og:title' content='Home' key='title' />
      </Head>
      <Container>
        <Card>
          <CardContent>
            {isLoading ? <div>Loading...</div> : <CountrySelect data={data} />}

            <main>{children}</main>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
