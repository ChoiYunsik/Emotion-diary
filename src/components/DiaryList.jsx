import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    //toSorted() : 원본 배열은 유지하고 새로 정렬된 배열을 반환
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    }); // 객체는 비교가 안되서 콜백 함수로 넣어줘야 함
  };

  const sortedData = getSortedDate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>Latest</option>
          <option value={"oldest"}>Oldest</option>
        </select>
        <Button
          onClick={() => {
            nav("/new");
          }}
          text={"새 일기 쓰기"}
          type={"POSITVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
