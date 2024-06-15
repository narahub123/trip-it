import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metros } from "../../../data/metros";
import {
  ResultType,
  createMarker,
  getCoords,
  getCoordsArray,
} from "../../../utils/map";

// kakao 객체의 존재 여부를 typeScript가 인식하지 못함
// Property 'kakao' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    kakao: any;
  }
}

const MapTest = () => {
  const columnPlaces_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces[`columnPlaces_1`]
  );
  const areaCode = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id
  );

  const metro = metros.find((metro) => metro.areaCode === areaCode);

  const addr = metro?.name;

  // 첫 맵
  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {
        const container = document.getElementById("map");

        console.log("첫 맵");

        if (addr)
          getCoords(addr).then((coords) => {
            const options = {
              center: coords,
              level: 8,
            };

            const map = container && new kakao.maps.Map(container, options);
          });
      });
    }
  }, [addr]);

  // 추가된 장소를 보여주는 맵
  useEffect(() => {
    if (kakao) {
      kakao.maps.load(async () => {
        console.log("여기는?");
        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        const container = document.getElementById("map");
        let latitude = 0;
        let longitude = 0;
        // 달력으로 이동할 때의 주소
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          addr,
          function (result: ResultType[], status: kakao.maps.services.Status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(
                Number(result[0].y),
                Number(result[0].x)
              );

              latitude = Number(result[0].y);
              longitude = Number(result[0].x);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 8,
        };

        const map = new window.kakao.maps.Map(container, options);

        try {
          const coords = await getCoordsArray(columnPlaces_1);

          createMarker(map, coords);
          console.log(coords);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, [columnPlaces_1]);

  return <div id="map" style={{ width: "100%", height: "97vh" }}></div>;
};

export default MapTest;
