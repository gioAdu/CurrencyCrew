import { Card, CardContent } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import CountryCard from './CountryCard'

const InnerLayout = ({ children }) => {
  const router = useRouter()

  const shortName = router.query.countryName

  const { data, isLoading, error } = useQuery('Countries', { enabled: false })

  if (!data || !router.isReady) {
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>Error: {error.message}</div>
    }
  }

  const countryInfo = data ? data.find((item) => item.short === shortName) : []

  return (
    <>
      {countryInfo && countryInfo.length != 0 && (
        <CountryCard info={countryInfo} />
      )}
      <div className='tabs'>
        <Link
          href={`/${shortName}`}
          className={`tab ${
            router.asPath === `/${shortName}/airports` ? '' : 'active-tab'
          }`}
        >
          ExChange
        </Link>
        <Link
          href={`/${shortName}/airports`}
          className={`tab ${
            router.asPath === `/${shortName}/airports` ? 'active-tab' : ''
          }`}
        >
          Airports
        </Link>
      </div>
      <Card>
        <CardContent>
        {children}
        </CardContent>
      </Card>
     
    </>
  )
}

export default InnerLayout
