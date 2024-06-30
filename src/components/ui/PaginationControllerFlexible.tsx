import "./paginationControllerFlexible.css";

export interface PaginationControllerFlexibleProps {
  arrayLengthMin: number;
  arrayLengthMax: number;
  arrayLengthDefault: number;
  limit: number;
  setLimit: (value: number) => void;
  UNIT_NAME: string;
}

const PaginationControllerFlexible = ({
  arrayLengthMin,
  arrayLengthMax,
  arrayLengthDefault,
  limit,
  setLimit,
  UNIT_NAME,
}: PaginationControllerFlexibleProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    console.log(value);
    setLimit(Number(value));
  };
  return (
    <div className="pagination-controller-flexible">
      <p>페이지 당 {UNIT_NAME} 수</p>
      <ul className="pagination-controller-flexible-container">
        <li className="pagination-controller-flexible-item">
          <input
            type="range"
            min={arrayLengthMin}
            max={arrayLengthMax}
            step={1}
            defaultValue={arrayLengthDefault}
            onChange={(e) => handleInputChange(e)}
          />
          <span>{limit}</span>
        </li>
      </ul>
    </div>
  );
};

export default PaginationControllerFlexible;
