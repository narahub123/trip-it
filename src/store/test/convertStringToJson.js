export const responseText = `{"addr1":"서울특별시 종로구 북촌로 57 (가회동)","addr2":"","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0201","cat3":"A02010900","contentid":"2733967","contenttypeid":"12","createdtime":"20210817184103","firstimage":"http://tong.visitkorea.or.kr/cms/resource/09/3303909_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/09/3303909_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"126.9846616856","mapy":"37.5820858828","mlevel":"6","modifiedtime":"20240528175721","sigungucode":"23","tel":"","title":"가회동성당","zipcode":"03052","showflag":"1"}{"addr1":"서울특별시 동대문구 서울시립대로2길 59","addr2":"(답십리동)","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0202","cat3":"A02020700","contentid":"2763807","contenttypeid":"12","createdtime":"20211027233001","firstimage":"","firstimage2":"","cpyrhtDivCd":"","mapx":"127.0490977427","mapy":"37.5728520032","mlevel":"6","modifiedtime":"20231213161919","sigungucode":"11","tel":"","title":"간데메공원","zipcode":"02595","showflag":"1"}{"addr1":"서울특별시 양천구 신정동 162-56","addr2":"","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0202","cat3":"A02020700","contentid":"1116925","contenttypeid":"12","createdtime":"20101026223528","firstimage":"http://tong.visitkorea.or.kr/cms/resource/62/2612062_image2_1.bmp","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/62/2612062_image2_1.bmp","cpyrhtDivCd":"Type3","mapx":"126.8684105358","mapy":"37.5061176314","mlevel":"6","modifiedtime":"20240424122344","sigungucode":"19","tel":"","title":"갈산근린공원","zipcode":"08104","showflag":"1"}{"addr1":"서울특별시 종로구 율곡로23길 16","addr2":"(충신동)","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0201","cat3":"A02010800","contentid":"294439","contenttypeid":"12","createdtime":"20071127005251","firstimage":"http://tong.visitkorea.or.kr/cms/resource/85/2031885_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/85/2031885_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"127.0066015446","mapy":"37.5753148419","mlevel":"6","modifiedtime":"20230412113705","sigungucode":"23","tel":"","title":"감로암(서울)","zipcode":"03099","showflag":"1"}{"addr1":"서울특별시 강남구 역삼동","addr2":"(역삼동)","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0203","cat3":"A02030400","contentid":"264570","contenttypeid":"12","createdtime":"20050623224701","firstimage":"http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/08/1984608_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"127.0281573537","mapy":"37.4970465429","mlevel":"6","modifiedtime":"20230822163704","sigungucode":"1","tel":"","title":"강남","zipcode":"06232","showflag":"1"}{"addr1":"서울특별시 강남구 영동대로 513","addr2":"(삼성동)","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0202","cat3":"A02020200","contentid":"2456536","contenttypeid":"12","createdtime":"20161214231140","firstimage":"","firstimage2":"","cpyrhtDivCd":"","mapx":"127.0591318945","mapy":"37.5118092746","mlevel":"6","modifiedtime":"20230503114647","sigungucode":"1","tel":"","title":"강남 마이스 관광특구","zipcode":"06164","showflag":"1"}{"addr1":"서울특별시 강남구 압구정로 161","addr2":"","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0203","cat3":"A02030400","contentid":"1949905","contenttypeid":"12","createdtime":"20140923030533","firstimage":"http://tong.visitkorea.or.kr/cms/resource/75/1258175_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/75/1258175_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"127.0264344408","mapy":"37.5269874797","mlevel":"6","modifiedtime":"20231204162757","sigungucode":"1","tel":"","title":"강남 시티투어 (트롤리버스)","zipcode":"06001","showflag":"1"}{"addr1":"서울특별시 강동구 천호동","addr2":"","areacode":"1","booktour":"0","cat1":"A02","cat2":"A0205","cat3":"A02050200","contentid":"127377","contenttypeid":"12","createdtime":"20040227090000","firstimage":"","firstimage2":"","cpyrhtDivCd":"","mapx":"127.1207004140","mapy":"37.5426873535","mlevel":"6","modifiedtime":"20240430094525","sigungucode":"2","tel":"","title":"강동예찬시비","zipcode":"05246","showflag":"1"}`;

export function splitJSONObjects(text) {
  const objects = [];
  let startIndex = 0;
  let bracesCount = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{") {
      if (bracesCount === 0) startIndex = i;
      bracesCount++;
    } else if (text[i] === "}") {
      bracesCount--;
      if (bracesCount === 0) {
        objects.push(text.slice(startIndex, i + 1));
      }
    }
  }

  return objects;
}

const jsonStrings = splitJSONObjects(responseText);
const jsonData = jsonStrings.map((jsonString) => JSON.parse(jsonString));

console.log(jsonData);
