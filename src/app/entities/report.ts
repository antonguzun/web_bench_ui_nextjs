export interface InputResult {
  created_at: Date
  results: InputReport[]
}

interface InputReport {
  monitoring_result: any  // @typescript-eslint/no-explicit-any
  bench_options: any
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
  source: string
}

export class ReportScheme {
  created_at: Date
  results: Report[]

  constructor(data: InputResult) {
    this.created_at = data.created_at
    let cnt = 1
    this.results = data.results.map((report) => {
      cnt += 1
      return new Report(report, cnt)
    })
  }
}

class BenchOptions {
  run_server_command: string
  build_server_command: string
  wrk_command: string

  constructor(options: any) {
    this.run_server_command = options.concurrency
    this.build_server_command = options.duration
    this.wrk_command = options.pipeline
  }
}

class Point {
  time: number
  cpu_usage: number
  memory_usage: number

  constructor(point: any) {
    this.time = point.t
    this.cpu_usage = point.cu
    this.memory_usage = point.mu
  }
}
class MonitoringResult {
  mean_cpu_usage: number
  mean_memory_usage: number
  points: Point[]

  constructor(data: any) {
    this.mean_cpu_usage = data.mean_cpu_usage
    this.mean_memory_usage = data.mean_memory_usage
    this.points = data.points.map((point: any) => new Point(point))
  }
}

export class Report {
  id: number
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
  source: string
  monitoring_result: MonitoringResult
  bench_options: BenchOptions
  color: string

  constructor(rawReport: InputReport, id: number) {
    this.id = id
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
    this.source = rawReport.source
    console.log('constructor')
    this.monitoring_result = new MonitoringResult(rawReport.monitoring_result)
    this.bench_options = new BenchOptions(rawReport.bench_options)
    this.color = langToColor(this.language)
  }
}

function langToColor(lang: string) {
  switch (lang) {
    case 'rust':
      return '#dea584'
    case 'go':
      return '#6ad1e3'
    case 'python':
      return '#3572A5'
    // case 'Node.js':
    //   return '#e36a6a'
    // case 'Ruby':
    //   return '#e36a6a'
    // case 'PHP':
    //   return '#e36a6a'
    default:
      return '#94a3b8'
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

export interface ReportOptionInterface {
  // name: 2023-05-12.json or latest
  name: string
  type: string
  // mtime: Fri, 23 Jun 2023
  mtime: string
  size: number
}

export class ReportOption {
  name: string
  type: string
  mtime: Date
  size: number
  is_latest: boolean

  constructor(ro: ReportOptionInterface) {
    this.name = ro.name
    this.type = ro.type

    if (ro.name === 'latest') {
      this.mtime = new Date(ro.mtime)
    } else {
      this.mtime = new Date(ro.name.split('.')[0])
    }

    this.size = ro.size
    this.is_latest = ro.name === 'latest'
  }
}
