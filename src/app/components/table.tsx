"use client";

import { OrmOption } from "../entities/filter";
import { ReportScheme } from "../entities/report";

export default function ReportTable({
  data,
  testName,
  webserverName,
  database,
  language,
  orm,
}: {
  data: ReportScheme;
  testName: string;
  webserverName: string;
  database: string;
  language: string;
  orm: string;
}) {
  return (
    <div className="relative flex place-items-center">
      <table className="border-collapse border border-slate-500">
        <thead>
          <tr>
            <th>Webserver</th>
            <th>Language</th>
            <th>Database</th>
            <th>ORM</th>
            <th>RPS</th>
            <th>Latency p50</th>
            <th>Latency p75</th>
            <th>Latency p90</th>
            <th>Latency p99</th>
          </tr>
        </thead>
        <tbody>
          {data.results
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
            .sort((a, b) => b.requestsPerSecond - a.requestsPerSecond)
            .map((result, index) => (
              <tr key={index}>
                <td className="border border-slate-500 bg-gray-900 text-center">
                  {result.webserverName}
                </td>
                <td className="border border-slate-500 bg-gray-900 text-center">{result.language}</td>
                <td className="border border-slate-500 bg-gray-900 text-center">{result.database || "-"}</td>
                <td className="border border-slate-500 bg-gray-900 text-center">
                  {result.orm || "-"}
                </td>
                <td className="border border-slate-500 bg-gray-900 tabular-nums text-right">
                  {result.requestsPerSecond.toFixed(0)}
                </td>
                <td className="border border-slate-500 bg-gray-900 tabular-nums text-right">
                  {result.latencyP50__ms.toFixed(2)}
                </td>
                <td className="border border-slate-500 bg-gray-900 tabular-nums text-right">
                  {result.latencyP75__ms.toFixed(2)}
                </td>
                <td className="border border-slate-500 bg-gray-900 tabular-nums text-right">
                  {result.latencyP90__ms.toFixed(2)}
                </td>
                <td className="border border-slate-500 bg-gray-900 tabular-nums text-right">
                  {result.latencyP99__ms.toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
