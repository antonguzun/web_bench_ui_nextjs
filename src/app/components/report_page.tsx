'use client'

import React from 'react'
import ReportTable from './table'
import ScenarioSet from './scenario_picker'
import {ReportScheme, InputResult} from '../entities/report'
import useSWRImmutable from 'swr/immutable'
import ReportFilters from './filter'
import filterReports from '../services/filter'
import ReportChart from './chart'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const LATEST_REPORT_URL = 'https://app.guzun.dev/web_benchmark/reports/latest'

export default function ReportPage() {
  const {data, error} = useSWRImmutable<InputResult, string>(
    LATEST_REPORT_URL,
    fetcher,
  )

  const [testName, setTestName] = React.useState('')
  const {filterState, filterElement} = ReportFilters()

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading tests...</div>

  const parsedData = new ReportScheme(data)

  const testNames = parsedData.results.map((result) => result.testName)
  const uniqueTestNames = new Set<string>(testNames)
  if (testName === '' && parsedData.results.length > 0) {
    setTestName(parsedData.results[0].testName)
  } else {
    console.error('parsedData.results is empty or undefined')
  }

  const filteredReports = filterReports(parsedData, filterState, testName)

  return (
    <>
      <h1 className="py-8 text-2xl text-center">Webservers bench</h1>

      <div className="mx-auto px-4 sm:px-6 md:px-8 inline-block justify-center">
        <div className="grid grid-rows-2 grid-flow-col gap-4 pl-8 min-h-min">
          <ul className="row-span-3 min-w-min px-4 py-2 bg-slate-800 rounded-lg max-h-96">
            <li>
              <ScenarioSet
                uniqueTestNames={uniqueTestNames}
                setTestName={setTestName}
                testName={testName}
              />
            </li>
            {filterElement}
          </ul>

          <div className="col-span-2 px-4 py-8 sm:px-8 bg-slate-800 rounded-lg inline-block overflow-auto">
            <ReportTable data={filteredReports} />
          </div>

          <div className="row-span-2 col-span-2 px-4 py-8 sm:px-8 bg-slate-800 rounded-lg inline-block max-h-96">
            <ReportChart data={filteredReports} />
          </div>
        </div>
      </div>
    </>
  )
}
