"use client";

import React from "react";
import ReportTable from "./table";
import ScenarioSet from "./scenario_picker";
import { ReportScheme, InputResult } from "../entities/report";
import { OrmOption } from "../entities/filter";
import useSWRImmutable from "swr/immutable";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LATEST_REPORT_URL = "https://app.guzun.dev/web_benchmark/reports/latest";

function useInput() {
  const [value, setValue] = React.useState("");
  const input = (
    <input
      className="rounded pb-1 bg-slate-700"
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
      className="rounded pb-1 bg-slate-700"
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

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="grid grid-cols-1 gap-2">
        <label>
          webserver name: <br />
          {webserverNameInput}
        </label>
        <label>
          language: <br />
          {languageInput}
        </label>
        <label>
          database: <br />
          {databaseInput}
        </label>
        <label>
          orm: <br />
          {ormFilter}
        </label>
      </div>
      <ScenarioSet
        uniqueTestNames={uniqueTestNames}
        setTestName={setTestName}
      />
      <ReportTable
        data={parsedData}
        testName={testName}
        webserverName={webserverName}
        database={database}
        language={language}
        orm={orm}
      />
    </div>
  );
}
