import { ReportScheme } from "../entities.ts/report";


export default async function ReportTable({ data, pickedTestName }: { data: ReportScheme, pickedTestName: string }) {
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
                    {data.results.filter((result, _) => result.test_name === pickedTestName).map((result, index) => (
                        <tr key={index}>
                            <td>{result.webserver_name}</td>
                            <td>{result.language}</td>
                            <td>{result.database || '-'}</td>
                            <td>{result.orm || '-'}</td>
                            <td>{result.requests_per_second}</td>
                            <td>{result.latency_p50}</td>
                            <td>{result.latency_p75}</td>
                            <td>{result.latency_p90}</td>
                            <td>{result.latency_p99}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}