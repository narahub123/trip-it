export interface kakaoMobilityRoadType {
  distance: number;
  duration: number;
  name: string;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
}

export interface kakaoMobilitySectionType {
  bound: any;
  distance: number;
  duration: number;
  guides: any[];
  roads: kakaoMobilityRoadType[];
}
