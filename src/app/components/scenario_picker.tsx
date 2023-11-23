'use client'

export default function ScenarioSet({
  uniqueTestNames,
  setTestName,
}: {
  uniqueTestNames: Set<string>
  setTestName: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div>
      Scenarios:
      <ul>
        {Array.from(uniqueTestNames).map((tn: string) => (
          <div className="pb-1" key={tn}>
            <li
              className="bg-slate-700 rounded-md hover:bg-slate-500 active:bg-blue-600 focus:ring-2 focus:ring-slate-300"
              onClick={() => setTestName(tn)}
            >
              <div className="pl-3">{tn}</div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}
