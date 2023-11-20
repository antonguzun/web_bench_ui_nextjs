"use client"

export default function TestNamesSet({
    uniqueTestNames,
    setTestName,
}: {
    uniqueTestNames: Set<string>;
    setTestName: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="flex flex-row pb-3 pt-3">
            {Array.from(uniqueTestNames).map((tn: string) => (
                <div className="flex-auto pb-3" key={tn}>
                    <button
                        className="h-14 bg-gradient-to-r from-cyan-700 to-blue-700 mr-4 pr-6 pl-6 rounded hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-black-300"
                        onClick={() => setTestName(tn)}
                    >
                        {tn}
                    </button>
                </div>
            ))}
        </div>
    );
}