'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { Report } from '../entities/report'

export default function ReportChart(
  { data, hoverRow, setHoverRow }:
    {
      data: Report[],
      hoverRow: number,
      setHoverRow: React.Dispatch<React.SetStateAction<number>>
    }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={100} height={100} data={data}>
          <CartesianGrid strokeDasharray="4 4" fill="black" vertical={false} fillOpacity={0.1} />
          <XAxis dataKey="webserverName" angle={-30} height={75}
            textAnchor="end" tick={{ fill: 'white' }} />
          <YAxis height={70} tick={{ fill: 'white' }} />
          <Bar isAnimationActive={false} dataKey="requestsPerSecond">
            {
              data.map((entry, _) => (
                <Cell key={`cell-${entry.id}`} fill={entry.id === hoverRow ? "#94a3b8" : "#455569"}
                  onMouseEnter={() => setHoverRow(entry.id)}
                  onMouseLeave={() => setHoverRow(-1)}
                />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
