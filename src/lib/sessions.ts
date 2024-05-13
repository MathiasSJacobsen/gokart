import dbOne from "./data/seasonOne/sessionOne.json";
import dbTwo from "./data/seasonOne/sessionTwo.json";
import dbThree from "./data/seasonOne/sessionThree.json";
import dbSeven from "./data/seasonOne/sessionSeven.json";
import dbEight from "./data/seasonOne/sessionEight.json";
import dbNine from "./data/seasonOne/sessionNine.json";

import S2S1 from "./data/seasonTwo/sessionOne.json";
import S2S2 from "./data/seasonTwo/sessionTwo.json";
import S2S3 from "./data/seasonTwo/sessionThree.json";

export const formatSessionToChartData = (data: {
  [key: number]: number[][];
}) => {
  const _points: number[][][] = [];

  Object.keys(data).forEach((key: string) => {
    data[parseInt(key)].forEach((heat, sess) => {
      heat.forEach((lap, lap_index) => {
        if (_points.length === lap_index) {
          _points.push([]);
        }
        _points[lap_index].push([lap, sess]);
      });
    });
  });

  const points = _points.map((p, i) => {
    let obj: any = {};
    obj["name"] = `LAP_${i}`;

    let counter = 1;
    let temp = 0;
    let prev: number | null = null;
    p.forEach((v, j) => {
      if (prev && prev !== v[1] && temp === 1) {
        counter += 1;
        temp = 0;
      }

      obj[`heat${counter}`] = v[0];

      temp += 1;
      if (temp === 2) {
        temp = 0;
      }
      prev = v[1];
      counter += 1;
    });
    return obj;
  });
  return points as Point[];
};

export const getSessionData = (season?: number, session?: number) => {
  switch (season) {
    case 1:
      return getSessionSeasonOne(session);
    case 2:
      return getSessionSeasonTwo(session);
    default:
      return [...getSessionSeasonOne(), ...getSessionSeasonTwo()];
  }
};

/**
 * Get database
 * @param session session number
 * @returns Returns the spesified session database, if none is given then returns all session data as a database
 */
export const getSessionSeasonOne = (session?: number) => {
  switch (session) {
    case 1:
      return dbOne;
    case 2:
      return dbTwo;
    case 3:
      return dbThree;
    case 7:
      return dbSeven;
    case 8:
      return dbEight;
    case 9:
      return dbNine;
    default:
      return [
        ...dbOne,
        ...dbTwo,
        ...dbThree,
        ...dbSeven,
        ...dbEight,
        ...dbNine,
      ];
  }
};

export const getSessionSeasonTwo = (session?: number) => {
  switch (session) {
    case 1:
      return S2S1;
    case 2:
      return S2S2;
    case 3:
      return S2S3;
    default:
      return [...S2S1, ...S2S2, ...S2S3];
  }
};

export const getDateMap = (): { [key: string]: number } => {
  return {
    "21/3/23": 0,
    "25/4/23": 1,
    "23/5/23": 2,
    "06/9/23": 7,
    "10/10/23": 8,
    "17/10/23": 9,
    "2/5/23": 99, // utfordringen
    "12/3/24": 10,
    "2/4/24": 11,
    "7/5/24": 12,
  };
};

export function transformLapData(data: SessionDBData[]) {
  const dateMap = getDateMap();
  const result2: Res = {};
  data.forEach((item) => {
    const { name, date, laps } = item;

    if (!result2.hasOwnProperty(name)) {
      result2[name] = {};
    }

    if (!result2[name].hasOwnProperty(dateMap[date])) {
      result2[name][dateMap[date]] = [];
    }

    result2[name][dateMap[date]].push(laps.map(mapLapTimeToNumber));
  });

  return result2;
}
export const mapLapTimeToNumber = (lapTime: string) => {
  if (lapTime.length < 7) {
    return Number(lapTime);
  } else {
    const [min, sec, ms] = lapTime.split(".").map(Number);
    return Number(`${min * 60 + sec}.${ms}`);
  }
};

export const getTeamFastestLap = (data: Res) => {
  let best: { time: number; name: string } = { name: "Null", time: 10000 };
  Object.keys(data).forEach((element) => {
    Object.keys(data[element]).forEach((e) =>
      data[element][parseInt(e)].forEach((arr) =>
        arr.forEach((nr) => {
          if (best === undefined || best.time > nr) {
            best.name = element;
            best.time = nr;
          }
        })
      )
    );
  });
  return best;
};

export const getAverageHeatLapTime = (laps: number[]) => {
  const lapsWithoutPitstop = laps.filter((val, idx) => idx !== 0 || val < 60);
  return (
    lapsWithoutPitstop.reduce((pre, val) => pre + val, 0) /
    lapsWithoutPitstop.length
  );
};

export type SessionDBData = {
  date: string;
  name: string;
  laps: string[];
};

export type Res = {
  [key: string]: {
    [key: number]: number[][];
  };
};

export interface Point {
  name: string;
  heat1: number;
  heat2: number;
}
