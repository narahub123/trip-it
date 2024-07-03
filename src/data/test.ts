import { ReportType } from "../types/reports";
import { UserType } from "../types/user";

export const users: UserType[] = [
  {
    user_id: 1,
    email: "test1@gmail.com",
    username: "박나라",
    nickname: "몰러",
    password: "test@1234",
    birth: "19850213",
    gender: "m",
    intro: "몰러요",
    role: "a",
    regdate: "20240610",
    userpic: "/images/male-profile-image.png",
    report_count: 0,
    end_date: undefined,
  },
  {
    user_id: 2,
    email: "test2@gmail.com",
    username: "박나래",
    nickname: "몰러2",
    password: "test@1234",
    birth: "19870523",
    gender: "f",
    intro: "몰러요",
    role: "b",
    regdate: "20240611",
    userpic: "/images/male-profile-image.png",
    report_count: 3,
    end_date: undefined,
  },
  {
    user_id: 3,
    email: "test3@gmail.com",
    username: "박내라",
    nickname: "몰러3",
    password: "test@1234",
    birth: "20050911",
    gender: "m",
    intro: "몰러요",
    role: "c",
    regdate: "20240613",
    userpic: "/images/male-profile-image.png",
    report_count: 1,
    end_date: undefined,
  },
  {
    user_id: 4,
    email: "test4@gmail.com",
    username: "강해린",
    nickname: "강고양이",
    password: "test@1234",
    birth: "20060515",
    gender: "f",
    intro: "강한 뉴진스",
    role: "d",
    regdate: "20240613",
    userpic: "/images/female-profile-image.png",
    report_count: 1,
    end_date: undefined,
  },
  {
    user_id: 5,
    email: "test5@gmail.com",
    username: "팜하니",
    nickname: "하니팜",
    password: "test@1234",
    birth: "20041015",
    gender: "f",
    intro: "대퓨님",
    role: "e",
    regdate: "20240615",
    userpic: "/images/female-profile-image.png",
    report_count: 0,
    end_date: undefined,
  },
  {
    user_id: 6,
    email: "test6@gmail.com",
    username: "김민지",
    nickname: "곰아지",
    password: "test@1234",
    birth: "20040507",
    gender: "f",
    intro: "뉴진스에 리더는 없지만 김민지는 있음",
    role: "f",
    regdate: "20240315",
    userpic: "/images/female-profile-image.png",
    report_count: 2,
    end_date: undefined,
  },
  {
    user_id: 7,
    email: "test7@gmail.com",
    username: "다니엘",
    nickname: "디즈니",
    password: "test@1234",
    birth: "20050407",
    gender: "f",
    intro: "호주즈",
    role: "f",
    regdate: "20240318",
    userpic: "/images/female-profile-image.png",
    report_count: 1,
    end_date: undefined,
  },
];

export const reports: ReportType[] = [
  {
    report_id: 1,
    msg_id: "1_1",
    user_id: 1,
    reported_user_id: 2,
    report_cate: "R1",
    report_detail: "궁시렁 궁시렁 ",
    report_date: "20240702",
    report_false: 0,
  },
  {
    report_id: 2,
    msg_id: "3_1",
    user_id: 1,
    reported_user_id: 3,
    report_detail: "",
    report_cate: "R2",
    report_date: "20240702",
    report_false: 1,
  },
  {
    report_id: 3,
    post_id: "3",
    user_id: 5,
    reported_user_id: 3,
    report_detail: "",
    report_cate: "R3",
    report_date: "20240701",
    report_false: 2,
  },
  {
    report_id: 4,
    msg_id: "2",
    user_id: 4,
    reported_user_id: 1,
    report_detail: "금전 거래를 유도합니다. 해결해주세요.",
    report_cate: "R4",
    report_date: "20240703",
    report_false: 3,
  },
  {
    report_id: 5,
    msg_id: "1_2",
    user_id: 3,
    reported_user_id: 2,
    report_cate: "R1",
    report_detail: "궁시렁 궁시렁 ",
    report_date: "20240704",
    report_false: 0,
  },
];
