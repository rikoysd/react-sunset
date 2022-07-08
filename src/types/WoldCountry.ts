export type WorldCountry = {
  // id
  id: number;
  // 国名
  name: string;
  // タイムゾーン
  timezone: string;
  // 緯度
  latitude: number;
  // 経度
  longitude: number;
  // 日本との時差
  timeDifference: number;
  // 日の出時刻
  sunriseTime: number;
  // 日の入り時刻
  sunsetTime: number;
  // 日にち
  date: string;
  // 時間
  dateTime: string;
};
