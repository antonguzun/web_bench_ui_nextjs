export interface InputResult {
  created_at: Date
  results: InputReport[]
}

interface InputReport {
  test_name: string
  webserver_name: string
  language: string
  database: string | null
  orm: string | null
  requests_per_second: number
  latency_p50: string
  latency_p75: string
  latency_p90: string
  latency_p99: string
}

export class ReportScheme {
  created_at: Date
  results: Report[]

  constructor(data: InputResult) {
    this.created_at = data.created_at
    this.results = data.results.map((report) => {
      return new Report(report)
    })
  }
}

export class Report {
  testName: string
  webserverName: string
  language: string
  database: string | null
  orm: string | null
  requestsPerSecond: number
  latencyP50__ms: number
  latencyP75__ms: number
  latencyP90__ms: number
  latencyP99__ms: number

  constructor(rawReport: InputReport) {
    this.testName = rawReport.test_name
    this.webserverName = rawReport.webserver_name
    this.language = rawReport.language
    this.database = rawReport.database
    this.orm = rawReport.orm
    this.requestsPerSecond = rawReport.requests_per_second
    this.latencyP50__ms = parseLatency(rawReport.latency_p50)
    this.latencyP75__ms = parseLatency(rawReport.latency_p75)
    this.latencyP90__ms = parseLatency(rawReport.latency_p90)
    this.latencyP99__ms = parseLatency(rawReport.latency_p99)
  }
}

function parseLatency(latency: string): number {
  try {
    if (latency.includes('ms')) {
      return parseFloat(latency.replace('ms', '').trim())
    } else if (latency.includes('us')) {
      return parseFloat(latency.replace('us', '').trim()) / 1000
    } else {
      return parseFloat(latency.trim())
    }
  } catch (error) {
    console.error('Error parsing latency:', error)
    return -1
  }
}
