"use client"

import { ReportScheme } from "../entities.ts/report";


export default async function ReportTable({ data, testName,
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
                        .sort((a, b) => b.requestsPerSecond - a.requestsPerSecond)
                        .map((result, index) => (
                            <tr key={index}>
                                <td>{result.webserverName}</td>
                                <td>{result.language}</td>
                                <td>{result.database || '-'}</td>
                                <td className="text-center">{result.orm || '-'}</td>
                                <td className="text-right">{result.requestsPerSecond}</td>
                                <td className="text-right">{result.latencyP50__ms.toFixed(2)}</td>
                                <td className="text-right">{result.latencyP75__ms.toFixed(2)}</td>
                                <td className="text-right">{result.latencyP90__ms.toFixed(2)}</td>
                                <td className="text-right">{result.latencyP99__ms.toFixed(2)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}