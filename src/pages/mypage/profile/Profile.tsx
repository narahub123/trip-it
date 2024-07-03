import { useEffect, useRef, useState } from "react";
import "./profile.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import axios from "axios";

import { getCookie } from "../../../utils/Cookie";

export interface FormDataType {
  userpic?: string;
}

const baseURL = process.env.REACT_APP_SERVER_URL;

const Profile = () => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({
    gender: "",
    nickname: "",
    userpic: "",
    intro: "",
  });

  console.log(user);

  useEffect(() => {
    axios
      .get(`${baseURL}/mypage/profile`, {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        return response.data;
      });
  }, []);

  const [image, setImage] = useState<File | undefined>(undefined);
  const [formData, setFormData] = useState({
    gender: user.gender,
    nickname: user.nickname,
    userpic: user.userpic,
    intro: user.intro,
  });

  const [popupMsg, setPopupMsg] = useState("");

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

  // 이미지에 변화가 있으면 업데이트
  useEffect(() => {
    console.log(image);

    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  // 이미지 업로드 및 formData 업데이트
  const handleImageUpload = async (image: File) => {
    if (!image) return;
    // 이미지 업로드는 나중에
    // 이미지를 업로드하고 받은 url 주소를 db로 보냄
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setImagePercent(Math.round(progress));
        console.log("upload is " + progress + "% done");
      },
      (error) => {
        // setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // formData 업데이트
          setFormData({ ...user, userpic: downloadURL });
        });
      }
    );
  };

  // 닉네임과 자기 소개글 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);

    const updatedFormData = {
      ...user,
      [e.currentTarget.className]: e.currentTarget.value,
    };

    setFormData(updatedFormData);
  };

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm(`업데이트하시겠습니까?`)) {
      return;
    }
    e.preventDefault();
    // fetch("/user/:userId", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "applicatoin/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    await axios
      .post(
        baseURL + "/mypage/profile/update",
        {
          nickname: formData.nickname,
          userpic: formData.userpic,
          intro: formData.intro,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Access: `${localStorage.getItem("access")}`,
            Refresh: `${getCookie("refresh")}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.alert("업데이트가 완료되었습니다.");
        }
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err.response);

        const msg = err.response.data.title;
        const status = err.response.data.status;
        setPopupMsg(msg);
        //errorhandling
        // if (status === 404) {
        //   const reply = `데이터베이스와의 연결 상태가 좋지 못합니다. \n잠시 후에 다시 이용해주세요`;
        //   console.log(reply);
        //   setPopupMsg(reply);
        // }
        console.log(msg, status);
      });
  };

  console.log(hasChanged());

  return (
    <div className="profile">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="file"
          ref={imageRef}
          hidden
          className="userpic"
          onChange={(e) =>
            setImage(
              e.currentTarget?.files ? e.currentTarget.files[0] : undefined
            )
          }
        />
        <figure
          className="profile-image-container"
          onClick={() => imageRef.current?.click()}
        >
          <img
            src={
              user.userpic.length !== 0
                ? user.userpic
                : user.gender === "f"
                ? `/images/female-profile-image.jpg`
                : `/images/male-profile-image.jpg`
            }
            alt=""
          />
        </figure>
        <input
          type="text"
          className="nickname"
          defaultValue={user.nickname}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="intro"
          defaultValue={user.intro}
          placeholder="자기소개를 적어주세요"
          onChange={(e) => handleChange(e)}
        />
        <button disabled={hasChanged() === "notChanged" ? true : false}>
          프로필 수정
        </button>
      </form>
      <div className="profile-popup">{popupMsg}</div>
    </div>
  );
};

export default Profile;
