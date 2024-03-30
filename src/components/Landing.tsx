import {
  formatSessionToChartData,
  getSessionData,
  transformLapData,
} from "@/lib/sessions";
import { PersonalStat } from "./PersonalStat";

export const Landing = () => {
  const data = transformLapData(getSessionData());
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-5">Alle runder</h1>
      <div className="grid grid-cols-2 gap-7 w-full">
        {Object.keys(data).map((e: string) => (
          <PersonalStat
            key={e}
            name={e}
            data={formatSessionToChartData(data[e])}
          />
        ))}
      </div>
    </div>
  );
};
