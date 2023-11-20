"use client";

export default function ScenarioSet({
  uniqueTestNames,
  setTestName,
}: {
  uniqueTestNames: Set<string>;
  setTestName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-row pb-2 pt-2">
      {Array.from(uniqueTestNames).map((tn: string) => (
        <div className="flex-auto pb-2" key={tn}>
          <button
            className="h-14 bg-slate-700 mr-4 pr-6 pl-6 rounded hover:bg-slate-500 active:bg-slate-500 focus:ring focus:ring-black-300"
            onClick={() => setTestName(tn)}
          >
            {tn}
          </button>
        </div>
      ))}
    </div>
  );
}
