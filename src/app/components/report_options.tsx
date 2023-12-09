'use client'

import {ReportOption} from '../entities/report'

export const ReportOptions = ({
  reportsOptions,
  reportFileName,
  setReportFileName,
}: {
  reportsOptions: ReportOption[]
  reportFileName: string
  setReportFileName: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <ul className="row-span-5 min-w-min px-4 py-2 my-3 bg-slate-800 rounded-lg max-h-min">
      Previous reports:
      {reportsOptions?.map((reportOption) => (
        <li className="ml-1 font-mono" key={reportOption.name}>
          <a
            key={reportOption.name}
            className={
              reportFileName === reportOption.name
                ? 'text-blue-600 dark:text-blue-500 hover:underline'
                : 'dark:text-blue-100 hover:underline'
            }
            onClick={() => setReportFileName(reportOption.name)}
            target="_blank"
            rel="noreferrer"
          >
            {reportOption.is_latest
              ? reportOption.mtime.toDateString() + ' (latest)'
              : reportOption.mtime.toDateString()}
          </a>
        </li>
      ))}
    </ul>
  )
}
