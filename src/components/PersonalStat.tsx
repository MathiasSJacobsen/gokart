import { Point, getAverageHeatLapTime } from "@/lib/sessions";
import LineChart from "./LineChart";

export const PersonalStat = ({
  name,
  data,
}: {
  name: string;
  data: Point[];
}) => {
  const averageTimeHeat1 = getAverageHeatLapTime(
    data.map((e) => e.heat1)
  ).toFixed(3);
  const averageTimeHeat2 = getAverageHeatLapTime(
    data.map((e) => e.heat2).filter((e) => e)
  ).toFixed(3);

  return (
    <div className="flex flex-col p-6 lg:pr-14 rounded-lg gap-5 bg-light">
      <div className="flex flex-col lg:items-end">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <div className="flex w-full gap-10 justify-end  ">
          <div className="flex flex-col lg:items-end basis-1/2">
            <p className="text-sm text-[#241D2E]">
              Beste rundetid heat 1: {data.map((e) => e.heat1).sort()[0]}
            </p>
            <p className="text-sm text-[#241D2E]">
              Gjennomsnittlig rundetid: {averageTimeHeat1}
            </p>
          </div>

          {data[0].heat2 && (
            <div className="flex flex-col lg:items-end basis-1/2">
              <p className="text-sm text-[#241D2E]">
                Beste rundetid heat 2: {data.map((e) => e.heat2).sort()[0]}
              </p>
              <p className="text-sm text-[#241D2E]">
                Gjennomsnittlig rundetid: {averageTimeHeat2}
              </p>
            </div>
          )}
        </div>
      </div>
      <LineChart data={data} />
    </div>
  );
};
