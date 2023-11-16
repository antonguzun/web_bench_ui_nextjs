"use client"

import React, { useEffect } from 'react';
import { Suspense } from 'react';
import ReportTable from './components/table';
import TestNamesSet from './components/test_picker';
import { ReportScheme } from "./entities.ts/report";
import useSWRImmutable from 'swr/immutable';


const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Home() {
  const { data, error } = useSWRImmutable<ReportScheme, string>('https://app.guzun.dev/web_benchmark/reports/latest', fetcher)
  const [testName, setTestName] = React.useState('');

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading tests...</div>

  if (testName === '' && data.results.length > 0) {
    setTestName(data.results[0].test_name);
  }
  // console.log(testName);

  const testNames = data.results.map((result) => result.test_name);
  const uniqueTestNames = new Set<string>(testNames);

  // console.log(uniqueTestNames);

  return (
    <Suspense fallback={<p>Loading tests...</p>}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        {/* <TestNamesSet data={data} /> */}
        <div className="flex flex-row">
            {
                Array.from(uniqueTestNames).map((tn: string) => (
                    <div className='flex-auto pb-3' key={tn}>
                        <button
                            className="h-14 bg-gradient-to-r from-cyan-700 to-blue-700 mr-4 pr-6 pl-6 rounded hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-black-300"
                            onClick={() => setTestName(tn)}
                        >{tn}</button>
                    </div>
                ))
            }
        </div>

        <div className="relative flex place-items-center">
          <ReportTable data={data} pickedTestName={testName} />
        </div>
      </main>
    </Suspense>
  )
}
