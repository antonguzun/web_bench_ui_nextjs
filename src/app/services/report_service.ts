import axios from "axios";
import { ReportScheme } from "../entities.ts/report";


export default async function fetchReports() {
    const res = await axios.get('https://app.guzun.dev/web_benchmark/reports/latest');
    const data: ReportScheme = res.data;
    return { data };
}