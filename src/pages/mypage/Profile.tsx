import { useEffect, useRef, useState } from "react";
import "./profile.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export interface FormDataType {
  userpic?: string;
}

const Profile = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const user = {
    gender: "F",
    nickname: "몰러",
    userpic: "",
    userIntro: "",
  };

  const [image, setImage] = useState<File | undefined>(undefined);
  const [formData, setFormData] = useState({
    userpic: user.userpic,
    nickname: user.nickname,
    userIntro: user.userIntro,
  });

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
          setFormData({ ...formData, userpic: downloadURL });
        });
      }
    );
  };

  // 닉네임과 자기 소개글 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);

    const updatedFormData = {
      ...formData,
      [e.currentTarget.className]: e.currentTarget.value,
    };

    setFormData(updatedFormData);
  };

  console.log(formData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm(`업데이트하시겠습니까?`)) {
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
  };

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
              formData.userpic.length !== 0
                ? formData.userpic
                : user.gender === "F"
                ? `/images/female-profile-image.jpg`
                : `/images/male-profile-image.jpg`
            }
            alt=""
          />
        </figure>
        <table>
          <thead></thead>
          <tbody>
            <tr key={"nickname"}>
              <th>닉네임: </th>
              <td>
                <input
                  type="text"
                  className="nickname"
                  defaultValue={user.nickname}
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr key={`userIntro`}>
              <th>자기소개:</th>
              <td>
                <input
                  type="text"
                  className="userIntro"
                  defaultValue={user.userIntro}
                  placeholder="자기소개를 적어주세요"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>업데이트</button>
      </form>
    </div>
  );
};

export default Profile;
