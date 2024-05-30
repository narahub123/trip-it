// 초성(19개)
const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
// 중성(21개)
const JUNG_HANGUL = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
// 종성(28개)
const JONG_HANGUL = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0)); // 588 ( 28 * 21 )
const JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0)); // 28

const HANGUL_START_CHARCODE = "가".charCodeAt(0);
const HANGUL_END_CHARCODE = "힣".charCodeAt(0);

// 조합 된 글자인지 체크 (가 ~ 힣 사이)
function isHangul(letter: number) {
  return HANGUL_START_CHARCODE <= letter && letter <= HANGUL_END_CHARCODE;
}

function isEnglish(letter: number) {
  return (
    (letter >= 65 && letter <= 90) ||
    (letter >= 97 && letter <= 122) ||
    letter === 32
  );
}

function divideHangul(letter: string) {
  const letterCode = letter.charCodeAt(0);

  if (isEnglish(letterCode)) {
    return true;
  }

  if (!isHangul(letterCode)) {
    return false;
  }

  return true;
}

export function isSearchable(letters: string) {
  const values = letters
    .trim()
    .split("")
    .map((letter) => {
      return divideHangul(letter);
    });

  const hasFalse = !values.includes(false);
  return hasFalse;
}
