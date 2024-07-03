import { useEffect, useRef, useState } from "react";
import { ScheduleReturnType, ScheduleType } from "../../../types/schedules";
import SchedulesCard from "./SchedulesCard";
import "./schedules.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate, store } from "../../../store/store";
import { metroName } from "../../../utils/metro";
import { debounce } from "../../../utils/debounce";
import Pagination from "../../../components/ui/Pagination";
import { FiMoreVertical } from "react-icons/fi";
import { getSchedules } from "../../../store/slices/returnSlice";

export interface SchedulesProps {
  schedules: ScheduleReturnType[];
}

const Schedules = ({ schedules }: SchedulesProps) => {
  // db와 연결했을 때 사용
  // const schedules = useSelector((state: Rootstate) => state.return.schedules);

  // db와 연결했을 때 사용
  // useEffect(() => {
  //   store.dispatch(getSchedules());
  // }, []);

  // 설정 열고 닫기
  const [isOpen, setIsOpen] = useState(false);
  // 삭제 체크 박스 표시 여부
  const [showDelete, setShowDelete] = useState(false);

  const scheduleDeletions = schedules.map((schedule) => {
    const scheduleId = schedule.scheduleId ? schedule.scheduleId : 0;
    const deletion = {
      scheduleId,
      deletion: false,
    };

    return deletion;
  });

  console.log(scheduleDeletions);

  // 삭제할 일정 배열
  const [deletions, setDeletions] = useState<
    {
      scheduleId: number;
      deletion: boolean;
    }[]
  >(scheduleDeletions);

  console.log(deletions);

  const limitArray = [1, 2, 3, 4];

  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;

  const [filteredSchedules, setFilteredSchedules] =
    useState<ScheduleReturnType[]>(schedules);
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handleSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = e.currentTarget.id;

    let sortedSchedules = filteredSchedules;
    // 지역 코드 오름차순
    if (id === "areacodeSortIncl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.metroId || !schedule2.metroId) return -1;

        return schedule1.metroId?.localeCompare(schedule2.metroId);
      });
    }

    // 지역 코드 내림차순
    if (id === "areacodeSortDecl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.metroId || !schedule2.metroId) return -1;

        return schedule2.metroId?.localeCompare(schedule1.metroId);
      });
    }

    // 지역 이름 오름차순
    if (id === "areaNameSortIncl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.metroId || !schedule2.metroId) return -1;

        return metroName(schedule1.metroId)?.localeCompare(
          metroName(schedule2.metroId)
        );
      });
    }

    // 지역 이름 내림차순
    if (id === "areaNameSortDecl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.metroId || !schedule2.metroId) return -1;

        return metroName(schedule2.metroId)?.localeCompare(
          metroName(schedule1.metroId)
        );
      });
    }

    // 일정 시작 오름차순
    if (id === "startDateSortIncl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.startDate || !schedule2.startDate) return -1;

        return schedule1.startDate?.localeCompare(schedule2.startDate);
      });
    }

    // 일정 시작 내림차순
    if (id === "startDateSortDecl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.startDate || !schedule2.startDate) return -1;

        return schedule2.startDate?.localeCompare(schedule1.startDate);
      });
    }

    // 일정 기간 오름차순
    if (id === "durationSortIncl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.startDate || !schedule2.startDate) return -1;

        const duration1 =
          Number(schedule1.endDate) - Number(schedule1.startDate);
        const duration2 =
          Number(schedule2.endDate) - Number(schedule2.startDate);

        return duration2 - duration1;
      });
    }

    // 일정 기간 내림차순
    if (id === "durationSortDecl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.startDate || !schedule2.startDate) return -1;

        const duration1 =
          Number(schedule1.endDate) - Number(schedule1.startDate);
        const duration2 =
          Number(schedule2.endDate) - Number(schedule2.startDate);

        return duration1 - duration2;
      });
    }

    // 등록일 오름차순
    if (id === "registerDateSortIncl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.registerDate || !schedule2.registerDate) return -1;

        return schedule1.registerDate?.localeCompare(schedule2.registerDate);
      });
    }

    // 등록일 내림차순
    if (id === "registerDateSortDecl") {
      sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
        if (!schedule1.registerDate || !schedule2.registerDate) return -1;

        return schedule2.registerDate?.localeCompare(schedule1.registerDate);
      });
    }
    setFilteredSchedules(sortedSchedules);
  };

  // 페이지네이션: 고정인 경우
  const handlePagination = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const pageNum = Number(e.currentTarget.dataset.pagenum);
    console.log(pageNum);
    setPage(1);
    setLimit(pageNum);
  };

  // 페이지네이션: 가변인 경우
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    console.log(value);
    setLimit(Number(value));
  };

  // 검색
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    console.log(keyword);
    const newSchedules = schedules.filter((schedule) =>
      schedule.scheduleTitle?.includes(keyword)
    );

    console.log(newSchedules);

    setFilteredSchedules(newSchedules);
  };

  // 설정 열기
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // 삭제 체크 박스 보이기
  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  // 삭제
  const handleDelete = () => {
    // 삭제할 scheduleIds 배열
    const deletionArray = deletions
      .filter((deletion) => deletion.deletion === true)
      .map((result) => result.scheduleId);

    if (deletionArray.length === 0) {
      window.alert("삭제할 일정을 선택해주세요.");
      return;
    }
    if (window.confirm("삭제하시겠습니까?")) {
      return;
    }
    // console.log(deletionArray);

    // api에서 받아 온 배열 조작
    const newSchedules = filteredSchedules.filter((schedule) => {
      if (schedule.scheduleId)
        return !deletionArray.includes(schedule.scheduleId);
    });

    console.log(newSchedules);

    setFilteredSchedules(newSchedules);

    // api에서 삭제
  };

  // 일괄 선택
  const handleSelectAll = () => {
    const newDeletions = deletions.map((deletion) => ({
      scheduleId: deletion.scheduleId,
      deletion: !deletion.deletion,
    }));

    setDeletions(newDeletions);
    console.log(newDeletions);
  };

  console.log(filteredSchedules);

  return (
    <div className="schedules">
      <h3 className="schedules-title">내 여행 일정</h3>
      <div className="schedules-control">
        <div className="schedules-pagination">
          <p>페이지 당 일정 수({limit})</p>
          <ul className="schedules-pagination-container">
            {/* 고정인 경우 */}
            {/* {limitArray.map((limit) => (
              <li
                className="schedules-pagination-item"
                data-pageNum={limit}
                key={limit}
                onClick={(e) => handlePagination(e)}
              >
                {limit}
              </li>
            ))} */}

            {/* 가변인 경우 */}
            <li className="schedules-pagination-item">
              {arrayLengthMin}
              <input
                type="range"
                min={arrayLengthMin}
                max={arrayLengthMax}
                step={1}
                defaultValue={arrayLengthDefault}
                onChange={(e) => handleInputChange(e)}
              />
              {arrayLengthMax}
            </li>
          </ul>
        </div>
        <div className="schedules-right">
          <div className="schedules-sort">
            <ul className="schedules-sort-container">
              <li
                className="schedules-sort-item"
                key={"areacode"}
                id="areacode"
              >
                <p>지역순</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode0"}
                    id="areacodeSortIncl"
                    onClick={(e) => handleSort(e)}
                  >
                    지역코드순서: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode1"}
                    id="areacodeSortDecl"
                    onClick={(e) => handleSort(e)}
                  >
                    지역코드순서: 내림차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode2"}
                    id="areaNameSortIncl"
                    onClick={(e) => handleSort(e)}
                  >
                    지역이름순서: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode3"}
                    id="areaNameSortDecl"
                    onClick={(e) => handleSort(e)}
                  >
                    지역이름순서: 내림차순
                  </li>
                </ul>
              </li>
              <li className="schedules-sort-item" key={"date"} id="date">
                <p>일정순</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date0"}
                    id="startDateSortIncl"
                    onClick={(e) => handleSort(e)}
                  >
                    일정시작날짜: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date1"}
                    id="startDateSortDecl"
                    onClick={(e) => handleSort(e)}
                  >
                    일정시작날짜: 내림차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date2"}
                    id="durationSortIncl"
                    onClick={(e) => handleSort(e)}
                  >
                    일정기간기준: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date3"}
                    id="durationSortDecl"
                    onClick={(e) => handleSort(e)}
                  >
                    일정기간기준: 내림차순
                  </li>
                </ul>
              </li>
              <li
                className="schedules-sort-item"
                key={"register"}
                id="register"
              >
                <p>등록일</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"register0"}
                    id="registerDateSortIncl"
                    onClick={(e) => handleSort(e)}
                  >
                    등록일기준: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"register1"}
                    id="registerDateSortDecl"
                    onClick={(e) => handleSort(e)}
                  >
                    등록일기준: 내림차순
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="schedules-more" title="설정" onClick={handleOpen}>
            <FiMoreVertical />
            {isOpen && (
              <ul className="schedules-more-container">
                <li
                  className="schedules-more-item"
                  key={"delete"}
                  onClick={handleShowDelete}
                >
                  {!showDelete && "삭제"}
                  {showDelete && "삭제 완료"}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          showDelete ? "schedules-deletion-active" : "schedules-deletion"
        }
      >
        <span className="schedules-deletion-item" onClick={handleDelete}>
          삭제
        </span>
        <span className="schedules-deletion-item" onClick={handleSelectAll}>
          일괄 선택
        </span>
        <span
          className="schedules-deletion-item"
          onClick={() => setShowDelete(false)}
        >
          삭제 완료
        </span>
      </div>
      <div className="schedules-cards">
        <ul className="schedules-cards-container">
          {filteredSchedules.length === 0 && (
            <>
              <div className="schedules-cards-logo">
                <img src={`/images/trip-it-logo.png`} alt="" />
                <p>검색결과가 없습니다.</p>
              </div>
            </>
          )}
          {filteredSchedules
            .slice(offset, offset + limit)
            .map((schedule, index) => (
              <SchedulesCard
                schedule={schedule}
                key={index}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                deletions={deletions}
                setDeletions={setDeletions}
              />
            ))}
        </ul>
      </div>
      <div className="schedules-search">
        <input
          id="search"
          type="search"
          placeholder="검색어를 적어주세요"
          style={{
            width: "50%",
            height: "clamp(40px, 2vw, 60px)",
            fontSize: "clamp(12px, 2vw, 16px)",
            paddingLeft: "5px",
          }}
          autoFocus
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      <div className="schedules-pagination-bottom">
        <Pagination
          total={schedules.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Schedules;
