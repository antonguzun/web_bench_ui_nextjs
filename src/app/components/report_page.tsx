'use client'

import React, {useMemo} from 'react'
import ReportTable from './table'
import ScenarioSet from './scenario_picker'
import {
  ReportScheme,
  InputResult,
  ReportOptionInterface,
  ReportOption,
} from '../entities/report'
import useSWRImmutable from 'swr/immutable'
import ReportFilters from './filter'
import filterReports from '../services/filter'
import {HorReportChart, RenderCpuChart, RenderMemChart} from './chart'
import {GitCorner} from './git_corner'
import {ReportOptions} from './report_options'

// @ts-expect-error - satisfy linter
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const REPORTS_LISTING_URL = 'https://web-bench.guzun.dev/reports/'

function parseData(data: InputResult) {
  return new ReportScheme(data)
}
export default function ReportPage() {
  const [reportFileName, setReportFileName] = React.useState('latest')
  const {data, error} = useSWRImmutable<InputResult, string>(
    REPORTS_LISTING_URL + reportFileName,
    fetcher,
  )
  const {data: reportsOptionsRaw} = useSWRImmutable<
    ReportOptionInterface[],
    string
  >(REPORTS_LISTING_URL, fetcher)

  const parsedData = useMemo(() => (data ? parseData(data) : null), [data])
  const [testName, setTestName] = React.useState('')
  const {filterState, filterElement} = ReportFilters()

  const filteredReports = useMemo(
    () => (parsedData ? filterReports(parsedData, filterState, testName) : []),
    [parsedData, filterState, testName],
  )
  const testNames = useMemo(() => {
    console.log('testNames triggered by parsedData')
    return parsedData
      ? parsedData.results.map((result) => result.testName).sort()
      : []
  }, [parsedData])
  const uniqueTestNames = useMemo(
    () => (testNames ? new Set<string>(testNames) : new Set<string>([])),
    [testNames],
  )
  const [hoverRow, setHoverRow] = React.useState(-1)

  let reportsOptions: ReportOption[]
  if (reportsOptionsRaw === undefined) {
    reportsOptions = []
  } else {
    reportsOptions = reportsOptionsRaw.map((ro) => {
      return new ReportOption(ro)
    })
    reportsOptions.sort((a, b) => {
      if (a.mtime < b.mtime) {
        return 1
      } else if (a.mtime > b.mtime) {
        return -1
      } else {
        return 0
      }
    })
  }

  if (error) return <div>Failed to load</div>

  if (!parsedData) return <div>Loading tests...</div>

  if (testName === '' && parsedData.results.length > 0) {
    setTestName(parsedData.results[0].testName)
  }

  return (
    <>
      <GitCorner />
      <h1 className="py-4 text-2xl text-center">Webservers bench</h1>

      <div className="mx-auto px-2 sm:px-6 md:px-4 inline-block justify-center">
        <div className="grid grid-rows-3 grid-flow-col gap-4 pl-4 min-h-min">
          <div className="row-span-3">
            <ul className="min-w-min px-2 py-2 bg-slate-800 rounded-lg max-h-min">
              <li>
                <ScenarioSet
                  uniqueTestNames={uniqueTestNames}
                  setTestName={setTestName}
                  testName={testName}
                />
              </li>
              {filterElement}
            </ul>

            <ReportOptions
              reportsOptions={reportsOptions}
              reportFileName={reportFileName}
              setReportFileName={setReportFileName}
            />
          </div>

          <div className="col-span-2 px-2 py-2 sm:px-4 bg-slate-800 rounded-md inline-block overflow-auto max-h-min">
            <ReportTable
              data={filteredReports}
              hoverRow={hoverRow}
              setHoverRow={setHoverRow}
            />
          </div>
          <div className="row-span-2 col-span-2 px-2 py-4 sm:px-4 bg-slate-800 rounded-lg">
            <div className="flex flex-row">
              <div className="w-2/3">
                <RenderMemChart
                  data={filteredReports}
                  hoverRow={hoverRow}
                  setHoverRow={setHoverRow}
                />

                <RenderCpuChart
                  data={filteredReports}
                  hoverRow={hoverRow}
                  setHoverRow={setHoverRow}
                />
              </div>

              <div className="w-1/3">
                <HorReportChart
                  data={filteredReports}
                  hoverRow={hoverRow}
                  setHoverRow={setHoverRow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
