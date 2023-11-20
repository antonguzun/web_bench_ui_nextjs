"use client"

import { ReportScheme } from "../entities/report";


export default function ReportTable({ data, testName,
    webserverName, database, language, orm }:
    {
        data: ReportScheme, testName: string,
        webserverName: string, database: string, language: string, orm: boolean
    }) {
    return (
        <div className="relative flex place-items-center">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Webserver Name</th>
                        <th>Language</th>
                        <th>Database</th>
                        <th>ORM</th>
                        <th>Requests per Second</th>
                        <th>Latency p50</th>
                        <th>Latency p75</th>
                        <th>Latency p90</th>
                        <th>Latency p99</th>
                    </tr>
                </thead>
                <tbody>
                    {data.results
                        .filter((result, _) => result.testName === testName)
                        .filter((result, _) => webserverName !== "" ? result.webserverName.includes(webserverName) : true)
                        .filter((result, _) => language !== "" ? result.language.includes(language) : true)
                        .filter((result, _) => database !== "" ? (result.database && result.database.includes(database)) : true)
                        // .filter((result, _) => orm === false ? orm: true)
                        .sort((a, b) => b.requestsPerSecond - a.requestsPerSecond)
                        .map((result, index) => (
                            <tr key={index}>
                                <td>{result.webserverName}</td>
                                <td>{result.language}</td>
                                <td>{result.database || '-'}</td>
                                <td className="tabular-nums text-center">{result.orm || '-'}</td>
                                <td className="tabular-nums text-right">{result.requestsPerSecond.toFixed(0)}</td>
                                <td className="tabular-nums text-right">{result.latencyP50__ms.toFixed(2)}</td>
                                <td className="tabular-nums text-right">{result.latencyP75__ms.toFixed(2)}</td>
                                <td className="tabular-nums text-right">{result.latencyP90__ms.toFixed(2)}</td>
                                <td className="tabular-nums text-right">{result.latencyP99__ms.toFixed(2)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}