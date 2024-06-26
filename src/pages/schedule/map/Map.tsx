import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metros } from "../../../data/metros";
import { useLocation } from "react-router-dom";
import { colors } from "../../../data/color";
import { debounce } from "../../../utils/debounce";

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
  const { hash } = useLocation();

  const mapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const handleResize = debounce(() => {
    if (mapRef.current) setWidth(mapRef.current.offsetWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(width);

  // 선택한 장소를 모아둠
  const columnPlaces_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces[`columnPlaces_1`]
  );

  // 선택한 장소 보관소의 요소 개수
  const numOfSavedPlaces = columnPlaces_1 ? columnPlaces_1.length : 0;

  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
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

        // 지도를 재설정할 범위 정보를 가지고 있을 LatLngBounds 객체 생성
        const bounds = new kakao.maps.LatLngBounds();

        function createMarkerImage(
          markerSize: kakao.maps.Size,
          offset: kakao.maps.Point,
          spriteOrigin: kakao.maps.Point
        ) {
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
        }

        const MARKER_WIDTH = 30;
        const MARKER_HEIGHT = 42.5;
        const OFFSET_X = 6;
        const OFFSET_Y = MARKER_HEIGHT;
        const SPRITE_MARKER_SRC = "/images/kakao-markers2.png";
        const SPRITE_WIDTH = 330;
        const SPRITE_HEIGHT = 425;

        const markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT);

        const markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y);

        const spriteImageSize = new kakao.maps.Size(
          SPRITE_WIDTH,
          SPRITE_HEIGHT
        );

        if (hash === "#step1" || hash === "#step2" || hash === "#step3") {
          // 주소로 좌표를 검색합니다
          for (let i = 0; i < numOfSavedPlaces; i++) {
            const selectedPlace = columnPlaces_1[i];
            const originY = MARKER_HEIGHT * i;
            const normalOrigin = new kakao.maps.Point(0, originY);
            geocoder.addressSearch(
              selectedPlace.addr1,
              function (
                result: ResultType[],
                status: kakao.maps.services.Status
              ) {
                // 정상적으로 검색이 완료됐으면 마커의 위치
                if (status === window.kakao.maps.services.Status.OK) {
                  var coords = new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                  );

                  // 마커 이미지 생성
                  const normalImage = createMarkerImage(
                    markerSize,
                    markerOffset,
                    normalOrigin
                  );

                  // 결과값으로 받은 위치를 마커로 표시합니다
                  var marker = new window.kakao.maps.Marker({
                    image: normalImage,
                    map: map,
                    position: coords,
                    title: selectedPlace.title,
                  });

                  // LatLngBounds 객체에 좌표를 추가함
                  bounds.extend(coords);

                  // 인포윈도우로 장소에 대한 설명을 표시합니다
                  var infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${selectedPlace.title}</div>`,
                  });
                  infowindow.open(map, marker);

                  // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
                  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
                  map.setBounds(bounds);
                  // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                  // map.setCenter(coords);
                }
              }
            );
          }
        } else if (hash === "#step4") {
          const keys = Object.keys(columnPlaces);
          for (const key of keys) {
            const colPlaces = columnPlaces[key];
            const originX =
              key.split("columnPlaces")[1] === "_1"
                ? 0
                : MARKER_WIDTH * (Number(key.split("columnPlaces")[1]) + 1);

            for (let i = 0; i < colPlaces.length; i++) {
              const place = colPlaces[i];
              geocoder.addressSearch(
                place.addr1,
                function (
                  result: ResultType[],
                  status: kakao.maps.services.Status
                ) {
                  const originY = MARKER_HEIGHT * i;
                  const normalOrigin = new kakao.maps.Point(originX, originY);
                  // 정상적으로 검색이 완료됐으면
                  if (status === window.kakao.maps.services.Status.OK) {
                    var coords = new window.kakao.maps.LatLng(
                      result[0].y,
                      result[0].x
                    );

                    // 마커 이미지 생성
                    const normalImage = createMarkerImage(
                      markerSize,
                      markerOffset,
                      normalOrigin
                    );

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.kakao.maps.Marker({
                      image: normalImage,
                      map: map,
                      position: coords,
                      title: place.title,
                    });

                    // LatLngBounds 객체에 좌표를 추가함
                    bounds.extend(coords);

                    const text =
                      key.split("columnPlaces")[1] !== "_1"
                        ? Number(key.split("columnPlaces")[1]) + 1 + "일차"
                        : "장소";

                    const num = Number(key.split("columnPlaces")[1]);

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new window.kakao.maps.InfoWindow({
                      content: `<div style="width:150px;text-align:center;padding:6px 0; background-color: ${
                        colors[num]
                      }">${text} ${place.title} ${i + 1}번째 장소</div>`,
                    });
                    infowindow.open(map, marker);

                    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
                    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
                    map.setBounds(bounds);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    // map.setCenter(coords);
                  }
                }
              );
            }
          }
        }
      });
    }
  }, [columnPlaces_1, columnPlaces, hash, width]);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "97vh" }} />
  );
};

export default Map;
