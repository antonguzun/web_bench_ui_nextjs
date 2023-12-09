'use client'

import {Report} from '../entities/report'

export default function ReportTable({
  data,
  hoverRow,
  setHoverRow,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <table className="md:table-auto border-collapse">
      <thead>
        <tr>
          <th className="p-1">Server</th>
          <th>Lang</th>
          <th>Database</th>
          <th>ORM</th>
          <th>RPS</th>
          <th className="p-1">Latency p50</th>
          <th className="p-1">Latency p75</th>
          <th className="p-1">Latency p90</th>
          <th className="p-1">Latency p99</th>
          <th className="p-1">CPU, %</th>
          <th className="p-1">Memo, MB</th>
          <th className="p-1">KB / req</th>
          <th className="p-1">CPU / req</th>
          <th className="px-1">Source</th>
        </tr>
      </thead>
      <tbody>
        {data.map((result, index) => (
          <tr
            key={index}
            className={result.id === hoverRow ? 'bg-slate-600' : ''}
            onMouseEnter={() => setHoverRow(result.id)}
            onMouseLeave={() => setHoverRow(-1)}
          >
            <td className="text-center">{result.webserverName}</td>
            <td className="text-center" color={result.color}>{result.language}</td>
            <td className="text-center">{result.database || '-'}</td>
            <td className="text-center">{result.orm || '-'}</td>
            <td className="tabular-nums text-right m-2">
              {result.requestsPerSecond.toFixed(0)}
            </td>
            <td className="tabular-nums text-right">
              {result.latencyP50__ms.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {result.latencyP75__ms.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {result.latencyP90__ms.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {result.latencyP99__ms.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {result.monitoring_result.mean_cpu_usage.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {result.monitoring_result.mean_memory_usage.toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {(
                (result.monitoring_result.mean_memory_usage /
                  result.requestsPerSecond) *
                1024
              ).toFixed(2)}
            </td>
            <td className="tabular-nums text-right">
              {(
                (result.monitoring_result.mean_cpu_usage /
                  result.requestsPerSecond) *
                1024
              ).toFixed(2)}
            </td>
            <td className="text-center">
              <a
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href={result.source}
                target="_blank"
                rel="noreferrer"
              >
                Link
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
