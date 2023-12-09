'use client'

import React from 'react'
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
            // barCategoryGap={200}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="4 4"
              // fill="black"
              horizontal={false}
              // fillOpacity={0.1}
            />
            <YAxis
              type="category"
              dataKey="webserverName"
              // angle={-30}
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

export function RenderMemChart({
  data,
  hoverRow,
  setHoverRow,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <ResourceConsumptionChart
      data={data}
      hoverRow={hoverRow}
      setHoverRow={setHoverRow}
      dataKey="memory_usage"
      header="Memory consumption, MB"
    />
  )
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
  return (
    <ResourceConsumptionChart
      data={data}
      hoverRow={hoverRow}
      setHoverRow={setHoverRow}
      dataKey="cpu_usage"
      header="CPU consumption, %"
    />
  )
}

function ResourceConsumptionChart({
  data,
  hoverRow,
  setHoverRow,
  dataKey,
  header,
}: {
  data: Report[]
  hoverRow: number
  setHoverRow: React.Dispatch<React.SetStateAction<number>>
  dataKey: string
  header: string
}) {
  if (data.length === 0) {
    return <div>No data</div>
  }

  const lines = data.map((result, _) => (
    <Line
      id={result.id.toString()}
      dot={false}
      data={result.monitoring_result.points}
      dataKey={dataKey}
      stroke={result.color}
      strokeWidth={1}
      onMouseEnter={() => setHoverRow(result.id)}
      onMouseLeave={() => setHoverRow(-1)}
      isAnimationActive={false}
    />
  ))

  const hoveredReport = data.find((result) => result.id === hoverRow)
  // const hoveredReport = null
  let hoveredLine = <></>
  if (!hoveredReport) {
    ;<></>
  } else {
    hoveredLine = (
      <Line
        id={hoveredReport.id.toString()}
        dot={false}
        data={hoveredReport.monitoring_result.points}
        dataKey={dataKey}
        stroke={hoveredReport.color}
        strokeWidth={3}
        onMouseEnter={() => setHoverRow(hoveredReport.id)}
        onMouseLeave={() => setHoverRow(-1)}
        isAnimationActive={false}
      />
    )
  }
  return (
    <>
      <div className="max-w-min">
        <h3 className="text-center">{header}</h3>
        {/* <ResponsiveContainer width='99%' height={300}> */}
        <LineChart width={900} height={300}>
          {lines}
          {hoveredLine}
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

          <CartesianGrid
            strokeDasharray="4 4"
            // fill="black"
            vertical={false}
            // fillOpacity={0.1}
          />

          <YAxis tick={{fill: 'white'}} />
        </LineChart>
        {/* </ResponsiveContainer> */}
      </div>
    </>
  )
}
