import { ReportScheme } from "../entities.ts/report";


export default function TestNamesSet({ data }: { data: ReportScheme }, { callback }) {
    const test_names = data.results.map((result) => result.test_name);
    const unique_test_names = new Set<string>(test_names);

    console.log(unique_test_names);
    return (
        <div className="flex flex-row">
            {
                Array.from(unique_test_names).map((test_name: string) => (
                    <div className='flex-auto pb-3' key={test_name}>
                        <button
                            className="h-14 bg-gradient-to-r from-cyan-700 to-blue-700 mr-4 pr-6 pl-6 rounded hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-black-300"
                            onClick={callback}
                        >{test_name}</button>
                    </div>
                ))
            }
        </div>
    )
}