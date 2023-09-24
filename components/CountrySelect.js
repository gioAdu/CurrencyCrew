import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CountrySelect = ({ data }) => {
  const router = useRouter()

  const [countryName, setCountryName] = useState('')

  const findCountryByShortName = (shortName) =>
    data.find((item) => item.short === shortName)

  const findCountryByName = (name) => data.find((item) => item.name === name)

  useEffect(() => {
    if (router.query) {
      const selectedCountry = findCountryByShortName(router.query.countryName)
      if (selectedCountry) {
        setCountryName(selectedCountry.name)
      }
    }
  }, [router.query])

  const handleChange = (event) => {
    const selectedCountry = findCountryByName(event.target.value)
    if (selectedCountry) {
      router.push(`/${selectedCountry.short}`)
    }
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id='country-select'>Country</InputLabel>
      <Select
        labelId='country-select'
        id='country-select'
        value={countryName}
        label='Country'
        onChange={handleChange}
      >
        {data?.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CountrySelect
