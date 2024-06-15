import { PlaceApiType } from "../types/place";

declare global {
  interface Window {
    kakao: any;
  }
}

export interface ResultType {
  address_name: string;
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  x: string;
  y: string;
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
}

export const getCoords = (address: string) => {
  return new Promise<kakao.maps.LatLng>((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      address,
      (result: ResultType[], status: kakao.maps.services.Status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            Number(result[0].y), // lat
            Number(result[0].x) // lng
          );

          resolve(coords);
        } else {
          reject("에러");
        }
      }
    );
  });
};

export const getCoordsArray = async (places: PlaceApiType[]) => {
  const promises = places.map((place) => getCoords(place.addr1));

  return Promise.all(promises);
};

export const createMarker = (
  map: kakao.maps.Map,
  positions: kakao.maps.LatLng[],
  col: number
) => {
  const markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT);

  const markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y);

  const originX = MARKER_WIDTH * col;

  for (let i = 0; i < positions.length; i++) {
    const originY = MARKER_HEIGHT * i;
    const normalOrigin = new kakao.maps.Point(originX, originY);
    // 마커 이미지 생성
    const normalImage = createMarkerImage(
      markerSize,
      markerOffset,
      normalOrigin
    );
    // 마커 추가
    const marker = new kakao.maps.Marker({
      image: normalImage,
      map,
      position: positions[i],
    });

    marker.setMap(map);
  }
};

const MARKER_WIDTH = 30;
const MARKER_HEIGHT = 42.5;
const OFFSET_X = 6;
const OFFSET_Y = MARKER_HEIGHT;
const SPRITE_MARKER_SRC = "/images/kakao-markers2.png";
const SPRITE_WIDTH = 330;
const SPRITE_HEIGHT = 425;

export const createMarkerImage = (
  markerSize: kakao.maps.Size,
  offset: kakao.maps.Point,
  spriteOrigin: kakao.maps.Point
) => {
  const spriteImageSize = new kakao.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT);
  const markerImage = new kakao.maps.MarkerImage(
    SPRITE_MARKER_SRC,
    markerSize,
    {
      offset,
      spriteOrigin,
      spriteSize: spriteImageSize,
    }
  );

  return markerImage;
};
