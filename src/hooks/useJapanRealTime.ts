import { useCallback, useState } from "react";
import { format } from "date-fns";

export const useCalcTime = () => {
  const [today, setToday] = useState<string>("");
  const [nowTime, setNowTime] = useState<string>("");

  const getRealTime = useCallback(() => {
    let nowDate = new Date();
    const formatString = format(nowDate, "yyyy/MM/dd E-HH:mm:ss");
    const nowDateArray = formatString.split("-");
    setToday(nowDateArray[0]);
    setNowTime(nowDateArray[1]);
  }, []);
  return { today, nowTime, getRealTime };
};
