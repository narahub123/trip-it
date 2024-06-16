import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metros } from "../../../data/metros";
import {
  createMarker,
  getCarDirection,
  getCoords,
  getCoordsArray,
} from "../../../utils/map";
import { debounce } from "../../../utils/debounce";
import { useLocation } from "react-router-dom";

// kakao 객체의 존재 여부를 typeScript가 인식하지 못함
// Property 'kakao' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    kakao: any;
  }
}

const MapTest = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(0);
  const { hash } = useLocation();

  const handleResize = debounce(() => {
    if (mapRef.current) setMapWidth(mapRef.current.offsetWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );
  const areaCode = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id
  );

  const metro = metros.find((metro) => metro.areaCode === areaCode);

  const addr = metro?.name;

  // 추가된 장소를 보여주는 맵
  useEffect(() => {
    // 주소-좌표 변환 객체를 생성합니다
    const container = document.getElementById("map");

    if (kakao && addr && container) {
      kakao.maps.load(async () => {
        const keys = Object.keys(columnPlaces);

        let count = 0;

        for (const key of keys) {
          const colPlaces = columnPlaces[key];
          count += colPlaces.length;
        }

        const coord = await getCoords(addr);

        const options = {
          center: coord,
          level: 8,
        };

        const map = new kakao.maps.Map(container, options);

        if (count !== 0) {
          try {
            // 지도 재설정
            const bounds = new kakao.maps.LatLngBounds();

            for (let col = 0; col < keys.length; col++) {
              const colPlaces = columnPlaces[keys[col]];
              const coords = await getCoordsArray(colPlaces);
              const places = colPlaces.map((place) => place.title);

              for (const coord of coords) {
                // latlngBounds 객체에 좌표 추가
                bounds.extend(coord);
              }

              createMarker(map, coords, col, places);
              //   createPolyline(map, coords, col);

              if (hash === "#step4") {
                for (let i = 0; i < coords.length - 1; i++) {
                  const start = i;
                  const end = i + 1;

                  const info = await getCarDirection(
                    map,
                    coords[start],
                    coords[end],
                    col
                  );

                  console.log(info);
                }
              }
            }

            map.setBounds(bounds);
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  }, [addr, hash, columnPlaces, mapWidth]);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "97vh" }}></div>
  );
};

export default MapTest;
