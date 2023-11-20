"use client";

import React, { PureComponent } from 'react';
import ReportTable from "./table";
import ScenarioSet from "./scenario_picker";
import { ReportScheme, InputResult } from "../entities/report";
import { OrmOption } from "../entities/filter";
import useSWRImmutable from "swr/immutable";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LATEST_REPORT_URL = "https://app.guzun.dev/web_benchmark/reports/latest";

function useInput() {
  const [value, setValue] = React.useState("");
  const input = (
    <input
      className="rounded-md pb-1 bg-slate-700"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    />
  );
  return [value, input];
}

function useOrmFilter() {
  const [value, setValue] = React.useState(OrmOption.All);
  const input = (
    <select
      id="orm"
      className="rounded-md pb-1 bg-slate-700"
      onChange={(e) => setValue(e.target.value as OrmOption)}
    >
      <option key={OrmOption.All} value={OrmOption.All}>
        All
      </option>
      <option key={OrmOption.UseOrm} value={OrmOption.UseOrm}>
        ORM
      </option>
      <option key={OrmOption.WithoutOrm} value={OrmOption.WithoutOrm}>
        No ORM
      </option>
    </select>
  );
  return [value, input];
}

export default function ReportPage() {
  const { data, error } = useSWRImmutable<InputResult, string>(
    LATEST_REPORT_URL,
    fetcher,
  );

  const [testName, setTestName] = React.useState("");
  const [webserverName, webserverNameInput] = useInput();
  const [language, languageInput] = useInput();
  const [database, databaseInput] = useInput();
  const [orm, ormFilter] = useOrmFilter();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading tests...</div>;

  const parsedData = new ReportScheme(data);

  const testNames = parsedData.results.map((result) => result.testName);
  const uniqueTestNames = new Set<string>(testNames);
  if (testName === "" && parsedData.results.length > 0) {
    setTestName(parsedData.results[0].testName);
  } else {
    console.error("parsedData.results is empty or undefined");
  }

  const filteredReports = parsedData.results
    .filter((result, _) => result.testName === testName)
    .filter((result, _) =>
      webserverName !== ""
        ? result.webserverName.includes(webserverName)
        : true,
    )
    .filter((result, _) =>
      language !== "" ? result.language.includes(language) : true,
    )
    .filter((result, _) =>
      database !== ""
        ? result.database && result.database.includes(database)
        : true,
    )
    .filter((result) => {
      if (orm === OrmOption.UseOrm) {
        return result.orm != null;
      } else if (orm === OrmOption.WithoutOrm) {
        return result.orm === null;
      }
      return true;
    })
    .sort((a, b) => b.requestsPerSecond - a.requestsPerSecond);

  return (
    <>
      <h1 className="py-8 text-2xl text-center">Webservers bench</h1>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="grid grid-rows-2 grid-flow-col gap-4 pl-8">
          <ul className="row-span-3 auto-cols-min max-w-xs bg-slate-800 rounded-lg px-4 py-2">
            <li>
              <ScenarioSet
                uniqueTestNames={uniqueTestNames}
                setTestName={setTestName}
              />
            </li>

            <li>
              <label>
                webserver name: <br />
                {webserverNameInput}
              </label>
            </li>
            <li>
              <label>
                language: <br />
                {languageInput}
              </label>
            </li>
            <li>
              <label>
                database: <br />
                {databaseInput}
              </label>
            </li>
            <li>

              <label>
                orm: <br />
                {ormFilter}
              </label>
            </li>
          </ul>

          <div className="w-auto col-span-2">
            <ReportTable
              data={filteredReports}
            />
          </div>

          <div className="row-span-2 col-span-2 px-4 py-8 sm:px-8 bg-slate-800 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={filteredReports}>
                <XAxis dataKey="webserverName" tick={{ fill: 'white' }} />
                <YAxis tick={{ fill: 'white' }}/>
                <Bar dataKey="requestsPerSecond" fill="#475569" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </>
  );
}
