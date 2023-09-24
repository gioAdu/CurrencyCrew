import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import CountrySelect from './CountrySelect'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ExChange = () => {
  const { data, isLoading, error } = useQuery('Countries', { enabled: false })

  const router = useRouter()

  const shortName = router.query.countryName

  const [selectedCountrySymbol, setSelectedCountrySymbol] = useState('')

  const [countryName, setCountryName] = useState('')

  const [inputValue, SetInputValue] = useState(0)

  const [exChangeRate, setExChangeRate] = useState(1)

  const handleChange = (event) => {
    setCountryName(event.target.value)
  }

  const inputHandler = (event) => {
    SetInputValue(event.target.value)
  }

  useEffect(() => {
    if (router.query) {
      const currentCountry = data?.find((item) => item.short === shortName)

      if (currentCountry) {
        setSelectedCountrySymbol(currentCountry.currencyKey)
        setCountryName(currentCountry.name)
      }
    }
  }, [router.query])

  useEffect(() => {
    if (exChangeCountry) {
      fetch(
        `https://api.exchangerate.host/convert?from=${selectedCountrySymbol}&to=${exChangeCountry.currencyKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setExChangeRate(data.info.rate)
        })
    }
  }, [countryName])

  const exChangeCountry = data
    ? data.find((item) => item.name === countryName)
    : []

  return (
    <>
      <Typography variant='h4' paddingBottom={3}>
        Currency Exchange
      </Typography>
      <Box width={'30%'} paddingBottom={5}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={countryName}
            label='Age'
            onChange={handleChange}
          >
            {data?.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display={'flex'} width={'100%'} alignItems={'center'}>
        <Box width='100%' height='100%'>
          <Input
            type='number'
            placeholder='0'
            value={inputValue}
            onChange={inputHandler}
            fullWidth
            startAdornment={
              <InputAdornment position='start'>
                <div style={{ marginRight: '10px', color: 'gray' }}>
                  {selectedCountrySymbol}
                </div>
              </InputAdornment>
            }
          />
        </Box>

        <Typography variant='h4' marginX={3}>
          =
        </Typography>

        <Box width='100%' height={'100%'}>
          <Input
            type='number'
            placeholder='0'
            fullWidth
            disabled
            value={(inputValue * exChangeRate).toFixed(2)}
            startAdornment={
              exChangeCountry && (
                <InputAdornment position='start' className='text'>
                  {exChangeCountry.currencyKey}
                </InputAdornment>
              )
            }
          />
        </Box>
      </Box>
    </>
  )
}

export default ExChange
