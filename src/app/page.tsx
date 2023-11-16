import ReportTable from './components/table';
import TestNamesSet from './components/test_picker';
import fetchReports from './services/report_service';


import { useState } from 'react';

export default async function Home() {
  const result = await fetchReports();
  // const [pickedTest, setPickedTest] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <TestNamesSet data={result.data} />

      <div className="relative flex place-items-center">
        <ReportTable data={result.data} />
      </div>

    </main>
  )
}
