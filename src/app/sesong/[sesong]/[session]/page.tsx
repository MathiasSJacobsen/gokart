import { PersonalStat } from "@/components/PersonalStat";
import {
  formatSessionToChartData,
  getSessionData,
  getTeamFastestLap,
  transformLapData,
} from "@/lib/sessions";

export default function Session({
  params,
}: {
  params: { sesong: string; session: string };
}) {
  const { sesong, session } = params;
  const data = transformLapData(
    getSessionData(Number(sesong), Number(session))
  );
  const bestTeamLap = getTeamFastestLap(data);

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Sesong {sesong}</h1>
        <h2 className="font-semibold text-xl">Løp {session}</h2>
      </div>
      <div className="p-3 rounded-lg bg-light lg:w-1/3">
        <p>{`Beste rundetid: ${bestTeamLap.name} \u2014  ${bestTeamLap.time}`}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-7 ">
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
}
