export interface ReportScheme {
    created_at: Date;
    results: Report[];
}

export interface Report {
    test_name: string;
    webserver_name: string;
    language: string;
    database: string | null;
    orm: string | null;
    requests_per_second: number;
    latency_p50: string;
    latency_p75: string;
    latency_p90: string;
    latency_p99: string;
}