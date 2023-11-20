import axios from "axios";
import { ReportScheme } from "../entities/report";

export default function fetchReports() {
  return axios
    .get("https://app.guzun.dev/web_benchmark/reports/latest")
    .then((response) => {
      console.log("2. server response:" + response.data);
      return response.data;
    });
}
