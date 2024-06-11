import React, { useEffect } from "react";
import "./map.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metros } from "../../../data/metros";

// kakao 객체의 존재 여부를 typeScript가 인식하지 못함
// Property 'kakao' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    kakao: any;
  }
}

interface ResultType {
  address_name: string;
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  x: string;
  y: string;
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
}

const Map = () => {
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );

  const areaCode = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id
  );

  // 지역 찾기
  const metro = metros.find((metro) => metro.areaCode === areaCode);
  // 지역 이름 가져오기
  const addr = metro?.name;

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 8,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        for (const selectedPlace of selectedPlaces) {
          geocoder.addressSearch(
            selectedPlace.addr1,
            function (
              result: ResultType[],
              status: kakao.maps.services.Status
            ) {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                  title: selectedPlace.title,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="width:150px;text-align:center;padding:6px 0;">${selectedPlace.title}</div>`,
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
              }
            }
          );
        }
      });
    }
  }, [selectedPlaces]);
  return <div id="map" style={{ width: "100%", height: "97vh" }} />;
};

export default Map;
