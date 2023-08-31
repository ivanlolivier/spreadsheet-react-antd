import {
  useState, useRef, Element, KeyboardEvent,
} from 'react';

import './styles.css';
import { TextCell, NumberCell, SelectCell } from './cellRenders';
import { Column, ColumnType } from './spreadsheet';

type Props = {
  columns: Column[];
  rows: {[key:string]: any}[];
};

const componentPerType: Record<ColumnType, Element> = {
  number: NumberCell,
  text: TextCell,
  select: SelectCell,
  custom: null,
};

function Spreadsheet({ columns, rows }: Props) {
  const [data, setData] = useState(rows);
  const [activeCell, setActiveCell] = useState<{row: number, col: number}>({ row: 0, col: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleTableFocus = () => {
    if (!activeCell) {
      setActiveCell({ row: 0, col: 0 });
    }
  };

  const handleKeyDown = (event: any) => {
    if (isEditing) return;

    let { row, col } = activeCell;

    switch (event.key) {
      case 'ArrowRight':
      case 'Tab':
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
      case 'ArrowLeft':
        col--;
        if (col < 0 && row > 0) {
          row--;
          col = columns.length - 1; // move to the last column of the previous row
        }
        break;
      case 'ArrowDown':
        row++;
        break;
      case 'ArrowUp':
        row--;
        break;
      case 'Enter':
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

  const handleInputChange = (newValue: unknown, rowIndex: number, colKey: string) => {
    const newData = [...data];
    newData[rowIndex][colKey] = newValue;
    setData(newData);
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    const stopEditingKeys = ['Enter', 'Escape', 'Tab'];

    if (stopEditingKeys.includes(event.key)) {
      event.preventDefault();

      setIsEditing(false);
      tableRef.current?.focus();
    }
  };

  const renderCell = ({
    row, column, activeCell, rowIndex, colIndex,
  }) => {
    const editableMode = isEditing && activeCell?.row === rowIndex && activeCell?.col === colIndex;

    if (!editableMode) {
      return row[column.key];
    }

    const Component = componentPerType[column.type] ?? column.render ?? null;

    if (Component) {
      return <Component
        row={row}
        column={column}
        value={row[column.key]}
        onChange={(newValue) => handleInputChange(newValue, rowIndex, column.key)}
        onKeyDown={handleInputKeyDown}
        onBlur={() => {
          setIsEditing(false);
          tableRef.current?.focus();
        }}
      />;
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
          <th key={index}>{col.name}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              style={{
                background:
                  rowIndex === activeCell?.row && colIndex === activeCell?.col
                    ? '#E5E7EB'
                    : 'white',
                outline:
                  rowIndex === activeCell?.row
                  && colIndex === activeCell?.col
                  && !isEditing
                    ? '2px solid blue'
                    : 'none',
              }}
              onClick={() => setActiveCell({ row: rowIndex, col: colIndex })}
              onDoubleClick={() => {
                setActiveCell({ row: rowIndex, col: colIndex });
                setIsEditing(true);
              }}
            >
              {renderCell({
                row, column, activeCell, rowIndex, colIndex,
              })}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Spreadsheet;
