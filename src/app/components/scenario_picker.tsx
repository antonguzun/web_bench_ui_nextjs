'use client'

const getClassName = (testName: string, tn: string) => {
  if (testName === tn) {
    return 'bg-blue-700 rounded-md hover:bg-blue-600 active:bg-blue-600 focus:ring-2 focus:ring-slate-300 '
  } else {
    return 'bg-slate-700 rounded-md hover:bg-slate-500 active:bg-blue-600 focus:ring-2 focus:ring-slate-300'
  }
}

export default function ScenarioSet({
  uniqueTestNames,
  setTestName,
  testName,
}: {
  uniqueTestNames: Set<string>
  setTestName: React.Dispatch<React.SetStateAction<string>>
  testName: string
}) {
  return (
    <div>
      Scenarios:
      <ul>
        {Array.from(uniqueTestNames).map((tn: string) => (
          <div className="pb-1" key={tn}>
            <li
              className={getClassName(testName, tn)}
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
