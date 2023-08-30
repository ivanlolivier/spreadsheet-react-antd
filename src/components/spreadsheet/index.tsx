import { useState, useRef } from "react";
import './styles.css';

type Props = {
  columns: string[];
  rows: (string | number)[][];
};

function Spreadsheet({ columns, rows }: Props) {
  const [data, setData] = useState(rows);
  const [activeCell, setActiveCell] = useState<{row: number, col: number}>({row: 0, col: 0});
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const inputRef = useRef(null);

  const handleTableFocus = () => {
    if (!activeCell) {
      setActiveCell({ row: 0, col: 0 });
    }
  };

  const handleKeyDown = (event: any) => {
    if (isEditing) return;

    let { row, col } = activeCell;

    switch (event.key) {
      case "ArrowRight":
      case "Tab":
        event.preventDefault();
        if (event.shiftKey && col > 0) {
          col--;
        } else if (event.shiftKey && col === 0 && row > 0) {
          row--;
          col = columns.length - 1; // move to the last column of the previous row
        } else {
          col++;
        }
        if (col === columns.length && row < data.length - 1) {
          col = 0;
          row++;
        }
        break;
      case "ArrowLeft":
        col--;
        if (col < 0 && row > 0) {
          row--;
          col = columns.length - 1; // move to the last column of the previous row
        }
        break;
      case "ArrowDown":
        row++;
        break;
      case "ArrowUp":
        row--;
        break;
      case "Enter":
        setIsEditing(true);
        break;
      default:
        return;
    }

    // Ensure we're not going out of bounds
    if (row < 0) row = 0;
    if (col < 0) col = 0;
    if (row >= data.length) row = data.length - 1;
    if (col >= columns.length) col = columns.length - 1;

    setActiveCell({ row, col });
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event: any, rowIndex: number, colIndex: number) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = event.target.value;
    setData(newData);
  };

  const handleInputKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      tableRef.current?.focus();
    }
  };

  return (
    <table
      ref={tableRef}
      onFocus={handleTableFocus}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>
            {col}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cellData, colIndex) => (
            <td
              key={colIndex}
              style={{
                background:
                  rowIndex === activeCell?.row && colIndex === activeCell?.col
                    ? "#E5E7EB"
                    : "white",
                outline:
                  rowIndex === activeCell?.row &&
                  colIndex === activeCell?.col &&
                  !isEditing
                    ? "2px solid blue"
                    : "none"
              }}
              onClick={() => setActiveCell({ row: rowIndex, col: colIndex })}
              onDoubleClick={() => {
                setActiveCell({ row: rowIndex, col: colIndex });
                setIsEditing(true);
              }}
            >
              {isEditing &&
              activeCell?.row === rowIndex &&
              activeCell?.col === colIndex ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={cellData}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  autoFocus
                />
              ) : (
                cellData
              )}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Spreadsheet;
