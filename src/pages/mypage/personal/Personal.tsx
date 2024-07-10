import { useEffect, useRef, useState } from "react";
import Valid from "../../login/Valid";
import "./personal.css";
import { dateList, monthList } from "../../../data/join";
import { useRenderCount } from "@uidotdev/usehooks";
import { fetchPersonalAPI, personallUpdataAPI } from "../../../apis/personal";

const Personal = () => {
  const count = useRenderCount();
  console.log("렌더링 횟수", count);

  const [open, setOpen] = useState("");
  const user = {
    email: "test@gmail.com",
    password: "test@1234",
    username: "박나라",
    nickname: "몰러",
    gender: "m",
    birth: "19850213",
  };
  const [formData, setFormData] = useState(user); // db에서 받아와야하는 정보
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonalAPI().then((res) => {
      console.log(res.data);

      setFormData(res.data);
      setIsLoading(false);
    });
  }, []);

  const [month, setMonth] = useState(`${Number(formData.birth.slice(4, 6))}`);
  const [date, setDate] = useState(`${Number(formData.birth.slice(6))}`);
  const [isRight, setIsRight] = useState({
    email: true,
    password: true,
    username: true,
    nickname: true,
    gender: true,
    birth: true,
  });

  // 기존 정보와 변경이 있는지 여부 확인
  const hasChanged = (): string => {
    const keys = Object.keys(formData);

    for (const key of keys) {
      if (
        user[key as keyof typeof user] !==
        formData[key as keyof typeof formData]
      ) {
        return "changed";
      }
    }

    return "notChanged";
  };

  const [keepClicked, setKeepClicked] = useState(0);
  const [val, setVal] = useState("");
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    personallUpdataAPI(value)
      .then((res) => {
        window.alert("변경 완료되었습니다.");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.currentTarget.id;

    // 유효성 검사
    if (key === "password") {
      ValidatePw(e.currentTarget.value);
    }

    if (key === "username") {
      validateUsername(e.currentTarget.value);
    }

    if (key === "nickname") {
      validateNickname(e.currentTarget.value);
    }

    if (key === "year") {
      validateYear(e.currentTarget.value);

      key = "birth";
    }

    let value = e.currentTarget.value;

    if (key === "year") {
      const year = e.currentTarget.value;

      const birth = year + month + date;
      value = birth;
    }

    const updatedUser = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedUser);

    console.log(value);
    setValue(value);
  };

  const submitRequirements =
    isRight.email &&
    isRight.password &&
    isRight.username &&
    isRight.nickname &&
    isRight.gender &&
    isRight.birth;

  const changeGender = (e: any) => {
    console.log(e.target.parentElement.previousElementSibling.id);

    setFormData({
      ...formData,
      [e.target.parentElement.previousElementSibling.id]:
        e.target.value === 1 ? "m" : "f",
    });

    setOpen("");
  };

  const changeMonth = (e: any) => {
    let birth = formData.birth;

    const year = birth.slice(0, 4);

    const month = e.target.value < 10 ? "0" + e.target.value : e.target.value;
    const dateFormat = Number(date) < 10 ? "0" + date : date;

    birth = year + month + dateFormat;
    setFormData({
      ...formData,
      birth,
    });
    setMonth(e.target.value);
    setOpen("");
  };

  const changeDate = (e: any) => {
    let birth = formData.birth;

    const year = birth.slice(0, 4);

    const monthFormat = Number(month) < 10 ? "0" + month : month;
    const date = e.target.value < 10 ? "0" + e.target.value : e.target.value;

    birth = year + monthFormat + date;
    setFormData({
      ...formData,
      birth,
    });
    setDate(e.target.value);
    setOpen("");
  };

  const ValidatePw = (value: string) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const result = pwRegex.test(value);

    setIsRight({
      ...isRight,
      password: result,
    });
  };

  const validateUsername = (value: string) => {
    const nameRegex = /^[가-힣]{2,5}$/;

    const result = nameRegex.test(value);

    setIsRight({
      ...isRight,
      username: result,
    });
  };

  const validateNickname = (value: string) => {
    const nickRegex = /^[a-zA-Z가-힣0-9_]{2,20}$/;

    const result = nickRegex.test(value);

    setIsRight({
      ...isRight,
      nickname: result,
    });
  };

  const validateYear = (value: string) => {
    const yearRegex = /^[0-9]{4}$/;
    const result = yearRegex.test(value);

    setIsRight({
      ...isRight,
      birth: result,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(formData.gender);

  return (
    <div className="personal">
      <h3 className="join-title">개인 정보</h3>
      <div className="personal-body">
        <div className="personal-body-title">
          입력사항
          <span className="personal-body-title-sub">(필수)</span>
        </div>
        <div className="personal-body-main">
          <div className="personal-body-input">
            <input
              className={
                "personal-body-inputbox" +
                (isRight.email === true ? "confirm disabled" : "")
              }
              type="text"
              defaultValue={formData.email}
              disabled
            ></input>
          </div>
          <div className="personal-body-input">
            <input
              defaultValue={formData.password}
              className={
                "personal-body-inputbox" +
                (isRight.password === true ? "confirm" : "")
              }
              id="password"
              type="password"
              placeholder="비밀번호(8자~12자, 영문+숫자+특수문자 사용)"
              onChange={(e) => handleChange(e)}
              // disabled
            ></input>
          </div>

          <p className={`personal-error ${!isRight.password ? "visible" : ""}`}>
            비밀번호(8자~12자, 영문+숫자+특수문자 사용)
          </p>

          <div className="personal-body-input">
            <input
              defaultValue={formData.username}
              className={
                "personal-body-inputbox" +
                (isRight.username === true ? "confirm" : "")
              }
              id="username"
              type="text"
              onChange={(e) => handleChange(e)}
              disabled
            ></input>
          </div>
          <p className={`personal-error ${!isRight.username ? "visible" : ""}`}>
            유저이름(한글 2~5글자)
          </p>
          {/* <div className="personal-body-input">
            <input
              defaultValue={formData.nickname}
              className={
                "personal-body-inputbox" +
                (isRight.nickname === true ? "confirm" : "")
              }
              id="nickname"
              type="text"
              placeholder="닉네임"
              onChange={(e) => handleChange(e)}
              disabled
            ></input>
          </div>
          <p className={`personal-error ${!isRight.nickname ? "visible" : ""}`}>
            닉네임(한글, 영어, 숫자 2~20글자)
          </p> */}
          <div className="personal-body-input">
            <input
              type="button"
              className={
                "personal-li" + (isRight.gender === true ? "confirm" : "")
              }
              id="gender"
              onClick={() => setOpen("gender")}
              onChange={(e) => handleChange(e)}
              value={formData.gender === "m" ? "남" : "여"}
              disabled
            ></input>
            <ul
              className={"personal-ul" + (open === "gender" ? "-gender" : "")}
            >
              <li className="personal-ul-li" value={1} onClick={changeGender}>
                남
              </li>
              <li className="personal-ul-li" value={2} onClick={changeGender}>
                여
              </li>
            </ul>
          </div>

          <div className="personal-body-grid">
            <div className="personal-body-grid-year">
              <input
                defaultValue={formData.birth.slice(0, 4)}
                className={
                  "personal-body-year-font" +
                  (isRight.birth === true ? "confirm" : "")
                }
                type="text"
                placeholder="년(예 1996)"
                maxLength={4}
                id="year"
                onChange={(e) => handleChange(e)}
                disabled
              ></input>
            </div>
            <div className="personal-body-input">
              <input
                type="button"
                defaultValue={`${month}월`}
                className={
                  "personal-li" + (isRight.birth === true ? "confirm" : "")
                }
                onClick={() => setOpen("month")}
                disabled
              ></input>
              <ul
                className={"personal-ul" + (open === "month" ? "-month" : "")}
              >
                {monthList.map(function (a, i) {
                  return (
                    <li
                      className="personal-ul-li"
                      value={i + 1}
                      key={i}
                      onClick={changeMonth}
                    >
                      {a}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="personal-body-input">
              <input
                type="button"
                defaultValue={`${date}일`}
                className={"personal-li" + (isRight.birth ? "confirm" : "")}
                onClick={() => setOpen("date")}
                disabled
              />
              <ul className={"personal-ul" + (open === "date" ? "-date" : "")}>
                {dateList.map(function (a, i) {
                  return (
                    <li
                      value={i + 1}
                      className="personal-ul-li"
                      key={i}
                      onClick={changeDate}
                    >
                      {a}
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className={`personal-error ${!isRight.birth ? "visible" : ""}`}>
              연도는 4자리 수
            </p>
          </div>
          <button
            type="button"
            className={
              "join-body-button" +
              (submitRequirements === true && hasChanged() === "changed"
                ? "active"
                : "")
            }
            disabled={!submitRequirements}
            onClick={handleSubmit}
          >
            개인 정보 수정
          </button>
        </div>
      </div>
      {val == "이메일" ? (
        <Valid val={val} setValid={setVal}></Valid>
      ) : val == "닉네임" ? (
        <Valid val={val} setValid={setVal}></Valid>
      ) : null}
    </div>
  );
};

export default Personal;
