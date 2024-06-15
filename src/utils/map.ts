import { colors } from "../data/color";
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
  col: number,
  places: string[]
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
      title: places[i],
    });

    marker.setMap(map);
  }
};

const MARKER_WIDTH = 30;
const MARKER_HEIGHT = 42.5;
const OFFSET_X = 14;
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

export const createPolyline = (
  map: kakao.maps.Map,
  paths: kakao.maps.LatLng[],
  col: number
) => {
  const polyline = new kakao.maps.Polyline({
    path: paths,
    strokeWeight: 5,
    strokeColor: colors[col],
    strokeOpacity: 0.7,
    strokeStyle: "solid",
  });

  polyline.setMap(map);
};

export const getCarDirection = async (
  startPoint: kakao.maps.LatLng,
  endPoint: kakao.maps.LatLng,
  map: kakao.maps.Map
) => {
  console.log(startPoint, endPoint);

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;

  const url = "https://apis-navi.kakaomobility.com/v1/directions";

  // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
  const origin = `${startPoint.getLng()},${startPoint.getLat()}`;
  const destination = `${endPoint.getLng()},${endPoint.getLat()}`;

  // 요청 헤더를 추가합니다.
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    "Content-Type": "application/json",
  };

  // 표3의 요청 파라미터에 필수값을 적어줍니다.
  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination,
  });

  const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const linePath: kakao.maps.LatLng[] = [];

    // console.log(data.routes[0].sections[0].roads[0]);

    data.routes[0].sections[0].roads.forEach((router: any) => {
      router.vertexes.forEach((vertax: any, index: number) => {
        if (index % 2 === 0) {
          linePath.push(
            new kakao.maps.LatLng(
              router.vertexes[index + 1],
              router.vertexes[index]
            )
          );
        }
      });
    });

    var polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#000000",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });
    polyline.setMap(map);
  } catch (error) {
    console.error("Error:", error);
  }
};
