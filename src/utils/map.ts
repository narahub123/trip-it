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
  positions: kakao.maps.LatLng[]
) => {
  // 지도 재설정
  const bounds = new kakao.maps.LatLngBounds();

  for (let i = 0; i < positions.length; i++) {
    // 마커 추가
    const marker = new kakao.maps.Marker({
      map,
      position: positions[i],
    });

    marker.setMap(map);

    // latlngBounds 객체에 좌표 추가
    bounds.extend(positions[i]);

    map.setBounds(bounds);
  }
};
