import { Box, Grid, Input, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const api_url_by_country = 'https://api.api-ninjas.com/v1/airports?country='
const api_url_name = 'https://api.api-ninjas.com/v1/airports?name='

const Airport = () => {
  const router = useRouter()
  let debounceTimer

	useEffect(() => {
		return () => {
			clearTimeout(debounceTimer); // Clear the timer when the component unmounts
		};
	}, [])

  const shortName = router.query.countryName

  const [airports, setAirports] = useState([])

  const { data: countriesData } = useQuery('Countries', { enabled: false })

  const inputHandler = (event) => {
    let inputVal = event.target.value

    clearTimeout(debounceTimer)

    if (inputVal.trim() === '') {
      setAirports(AirportsData)
    } else {
      debounceTimer = setTimeout(() => {
        fetch(`${api_url_name}${inputVal}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'IXsLv/+DI7lW3w8kw4otmQ==9sU1fXWiIFOyljZu',
          },
        })
          .then((response) => response.json())
          .then((data) => setAirports(data))
      }, 500)
    }
  }

  const activeCountry = countriesData
    ? countriesData.find((item) => item.short === shortName)
    : []

  const fetchAirports = async () => {
    const response = await fetch(
      `${api_url_by_country}${activeCountry.altSpelling}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': 'IXsLv/+DI7lW3w8kw4otmQ==9sU1fXWiIFOyljZu',
        },
      }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  const { data: AirportsData, isLoading, error } = useQuery('Airports', fetchAirports, {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: Boolean(shortName), // Optionally, enable the query when shortName is available
  })

  useEffect(() => {
    if (AirportsData) {
      setAirports(AirportsData)
    }
  }, [AirportsData])


	if(isLoading){
		return <div>Loading ...</div>
	}

	if(error){
		return <div>error something went wrong</div>
	}
  return (
    <>
      <Typography variant='h4' paddingBottom={4}>
        Airports
      </Typography>
      <Input placeholder='Search for airports' onChange={inputHandler} />
      <Box paddingTop={4}>
        <Grid container spacing={2}>
          {airports.map((item) => (
            <Grid item xs={12} md={6} key={item.icao}>
              <Typography variant='body1'>
                {item.icao} - {item.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Airport
