"use client"

import React from 'react';
import ReportTable from './table';
import TestNamesSet from './scenario_picker';
import { ReportScheme, InputResult } from "../entities/report";
import useSWRImmutable from 'swr/immutable';


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const LATEST_REPORT_URL = 'https://app.guzun.dev/web_benchmark/reports/latest';

function useInput() {
    const [value, setValue] = React.useState("");
    const input = <input className="pb-1 bg-gray-700" value={value} onChange={e => setValue(e.target.value)} type="text" />;
    return [value, input];
}

export default function ReportPage() {
    const { data, error } = useSWRImmutable<InputResult, string>(LATEST_REPORT_URL, fetcher)

    const [testName, setTestName] = React.useState('');
    const [webserverName, webserverNameInput] = useInput();
    const [language, languageInput] = useInput();
    const [database, databaseInput] = useInput();
    const [orm, ormInput] = useInput();

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading tests...</div>
    const parsedData = new ReportScheme(data);

    const testNames = parsedData.results.map((result) => result.testName);
    const uniqueTestNames = new Set<string>(testNames);
    if (testName === '' && parsedData.results.length > 0) {
        setTestName(parsedData.results[0].testName);
    }

    return (
        <div className="flex min-h-screen flex-col items-center">
            webserver name:
            {webserverNameInput} <br />
            language:
            {languageInput} <br />
            database:
            {databaseInput} <br />
            orm:
            {ormInput} <br />

            <TestNamesSet uniqueTestNames={uniqueTestNames} setTestName={setTestName} />
            {/* <Filters setWebserverName={setWebserverName} setDatabase={setDatabase} setLanguage={setLanguage} setOrm={setOrm} /> */}

            <ReportTable data={parsedData} testName={testName} webserverName={webserverName} database={database} language={language} orm={orm} />

        </div>
    )
}