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
        setBlocks(res.data);
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
      <h3 className="blocks-title">신고 목록</h3>

      <div className="blocks-panels">패널</div>
      <div className="blocks-list">
        <ul className="blocks-list-container">
          {blocks.length === 0 && (
            <li className="blocks-list-item">
              <NoSearchData />
            </li>
          )}
          {blocks.map((block, index) => (
            <li className="blocks-list-item" key={block.blockId}>
              <div className="blocks-list-userId">{block.userId}</div>
              <div className="blocks-list-blockedId">{block.blockedId}</div>
              <div className="blocks-list-blockDate">{block.blockDate}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="blocks-search">검색</div>
      <div className="blocks-pagination">페이징</div>
    </div>
  );
};

export default Blocks;
