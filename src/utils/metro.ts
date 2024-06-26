import { metros } from "../data/metros";

export const metroName = (metroId: string) => {
  const name = metros.find((metro) => metro.areaCode === metroId)?.name;

  if (!name) return "에러";

  return name;
};
