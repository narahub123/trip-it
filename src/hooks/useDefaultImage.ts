import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import { metros } from "../data/metros";

const useDefaultImage = (areacode?: string) => {
  let areaCode: string;
  // metroId 가져오기
  const metroId = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id
  );

  if (areacode) {
    areaCode = areacode;
  } else {
    if (!metroId) return;

    areaCode = metroId;
  }

  const defaultImage = metros.find(
    (metro) => metro.areaCode === areaCode
  )?.imgUrl;

  return defaultImage;
};

export default useDefaultImage;
