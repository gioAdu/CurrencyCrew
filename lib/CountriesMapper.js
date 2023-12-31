import { useQuery } from "react-query"

export const CountriesMapper = () => {
  const { isLoading, error, data } = useQuery(
    'Countries',
    () =>
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          const shortToCommon = {}

          data.forEach((country) => {
            shortToCommon[country.cca3] = country.name.common
          })

          return data?.map((country) => {
            const currencyCode = country.currencies
              ? country.currencies[Object.keys(country.currencies)[0]].name
              : 'N/A'

            let currencyName
            let currencyKey
            let currencySymbol

            if (country.currencies) {
              let firstCurrencyEntry = Object.entries(country.currencies)[0]
              let tempCurrencyKey = firstCurrencyEntry[0]
              let currencyDetails = firstCurrencyEntry[1]

              currencyKey = tempCurrencyKey
              currencyName = currencyDetails.name
              currencySymbol = currencyDetails.symbol
            } else {
              currencyName = 'N/A'
              currencySymbol = ''
            }

            const bordersCommonNames = country.borders
              ? country.borders
                  .map((shortName) => shortToCommon[shortName])
                  .join(', ')
              : ''

            return {
              name: country.name.common,
              official: country.name.official,
              currencyCode: currencyCode,
              currencyName: currencyName,
              currencySymbol: currencySymbol,
              capital: country.capital ? country.capital[0] : 'N/A',
              flag: country.flags.png,
              short: country.cca3,
              borders: bordersCommonNames,
              population: country.population,
              region: country.region ? country.region : 'N/A',
              currencyKey: currencyKey,
              altSpelling: country.altSpellings[0],
              cca2: country.cca2,
            }
          })
        }),

    { staleTime: Infinity, cacheTime: Infinity }
  )

	return {data,isLoading,error}
}
