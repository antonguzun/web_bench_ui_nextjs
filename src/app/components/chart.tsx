"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Report } from "../entities/report";

export default function ReportChart({ data }: { data: Report[] }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="webserverName" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Bar dataKey="requestsPerSecond" fill="#475569" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
