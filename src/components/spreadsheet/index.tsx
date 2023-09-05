import {
  useState, useRef, KeyboardEvent, ReactElement,
} from 'react';

import './styles.css';
import { componentPerType } from './config.ts';
import type {
  Cell,
  Column, Row, SpreadsheetProps,
} from './types';

function Spreadsheet({ columns, rows }: SpreadsheetProps) {
  const [data, setData] = useState(rows);
  const [activeCell, setActiveCell] = useState<Cell | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleTableFocus = () => {
    if (!activeCell) {
      setActiveCell({ row: 0, col: 0 });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isEditing) return;
    event.preventDefault();

    let { row, col } = activeCell!;

    switch (event.key) {
      case 'ArrowRight':
      case 'Tab':
        if (event.shiftKey && col > 0) {
          col -= 1;
        } else if (event.shiftKey && col === 0 && row > 0) {
          row -= 1;
          col = columns.length - 1; // move to the last column of the previous row
        } else {
          col += 1;
        }
        if (col === columns.length && row < data.length - 1) {
          col = 0;
          row += 1;
        }
        break;
      case 'ArrowLeft':
        col -= 1;
        if (col < 0 && row > 0) {
          row -= 1;
          col = columns.length - 1; // move to the last column of the previous row
        }
        break;
      case 'ArrowDown':
        row += 1;
        break;
      case 'ArrowUp':
        row -= 1;
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
    setData((d) => {
      const newData = [...d].map((e) => ({ ...e }));
      newData[rowIndex][colKey] = newValue;

      return newData;
    });
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
    row, column, rowIndex, colIndex,
  }: { row: Row, column: Column, rowIndex: number, colIndex: number }): ReactElement => {
    const editableMode = isEditing && activeCell?.row === rowIndex && activeCell?.col === colIndex;

    const Component = column.type === 'custom' ? column.render : componentPerType[column.type];
    if (!Component) {
      throw new Error('Invalid column type');
    }

    const value = row[column.key];
    const error = column.validate?.(value, row) ?? false;

    if (error) {
      console.log(column.key, value, error);
    }

    return <div>
      <Component
      record={row}
      column={column}
      value={value}
      onChange={(newValue) => handleInputChange(newValue, rowIndex, column.key)}
      onKeyDown={handleInputKeyDown}
      onBlur={() => {
        setIsEditing(false);
        tableRef.current?.focus();
      }}
      editable={editableMode}
      error={error}
    />
    </div>;
  };

  return (
    <>
    <table
      ref={tableRef}
      onFocus={handleTableFocus}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <thead>
      <tr>
        {columns.map((col) => (<th key={col.key}>{col.name}</th>))}
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
                row, column, rowIndex, colIndex,
              })}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
      <pre style={{ color: 'white', textAlign: 'left' }}>{JSON.stringify({ data, activeCell, isEditing }, null, 2)}</pre>
    </>
  );
}

export default Spreadsheet;
