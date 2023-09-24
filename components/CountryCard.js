import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Image from 'next/image'

const CountryCard = ({ info }) => {
  return (
    <Box py={3}>
      <Card>
        <CardContent>
          <Box display='flex' alignItems={'center'} paddingBottom={3} gap={3}>
            <Typography variant='h4'>
              {info.official}
            </Typography>
            <Image
              src={info.flag}
              alt={info.official}
              width={45}
              height={30}
            />
          </Box>

          <Grid container rowGap={4}>
            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>Capital:</Typography>
                <Typography>{info.capital}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>continent:</Typography>
                <Typography>{info.region}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>Currency</Typography>
                <Typography>
                  {info.currencyName} ({info.currencySymbol})
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>Population</Typography>
                <Typography>{info.population}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>Region</Typography>
                <Typography>{info.region}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display='flex' gap={7}>
                <Typography sx={{ fontWeight: 'bold' }}>Borders</Typography>
                <Typography>{info.borders}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CountryCard
