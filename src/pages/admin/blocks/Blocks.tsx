import React, { useEffect, useState } from "react";
import "./blocks.css";
import { fetchBlocksAPI, unblockUserAPI } from "../../../apis/blocks";
import { BlockType } from "../../../types/blocks";
import NoSearchData from "../../../components/ui/NoSearchData";
import { useLocation } from "react-router-dom";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const Blocks = () => {
  const { pathname } = useLocation();
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorts, setSorts] = useState<{ [key: string]: string }>({
    blockDate: "desc",
  });
  const [keyword, setKeyword] = useState("blockedId.nickname");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const sortKey = Object.keys(sorts)[0];
    const sortValue = Object.values(sorts)[0];
    fetchBlocksAPI(sortKey, sortValue, keyword, search)
      .then((res) => {
        console.log(res);

        const blocklist = res.data;

        const newBlockList = blocklist.map((block: BlockType) => {
          const newBlockDate = new Date(block.blockDate);

          const year = newBlockDate.getFullYear();
          const month = (newBlockDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const date = newBlockDate.getDate().toString().padStart(2, "0");

          return { ...block, blockDate: `${year}.${month}.${date}.` };
        });

        setBlocks(newBlockList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [sorts, keyword, search]);

  const handleRelease = async (blockId: string | number) => {
    if (!window.confirm(`차단을 해제하시겠습니까?`)) {
      return;
    }

    setLoading(true);
    await unblockUserAPI(blockId)
      .then((res) => {
        console.log(res.data);

        const blocklist = res.data.blocks;

        const newBlockList = blocklist.map((block: BlockType) => {
          const newBlockDate = new Date(block.blockDate);

          const year = newBlockDate.getFullYear();
          const month = (newBlockDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const date = newBlockDate.getDate().toString().padStart(2, "0");

          return { ...block, blockDate: `${year}.${month}.${date}.` };
        });

        setBlocks(newBlockList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSort = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    const sortKey = e.currentTarget.id;
    const sort = e.currentTarget.dataset.sort;

    console.log(sortKey, sort);

    if (sort === "asc") {
      e.currentTarget.dataset.sort = "desc";
      setSorts({ [sortKey]: "desc" });
    } else {
      e.currentTarget.dataset.sort = "asc";
      setSorts({ [sortKey]: "asc" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    const search = e.currentTarget.value;
    setSearch(search);
  };

  if (loading) return <div className="blocks">loading...</div>;

  console.log("blocks", blocks);
  console.log(Object.keys(sorts)[0]);
  console.log(sorts[Object.keys(sorts)[0] as keyof typeof sorts]);

  return (
    <div className="blocks">
      <h3 className="blocks-title">차단 목록</h3>

      <div className="blocks-panels">패널</div>
      <div className="blocks-list">
        <table className="blocks-list-table">
          <thead className="blocks-list-table-head">
            <tr className="blocks-list-table-head-row" key={"block nosearch"}>
              <th
                className="blocks-list-table-head-cell"
                id="index"
                data-sort="asc"
                onClick={(e) => handleSort(e)}
              >
                번호
              </th>
              {/* {pathname !== "/mypage/blocks" && ( */}
              <th
                className="blocks-list-table-head-cell"
                id="userId.nickname"
                data-sort="asc"
                onClick={(e) => handleSort(e)}
              >
                차단한 유저
                <span>
                  {Object.keys(sorts)[0] === "userId.nickname" &&
                  sorts[Object.keys(sorts)[0] as keyof typeof sorts] ===
                    "desc" ? (
                    <LuChevronDown />
                  ) : (
                    <LuChevronUp />
                  )}
                </span>
              </th>
              {/* )} */}
              <th
                className="blocks-list-table-head-cell"
                id="blockedId.nickname"
                data-sort="asc"
                onClick={(e) => handleSort(e)}
              >
                차단당한 유저
                <span>
                  {Object.keys(sorts)[0] === "blockedId.nickname" &&
                  sorts[Object.keys(sorts)[0] as keyof typeof sorts] ===
                    "desc" ? (
                    <LuChevronDown />
                  ) : (
                    <LuChevronUp />
                  )}
                </span>
              </th>
              <th
                className="blocks-list-table-head-cell"
                id="blockDate"
                data-sort="asc"
                onClick={(e) => handleSort(e)}
              >
                차단 날짜
                <span>
                  {Object.keys(sorts)[0] === "blockDate" &&
                  sorts[Object.keys(sorts)[0] as keyof typeof sorts] ===
                    "desc" ? (
                    <LuChevronDown />
                  ) : (
                    <LuChevronUp />
                  )}
                </span>
              </th>
              <th className="blocks-list-table-head-cell">차단 해재</th>
            </tr>
          </thead>
          <tbody className="blocks-list-table-body">
            {blocks.length === 0 && (
              <tr className="blocks-list-table-body-row">
                <NoSearchData />
              </tr>
            )}
            {blocks.map((block, index) => (
              <tr className="blocks-list-table-body-row" key={block.blockId}>
                <td className="blocks-list-table-body-cell">{index + 1}</td>
                {/* {pathname !== "/mypage/blocks" && ( */}
                <td
                  className="blocks-list-table-body-cell"
                  // id={`${block.userId._id}`}
                  id={`${block.userId}`}
                >
                  {/* {block.userId.nickname} */}
                  {block.userId}
                </td>
                {/* )} */}
                <td
                  className="blocks-list-table-body-cell"
                  // id={`${block.blockedId._id}`}
                  id={`${block.blockedId}`}
                >
                  {/* {block.blockedId.nickname} */}
                  {block.nickname}
                </td>
                <td className="blocks-list-table-body-cell">
                  {block.blockDate}
                </td>
                <td className="blocks-list-table-body-cell">
                  <button
                    type="button"
                    onClick={() => handleRelease(block.blockId)}
                  >
                    차단 해제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="blocks-search">
        <select name="" id="keyword">
          <option value="userId.nickname">차단한 유저</option>
          <option value="blockedId.nickname">차단당한 유저</option>
          <option value="blockDate">차단 날짜</option>
        </select>
        <input type="text" onChange={(e) => handleChange(e)} />
      </div>
      <div className="blocks-pagination">페이징</div>
    </div>
  );
};

export default Blocks;
