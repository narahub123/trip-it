import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import { metros } from "../data/metros";

const useDefaultImage = () => {
  // metroId 가져오기
  const metroId = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id
  );

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  return defaultImage;
};

export default useDefaultImage;
