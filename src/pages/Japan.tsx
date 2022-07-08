import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useCalcTime } from "../hooks/useJapanRealTime";
import { styled } from "@mui/material/styles";
import type { WorldCountry } from "../types/WoldCountry";
import { subHours, format } from "date-fns";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import { Oval } from "@agney/react-loading";
import type { SunTime } from "../types/SunTime";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const Japan: FC = () => {
  // 日本時間(デフォルト)
  const { today, nowTime, getRealTime } = useCalcTime();
  // 日本の日の出時刻
  const [sunriseTime, setSunriseTime] = useState<string>("");
  // 日本の日の入り時刻
  const [sunsetTime, setSunsetTime] = useState<string>("");
  // カードの表示・非表示フラグ
  const [flag, setFlag] = useState<boolean>(true);
  // ローディングのフラグ
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  // 日本の一週間の日出没
  const [sunArray, setSunArray] = useState<SunTime[]>([]);
  // 日本以外の都市の一週間日出没
  const [sunArray2, setSunArray2] = useState<SunTime[]>([]);
  // セレクトボックスで選択された都市
  const [selectedCountry, setSelectedCountry] = useState<WorldCountry>({
    id: 0,
    name: "",
    timezone: "",
    latitude: 0,
    longitude: 0,
    timeDifference: 0,
    sunriseTime: 0,
    sunsetTime: 0,
    date: "",
    dateTime: "",
  });
  // 選択肢の都市
  const [countries, setCountries] = useState<WorldCountry[]>([
    {
      id: 1,
      name: "Chicago",
      timezone: "America",
      latitude: 41.881832,
      longitude: -87.623177,
      timeDifference: 14,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 2,
      name: "New_York",
      timezone: "America",
      latitude: 40.71,
      longitude: -74.01,
      timeDifference: 13,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 3,
      name: "Los_Angeles",
      timezone: "America",
      latitude: 34.05,
      longitude: -118.24,
      timeDifference: 16,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 4,
      name: "London",
      timezone: "Europe",
      latitude: 51.5002,
      longitude: -0.1262,
      timeDifference: 8,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 5,
      name: "Berlin",
      timezone: "Europe",
      latitude: 52.5235,
      longitude: 13.4115,
      timeDifference: 7,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 6,
      name: "Moscow",
      timezone: "Europe",
      latitude: 55.7558,
      longitude: 37.6176,
      timeDifference: 6,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 7,
      name: "Tokyo",
      timezone: "Asia",
      latitude: 35.6785,
      longitude: 139.6823,
      timeDifference: 0,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 8,
      name: "Singapore",
      timezone: "Asia",
      latitude: 1.2894,
      longitude: 103.85,
      timeDifference: 1,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 9,
      name: "Seoul",
      timezone: "Asia",
      latitude: 37.5139,
      longitude: 126.9828,
      timeDifference: 0,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 10,
      name: "Paris",
      timezone: "Europe",
      latitude: 48.8567,
      longitude: 2.351,
      timeDifference: 7,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 11,
      name: "Madrid",
      timezone: "Europe",
      latitude: 40.4167,
      longitude: -3.7033,
      timeDifference: 7,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
    {
      id: 12,
      name: "Rome",
      timezone: "Europe",
      latitude: 41.8955,
      longitude: 12.4823,
      timeDifference: 7,
      sunriseTime: 0,
      sunsetTime: 0,
      date: "",
      dateTime: "",
    },
  ]);

  useEffect(() => {
    // デジタル時計
    setInterval(() => getRealTime(), 1000);
    getSunTime();
  }, []);

  const getSunTime = () => {
    let sunTimeArray: Array<SunTime> = [];
    let sunObj: SunTime = {
      id: 0,
      day: "",
      sunriseTime: "",
      sunsetTime: "",
    };
    let sunsetArray: Array<string> = [];

    // 日の出時刻
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=sunrise&timezone=Asia%2FTokyo"
      )
      .then((response) => {
        const targetDate = response.data.daily.sunrise[0];
        const timeArray = targetDate.split("T");
        const time = timeArray[1];
        setSunriseTime(time);

        const array = response.data.daily.sunrise;

        for (let i = 0; i < array.length; i++) {
          const timeArray = array[i].split("T");
          let day = timeArray[0];
          day = new Date(day);
          let formatString = format(day, "MM/dd E");
          const time = timeArray[1];
          sunObj = {
            id: i,
            day: formatString,
            sunriseTime: time,
            sunsetTime: "",
          };
          sunTimeArray.push(sunObj);
        }
        sunTimeArray = sunTimeArray.slice(1);
      });

    // 日の入り時刻
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=sunset&timezone=Asia%2FTokyo"
      )
      .then((response) => {
        const targetDate = response.data.daily.sunset[0];
        const timeArray = targetDate.split("T");
        const time = timeArray[1];
        setSunsetTime(time);

        const array = response.data.daily.sunset;

        for (let i = 0; i < array.length; i++) {
          const timeArray = array[i].split("T");
          const time = timeArray[1];
          sunsetArray.push(time);
        }
        sunsetArray = sunsetArray.slice(1);

        for (let i = 0; i < sunsetArray.length; i++) {
          sunTimeArray[i].sunsetTime = sunsetArray[i];
        }
        setSunArray(sunTimeArray);
      });
  };

  useEffect(() => {
    getSunTime();
  }, [sunArray]);

  /**
   * 国を選択.
   * @param e
   */
  const onChangeCountries = (e: SelectChangeEvent<string>) => {
    // ローディングを表示
    setLoadingFlag(true);
    // 表示の切り替え
    setFlag(false);
    for (let country of countries) {
      if (country.name === e.target.value) {
        setSelectedCountry(country);
      }
    }
  };

  useEffect(() => {
    getSunriseTime(selectedCountry);
  }, [selectedCountry]);

  // 都市の日出没時間を計算.
  const getSunriseTime = async (country: WorldCountry) => {
    let sunTimeArray: Array<SunTime> = [];
    let sunObj: SunTime = {
      id: 0,
      day: "",
      sunriseTime: "",
      sunsetTime: "",
    };
    let sunsetArray: Array<string> = [];

    let sunriseTime = 0;
    let sunsetTime = 0;
    // 日の出時刻
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.latitude}&longitude=${country.longitude}&daily=sunrise&timezone=${country.timezone}%2F${country.name}`
      )
      .then((response) => {
        const targetDate = response.data.daily.sunrise[0];
        const timeArray = targetDate.split("T");
        sunriseTime = timeArray[1];

        const array = response.data.daily.sunrise;

        for (let i = 0; i < array.length; i++) {
          const timeArray = array[i].split("T");
          let day = timeArray[0];
          day = new Date(day);
          let formatString = format(day, "MM/dd E");
          const time = timeArray[1];
          sunObj = {
            id: i,
            day: formatString,
            sunriseTime: time,
            sunsetTime: "",
          };
          sunTimeArray.push(sunObj);
        }
        sunTimeArray = sunTimeArray.slice(1);
      });

    // 日の入り時刻
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.latitude}&longitude=${country.longitude}&daily=sunset&timezone=${country.timezone}%2F${country.name}`
      )
      .then((response) => {
        const targetDate = response.data.daily.sunset[0];
        const timeArray = targetDate.split("T");
        sunsetTime = timeArray[1];

        const array = response.data.daily.sunset;

        for (let i = 0; i < array.length; i++) {
          const timeArray = array[i].split("T");
          const time = timeArray[1];
          sunsetArray.push(time);
        }
        sunsetArray = sunsetArray.slice(1);

        for (let i = 0; i < sunsetArray.length; i++) {
          sunTimeArray[i].sunsetTime = sunsetArray[i];
        }
        setSunArray2(sunTimeArray);
      });
    selectedCountry.sunriseTime = sunriseTime;
    selectedCountry.sunsetTime = sunsetTime;
  };

  useEffect(() => {
    // 日本との時差
    setTimeout(() => {
      getNowTime();
      setInterval(() => getNowTime(), 1000);
    }, 1000 - new Date().getUTCMilliseconds());
  }, [selectedCountry.sunsetTime]);

  // 都市の現在の時刻を計算
  const getNowTime = () => {
    let nowDate = new Date();
    nowDate = subHours(nowDate, selectedCountry.timeDifference);
    const formatString = format(nowDate, "yyyy/MM/dd E-HH:mm:ss");
    const nowDateArray = formatString.split("-");
    selectedCountry.date = nowDateArray[0];
    selectedCountry.dateTime = nowDateArray[1];
    setLoadingFlag(false);
  };

  return (
    <SContainer>
      <SPosition3>
        <SPosition4>
          <STitleArea>
            <SSiteName>Sunrise and Sunset</SSiteName>
            <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
              <Select
                labelId="city-select"
                onChange={onChangeCountries}
                defaultValue="Tokyo"
              >
                <MenuItem value="Tokyo">Tokyo</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
                <MenuItem value="New_York">New York</MenuItem>
                <MenuItem value="Los_Angeles">Los Angeles</MenuItem>
                <MenuItem value="London">London</MenuItem>
                <MenuItem value="Berlin">Berlin</MenuItem>
                <MenuItem value="Madrid">Madrid</MenuItem>
                <MenuItem value="Rome">Rome</MenuItem>
                <MenuItem value="Moscow">Moscow</MenuItem>
                <MenuItem value="Singapore">Singapore</MenuItem>
                <MenuItem value="Seoul">Seoul</MenuItem>
              </Select>
            </FormControl>
          </STitleArea>
        </SPosition4>
        <SPosition5>
          {(() => {
            if (loadingFlag === true) {
              return (
                <SCard3>
                  <Oval width="60" color="white"></Oval>
                </SCard3>
              );
            } else {
              if (flag === true) {
                return (
                  <SCard>
                    <SCity>
                      <STitle>Tokyo</STitle>
                      <div>
                        <SDate>{today}</SDate>
                        <STime>{nowTime}</STime>
                      </div>
                    </SCity>
                    <SSubTitle>Sunrise&nbsp;&nbsp;Sunset</SSubTitle>
                    <SPosition2>
                      <SIconFlex>
                        <SIcon>
                          <WbSunnyOutlinedIcon style={{ color: "white" }} />
                        </SIcon>
                        <SSunTime>{sunriseTime} /</SSunTime>
                      </SIconFlex>
                      <SIconFlex>
                        <SIcon>
                          <WbTwilightOutlinedIcon style={{ color: "white" }} />
                        </SIcon>
                        <SSunTime>{sunsetTime}</SSunTime>
                      </SIconFlex>
                    </SPosition2>
                  </SCard>
                );
              } else {
                return (
                  <SCard>
                    <SCity>
                      {(() => {
                        if (
                          selectedCountry.name === "New_York" ||
                          selectedCountry.name === "Los_Angeles"
                        ) {
                          return <STitle2>{selectedCountry.name}</STitle2>;
                        } else {
                          return <STitle>{selectedCountry.name}</STitle>;
                        }
                      })()}
                      <div>
                        <SDate>{selectedCountry.date}</SDate>
                        <STime>{selectedCountry.dateTime}</STime>
                      </div>
                    </SCity>
                    <SSubTitle>Sunrise&nbsp;&nbsp;Sunset</SSubTitle>
                    <SPosition2>
                      <SIconFlex>
                        <SIcon>
                          <WbSunnyOutlinedIcon style={{ color: "white" }} />
                        </SIcon>
                        <SSunTime>{selectedCountry.sunriseTime} / </SSunTime>
                      </SIconFlex>
                      <SIconFlex>
                        <SIcon>
                          <WbTwilightOutlinedIcon style={{ color: "white" }} />
                        </SIcon>
                        <SSunTime>{selectedCountry.sunsetTime}</SSunTime>
                      </SIconFlex>
                    </SPosition2>
                  </SCard>
                );
              }
            }
          })()}
        </SPosition5>
      </SPosition3>
      {(() => {
        if (flag === true) {
          return (
            <SPosition>
              {sunArray.map((sunObj) => (
                <SCard2 key={sunObj.id}>
                  <SDate2>{sunObj.day}</SDate2>
                  <SIconFlex>
                    <SIcon2>
                      <WbSunnyOutlinedIcon style={{ color: "white" }} />
                    </SIcon2>
                    <STime2>{sunObj.sunriseTime}</STime2>
                  </SIconFlex>
                  <SIconFlex>
                    <SIcon2>
                      <WbTwilightOutlinedIcon style={{ color: "white" }} />
                    </SIcon2>
                    <STime2>{sunObj.sunsetTime}</STime2>
                  </SIconFlex>
                </SCard2>
              ))}
            </SPosition>
          );
        } else {
          return (
            <SPosition>
              {sunArray2.map((sunObj) => (
                <SCard2 key={sunObj.id}>
                  <SDate2>{sunObj.day}</SDate2>
                  <SIconFlex>
                    <SIcon2>
                      <WbSunnyOutlinedIcon style={{ color: "white" }} />
                    </SIcon2>
                    <STime2>{sunObj.sunriseTime}</STime2>
                  </SIconFlex>
                  <SIconFlex>
                    <SIcon2>
                      <WbTwilightOutlinedIcon style={{ color: "white" }} />
                    </SIcon2>
                    <STime2>{sunObj.sunsetTime}</STime2>
                  </SIconFlex>
                </SCard2>
              ))}
            </SPosition>
          );
        }
      })()}
    </SContainer>
  );
};

const SContainer = styled("div")({
  fontFamily: "Raleway, sans-serif",
  height: "100vh",
  background:
    "linear-gradient(45deg, #3274d1,#287ef7,#71a8f5,#e9c2f9,#f9c2eb,#f9c2c2,#f9dac2,#fc9e95)",
  backgroundSize: "700% 700%",
  animation: "bgChange 40s ease infinite",
  "@keyframes bgChange": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  "@media screen and (max-width:1024px)": {
    height: "100%",
    padding: "60px 0",
  },
});

const SCard = styled("div")({
  borderRadius: "6px",
  padding: "35px 45px",
  width: "330px",
  height: "160px",
  marginTop: "90px",
  marginRight: "40px",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
  "@media screen and (max-width:1024px)": {
    marginRight: 0,
    marginTop: "40px",
  },
});

const SCard2 = styled("div")({
  padding: "8px 30px",
  "@media screen and (max-width:1024px)": {
    marginBottom: "20px",
  },
});

const SCard3 = styled("div")({
  borderRadius: "6px",
  padding: "35px 45px",
  width: "330px",
  height: "160px",
  marginTop: "90px",
  marginRight: "40px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
  "@media screen and (max-width:1024px)": {
    marginRight: 0,
    marginTop: "40px",
  },
});

const STitle = styled("div")({
  fontWeight: "bold",
  fontSize: "40px",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
  textAlign: "center",
  marginBottom: "20px",
  color: "white",
});

const STitle2 = styled("div")({
  fontWeight: "bold",
  fontSize: "35px",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
  textAlign: "center",
  marginBottom: "20px",
  color: "white",
});

const STitleArea = styled("div")({
  marginTop: "90px",
  "@media screen and (max-width:1024px)": {
    marginTop: 0,
  },
});

const SSiteName = styled("div")({
  fontSize: "40px",
  marginBottom: "20px",
  color: "white",
  "@media screen and (max-width:1024px)": {
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "10px",
  },
});

const SIcon = styled("div")({
  marginLeft: "10px",
  marginRight: "10px",
});

const SIcon2 = styled("div")({
  marginRight: "10px",
});

const SIconFlex = styled("div")({
  display: "flex",
  alignItems: "center",
});

const SDate = styled("div")({
  textAlign: "center",
  color: "white",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
});

const SDate2 = styled("div")({
  textAlign: "center",
  marginBottom: "8px",
  fontSize: "20px",
  color: "white",
  borderBottom: "solid 1px white",
  paddingBottom: "8px",
});

const STime = styled("div")({
  fontSize: "25px",
  textAlign: "center",
  color: "white",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
});

const STime2 = styled("div")({
  fontSize: "20px",
  textAlign: "center",
  color: "white",
});

const SPosition = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "80px",
  "@media screen and (max-width:1024px)": {
    flexWrap: "wrap",
    marginTop: "60px",
  },
});

const SPosition2 = styled("div")({
  display: "flex",
});

const SPosition3 = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width:1024px)": {
    display: "block",
  },
});

const SPosition4 = styled("div")({
  order: "2",
  "@media screen and (max-width:1024px)": {
    display: "flex",
    justifyContent: "center",
    order: "1",
  },
});

const SPosition5 = styled("div")({
  order: "1",
  "@media screen and (max-width:1024px)": {
    display: "flex",
    justifyContent: "center",
    order: "2",
  },
});

const SSubTitle = styled("div")({
  marginTop: "25px",
  marginBottom: "10px",
  color: "white",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
});

const SSunTime = styled("div")({
  fontSize: "25px",
  color: "white",
  textShadow: "1px 2px 2px rgba(151, 151, 163, 0.2)",
});

const SCity = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
