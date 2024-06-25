import { useEffect, useRef, useState } from "react";
import Valid from "../login/Valid";
import "./personal.css";
import { dateList, monthList } from "../../data/join";

const Personal = () => {
  const [open, setOpen] = useState("");
  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "test1234",
    username: "박나라",
    nickname: "몰러",
    gender: "m",
    birth: "19850213",
  }); // 백에서 받아와야하는 정보

  const [month, setMonth] = useState(`${Number(formData.birth.slice(4, 6))}`);
  const [date, setDate] = useState(`${Number(formData.birth.slice(6))}`);
  const [isRight, setIsRight] = useState(false);

  const [keepClicked, setKeepClicked] = useState(0);
  const [val, setVal] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.currentTarget.id;

    if (key === "password") {
      ValidatePw(e.currentTarget.value);
    }

    if (e.currentTarget.id === "year") {
      key = "birth";
    }

    let value = e.currentTarget.value;

    if (e.currentTarget.id === "year") {
      const year = e.currentTarget.value;

      const birth = year + month + date;
      value = birth;
    }

    const updatedUser = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedUser);
  };

  console.log(formData);

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

  const emailTag = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailTag.current) emailTag.current.focus();
  }, []);

  const [inputValue, setInputValue] = useState({
    email: "",
    validEmail: false,
    nonEmailDuplication: false, //이메일 중복확인 여부
    pw: "",
    validPw: false,
    name: "",
    validName: false,
    nick: "",
    validNick: false,
    gender: "",
    validGender: false,
    year: "",
    validYear: false,
    month: "",
    validMonth: false,
    date: "",
    validDate: false,
  });

  const submitRequirements =
    inputValue.email &&
    inputValue.validEmail &&
    inputValue.pw &&
    inputValue.validPw &&
    inputValue.name &&
    inputValue.validName &&
    inputValue.nick &&
    inputValue.validNick &&
    inputValue.gender &&
    inputValue.validGender &&
    inputValue.year &&
    inputValue.validYear &&
    inputValue.month &&
    inputValue.validMonth &&
    inputValue.date &&
    inputValue.validDate;

  const ValidatePw = (value: string) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const result = pwRegex.test(value);

    setIsRight(result);
  };

  useEffect(() => {
    const nameRegex = /^[가-힣]{2,5}$/;
    setInputValue((prev) => ({
      ...prev,
      validName: nameRegex.test(inputValue.name),
    }));
  }, [inputValue.name]);

  useEffect(() => {
    const nickRegex = /^[a-zA-Z가-힣0-9_]{2,20}$/;
    setInputValue((prev) => ({
      ...prev,
      validNick: nickRegex.test(inputValue.nick),
    }));
  }, [inputValue.nick]);

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      gender: formData.gender,
      validGender: formData.gender !== "",
    }));
  }, [formData.gender]);

  useEffect(() => {
    const yearRegex = /^[0-9]{4}$/;
    setInputValue((prev) => ({
      ...prev,
      validYear: yearRegex.test(inputValue.year),
    }));
  }, [inputValue.year]);

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      month: month,
      validMonth: month !== "월",
    }));
  }, [month]);

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      date: date,
      validDate: date !== "일",
    }));
  }, [date]);

  console.log(formData.gender);

  return (
    <div className="personal">
      <h3 className="join-title">개인 정보 수정</h3>
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
                (inputValue.validEmail === true ? "confirm" : "")
              }
              ref={emailTag}
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
                (inputValue.validPw === true ? "confirm" : "")
              }
              id="password"
              type="password"
              placeholder="비밀번호(8자~12자, 영문+숫자+특수문자 사용)"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <p className={`personal-error ${!isRight ? "visible" : ""}`}>
            비밀번호(8자~12자, 영문+숫자+특수문자 사용)
          </p>

          <div className="personal-body-input">
            <input
              defaultValue={formData.username}
              className={
                "personal-body-inputbox" +
                (inputValue.validName === true ? "confirm" : "")
              }
              id="username"
              type="text"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="personal-body-input">
            <input
              defaultValue={formData.nickname}
              className={
                "personal-body-inputbox" +
                (inputValue.validNick === true ? "confirm" : "")
              }
              id="nickname"
              type="text"
              placeholder="닉네임"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="personal-body-input">
            <input
              defaultValue={formData.gender === "m" ? "남" : "여"}
              type="button"
              className={
                "personal-li" + (inputValue.gender === "성별" ? "" : "confirm")
              }
              id="gender"
              onClick={() => setOpen("gender")}
              onChange={(e) => handleChange(e)}
              value={formData.gender === "m" ? "남" : "여"}
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
                  (inputValue.validYear === true ? "confirm" : "")
                }
                type="text"
                placeholder="년(예 1996)"
                maxLength={4}
                id="year"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="personal-body-input">
              <input
                type="button"
                defaultValue={`${month}월`}
                className={
                  "personal-li" + (inputValue.month === "월" ? "" : "confirm")
                }
                onClick={() => setOpen("month")}
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
                className={
                  "personal-li" + (inputValue.date === "일" ? "" : "confirm")
                }
                onClick={() => setOpen("date")}
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
          </div>
          <button
            type="button"
            className={
              "join-body-button" + (submitRequirements === true ? "active" : "")
            }
            disabled={!submitRequirements}
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
