import {ReportScheme} from '../entities/report'
import {FiltersState, OrmOption} from '../entities/filter'

export default function filterReports(
  parsedData: ReportScheme,
  filterState: FiltersState,
  testName: string,
) {
  return parsedData.results
    .filter((result) => result.testName === testName)
    .filter((result) =>
      filterState.webserverName !== ''
        ? result.webserverName.includes(filterState.webserverName)
        : true,
    )
    .filter((result) =>
      filterState.language !== ''
        ? result.language.includes(filterState.language)
        : true,
    )
    .filter((result) =>
      filterState.database !== ''
        ? result.database && result.database.includes(filterState.database)
        : true,
    )
    .filter((result) => {
      if (filterState.orm === OrmOption.UseOrm) {
        return result.orm != null
      } else if (filterState.orm === OrmOption.WithoutOrm) {
        return result.orm === null
      }
      return true
    })
    .sort((a, b) => b.requestsPerSecond - a.requestsPerSecond)
}
