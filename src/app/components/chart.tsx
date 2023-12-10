'use client'

import React, {useMemo} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import {Report} from '../entities/report'

export function HorReportChart({
  data,
  hoverRow,
  setHoverRow,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
}) {
  if (data.length === 0) {
    return <div>No data</div>
  }
  return (
    <>
      <div>
        <h3 className="text-center">Requests per second</h3>

        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            width={100}
            height={100}
            data={data}
            barGap={105}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="4 4" horizontal={false} />
            <YAxis
              type="category"
              dataKey="webserverName"
              width={75}
              textAnchor="end"
              tick={{fill: 'white'}}
            />
            <XAxis height={75} tick={{fill: 'white'}} type="number" />
            <Bar
              isAnimationActive={false}
              dataKey="requestsPerSecond"
              maxBarSize={90}
              minPointSize={5}
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fillOpacity={
                    entry.id === hoverRow || hoverRow == -1 ? 1 : 0.3
                  }
                  fill={entry.color}
                  onMouseEnter={() => setHoverRow(entry.id)}
                  onMouseLeave={() => setHoverRow(-1)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

function roundYMax(value: number) {
  return Math.ceil(value * 1.1)
}

export function RenderMemChart({
  data,
  hoverRow,
  setHoverRow,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
}) {
  if (data.length === 0) {
    return <div>No data</div>
  }

  const len_of_points = data[0].monitoring_result.points.length
  const max_v = Math.max(
    ...data.map((res) =>
      roundYMax(res.monitoring_result.points[len_of_points % 2].memory_usage),
    ),
  )

  const res = useMemo(
    () => (
      <ResourceConsumptionChart
        data={data}
        hoverRow={hoverRow}
        setHoverRow={setHoverRow}
        dataKey="memory_usage"
        header="Memory consumption, MB"
        YMax={max_v}
      />
    ),
    [data, hoverRow],
  )
  return res
}

export function RenderCpuChart({
  data,
  hoverRow,
  setHoverRow,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
}) {
  if (data.length === 0) {
    return <div>No data</div>
  }

  const len_of_points = data[0].monitoring_result.points.length
  const max_v = Math.max(
    ...data.map((res) =>
      roundYMax(
        res.monitoring_result.points[len_of_points % 2].cpu_usage * 1.1,
      ),
    ),
  )

  const res = useMemo(
    () => (
      <ResourceConsumptionChart
        data={data}
        hoverRow={hoverRow}
        setHoverRow={setHoverRow}
        dataKey="cpu_usage"
        header="CPU consumption, %"
        YMax={max_v}
      />
    ),
    [data, hoverRow],
  )
  return res
}

function ResourceConsumptionChart({
  data,
  hoverRow,
  setHoverRow,
  dataKey,
  header,
  YMax,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
  dataKey: string
  header: string
  YMax: number
}) {
  if (data.length === 0) {
    return <div>No data</div>
  }

  console.log('dataKey', dataKey)
  const lines = data
    .filter((res) => (hoverRow === -1 ? true : res.id == hoverRow))
    .map((result) => (
      <Line
        key={result.id}
        id={result.id.toString()}
        dot={false}
        data={result.monitoring_result.points}
        dataKey={dataKey}
        stroke={result.color}
        // hide={hoverRow !== -1 && hoverRow !== result.id}
        strokeWidth={hoverRow === result.id ? 3 : 0.5}
        onMouseEnter={() => setHoverRow(result.id)}
        onMouseLeave={() => setHoverRow(-1)}
        isAnimationActive={false}
      />
    ))

  return (
    <>
      <div className="max-w-min">
        <h3 className="text-center">{header}</h3>
        <LineChart width={900} height={300}>
          {lines}
          <XAxis
            label={{
              value: 'Time, s',
              position: 'insideBottomLeft',
              fill: 'white',
            }}
            height={50}
            dataKey="time"
            type="number"
            textAnchor="end"
            tick={{fill: 'white'}}
          />

          <CartesianGrid strokeDasharray="4 4" vertical={false} />

          <YAxis tick={{fill: 'white'}} domain={[0, YMax]} />
        </LineChart>
      </div>
    </>
  )
}
