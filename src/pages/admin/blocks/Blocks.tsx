import React, { useEffect, useState } from "react";
import "./blocks.css";
import { fetchBlocksAPI } from "../../../apis/blocks";
import { BlockType } from "../../../types/blocks";
import NoSearchData from "../../../components/ui/NoSearchData";

const Blocks = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlocksAPI()
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
  }, []);

  if (loading) return <div className="blocks">loading...</div>;

  return (
    <div className="blocks">
      <h3 className="blocks-title">차단 목록</h3>

      <div className="blocks-panels">패널</div>
      <div className="blocks-list">
        <table className="blocks-list-table">
          <thead className="blocks-list-table-head">
            <tr className="blocks-list-table-head-row">
              <th className="blocks-list-table-head-cell">차단 아이디</th>
              <th className="blocks-list-table-head-cell">유저 아이디</th>
              <th className="blocks-list-table-head-cell">차단 유저 아이디</th>
              <th className="blocks-list-table-head-cell">차단 날짜</th>
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
                <td className="blocks-list-table-body-cell">{block.userId}</td>
                <td className="blocks-list-table-body-cell">
                  {block.blockedId}
                </td>
                <td className="blocks-list-table-body-cell">
                  {block.blockDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="blocks-search">검색</div>
      <div className="blocks-pagination">페이징</div>
    </div>
  );
};

export default Blocks;
