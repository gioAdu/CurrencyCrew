import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { headers } from '@/next.config';

const ExChange = () => {
  const { data, isLoading, error } = useQuery('Countries', { enabled: false });

  const router = useRouter();

  const shortName = router.query.countryName;

  const [selectedCountrySymbol, setSelectedCountrySymbol] = useState('');

  const [countryName, setCountryName] = useState('');

  const [inputValue, SetInputValue] = useState(0);

  const [exChangeRate, setExChangeRate] = useState(1);

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };

  const inputHandler = (event) => {
    SetInputValue(event.target.value);
  };

  useEffect(() => {
    if (router.query) {
      const currentCountry = data?.find((item) => item.short === shortName);

      if (currentCountry) {
        setSelectedCountrySymbol(currentCountry.currencyKey);
        setCountryName(currentCountry.name);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (exChangeCountry && selectedCountrySymbol) {
      fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/pair/${selectedCountrySymbol}/${exChangeCountry.currencyKey}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setExChangeRate(data.conversion_rate);
        })
        .catch((err) => console.log(err));
    }
  }, [countryName]);

  const exChangeCountry = data
    ? data.find((item) => item.name === countryName)
    : [];

  return (
    <>
      <Head>
        <title>{`${countryName} Information and Exchange Rates`}</title>
        <meta
          property="og:title"
          content={`${countryName} Information and Exchange Rates`}
          key="title"
        />
      </Head>
      <Typography variant="h4" paddingBottom={3}>
        Currency Exchange
      </Typography>
      <Box width={'30%'} paddingBottom={5}>
        <FormControl fullWidth>
          <InputLabel id="Country-label">Country</InputLabel>
          <Select
            labelId="Country-label"
            id="Country"
            value={countryName}
            label="Country"
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
        <Box width="100%" height="100%">
          <Input
            type="number"
            placeholder="0"
            value={inputValue}
            onChange={inputHandler}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <div style={{ marginRight: '10px', color: 'gray' }}>
                  {selectedCountrySymbol}
                </div>
              </InputAdornment>
            }
          />
        </Box>

        <Typography variant="h4" marginX={3}>
          =
        </Typography>

        <Box width="100%" height={'100%'}>
          <Input
            type="number"
            placeholder="0"
            fullWidth
            disabled
            value={(inputValue * exChangeRate).toFixed(2)}
            startAdornment={
              exChangeCountry && (
                <InputAdornment position="start" className="text">
                  {exChangeCountry.currencyKey}
                </InputAdornment>
              )
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default ExChange;
