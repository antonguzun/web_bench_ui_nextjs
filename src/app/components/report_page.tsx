'use client'

import React from 'react'
import ReportTable from './table'
import ScenarioSet from './scenario_picker'
import {ReportScheme, InputResult, ReportOptionInterface, ReportOption} from '../entities/report'
import useSWRImmutable from 'swr/immutable'
import ReportFilters from './filter'
import filterReports from '../services/filter'
import ReportChart from './chart'

// @ts-expect-error - satisfy linter
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const REPORTS_LISTING_URL = 'https://web-bench.guzun.dev/reports/'

export default function ReportPage() {
  const [reportFileName, setReportFileName] = React.useState('latest')
  const {data, error} = useSWRImmutable<InputResult, string>(
    REPORTS_LISTING_URL + reportFileName,
    fetcher,
  )
  const {data: reportsOptionsRaw} = useSWRImmutable<ReportOptionInterface[], string>(
    REPORTS_LISTING_URL,
    fetcher,
  )
  let reportsOptions: ReportOption[];
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
  const [testName, setTestName] = React.useState('')
  const [hoverRow, setHoverRow] = React.useState(-1)
  const {filterState, filterElement} = ReportFilters()

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading tests...</div>

  const parsedData = new ReportScheme(data)
  if (!parsedData) return <div>Loading tests...</div>

  const testNames = parsedData.results.map((result) => result.testName).sort()
  const uniqueTestNames = new Set<string>(testNames)
  if (testName === '' && parsedData.results.length > 0) {
    setTestName(parsedData.results[0].testName)
  }

  const filteredReports = filterReports(parsedData, filterState, testName)

  return (
    <>
      <h1 className="py-8 text-2xl text-center">Webservers bench</h1>

      <div className="mx-auto px-4 sm:px-6 md:px-8 inline-block justify-center">
        <div className="grid grid-rows-2 grid-flow-col gap-4 pl-8 min-h-min">
          <div className="row-span-3">
            <ul className=" min-w-min px-4 py-2 bg-slate-800 rounded-lg max-h-min">
              <li>
                <ScenarioSet
                  uniqueTestNames={uniqueTestNames}
                  setTestName={setTestName}
                  testName={testName}
                />
              </li>
              {filterElement}
            </ul>

            <ul className="row-span-5 min-w-min px-4 py-2 my-3 bg-slate-800 rounded-lg max-h-min">
              Previous reports:
              {reportsOptions?.map((reportOption) => (
                <li className="ml-1 font-mono" key={reportOption.name}>
                  <a
                    key={reportOption.name}
                    className={
                      reportFileName === reportOption.name
                        ? 'text-blue-600 dark:text-blue-500 hover:underline'
                        : 'dark:text-blue-100 hover:underline'
                    }
                    onClick={() => setReportFileName(reportOption.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reportOption.is_latest
                      ? reportOption.mtime.toDateString() + ' (latest)'
                      : reportOption.mtime.toDateString()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 px-4 py-8 sm:px-8 bg-slate-800 rounded-lg inline-block overflow-auto">
            <ReportTable
              data={filteredReports}
              hoverRow={hoverRow}
              setHoverRow={setHoverRow}
            />
          </div>

          <div className="row-span-2 col-span-2 px-4 py-8 sm:px-8 bg-slate-800 rounded-lg inline-block max-h-96">
            <ReportChart
              data={filteredReports}
              hoverRow={hoverRow}
              setHoverRow={setHoverRow}
            />
          </div>
        </div>
      </div>
    </>
  )
}
