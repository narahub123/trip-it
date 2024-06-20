import { useEffect, useState } from "react";
import { PlaceApiType } from "../types/place";

const useLoadedImage = (place: PlaceApiType | undefined) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    console.log("place", place);
    
    if (place === undefined) {
      // src에 이미지 링크 삽입
      img.src = "/images/trip-it-logo.png"; // 이미지를 찾을 수 없습니다? 장소를 찾을 수 없습니다?
      // 장소가 없는 게 확인되면 loaded를 true로 바꾸기
      img.onload = () => setLoaded(true);
    } else if (place.firstimage) {
      img.src = place.firstimage;
      // onload : load가 완료되면 loaded를 true로 바꾸기
      img.onload = () => setLoaded(true);
    }
  }, [place]);

  return loaded;
};

export default useLoadedImage;
