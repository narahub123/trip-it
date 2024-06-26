import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metros } from "../../../data/metros";
import {
  createMarker,
  getCarDirectionArray,
  getCoords,
  getCoordsArray,
} from "../../../utils/map";
import { debounce } from "../../../utils/debounce";
import { useLocation } from "react-router-dom";
import {
  InfoType,
  setInfoToMapColumn,
  setMapWidth,
} from "../../../store/slices/mapSlice";

// kakao 객체의 존재 여부를 typeScript가 인식하지 못함
// Property 'kakao' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    kakao: any;
  }
}

const MapTest = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapWidth = useSelector((state: Rootstate) => state.map.mapWidth);

  const { hash } = useLocation();
  const dispatch = useDispatch();

  const mapcol = useSelector((state: Rootstate) => state.map);

  // console.log(mapcol);

  // console.log("map 크기", mapWidth);
  const handleResize = debounce(() => {
    if (mapRef.current) dispatch(setMapWidth(mapRef.current.offsetWidth));
  }, 500);
  // 맵 크기
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, [mapRef]);

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

              if (hash === "#step4") {
                const res = await getCarDirectionArray(map, coords, col);

                const info: InfoType[] = [];

                for (const i of res) {
                  if (i) info.push(i);
                }

                dispatch(setInfoToMapColumn({ column: col, info }));
                // console.log("pairs && col", col, info);
              }
            }

            map.setBounds(bounds);
          } catch (error) {
            // console.error(error);
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
