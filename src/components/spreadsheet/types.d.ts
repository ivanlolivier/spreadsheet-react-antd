import { KeyboardEventHandler, ReactElement, ReactNode } from 'react';

export type Cell = {row: number, col: number};

/// ///////////////////////////////////////////////////
// Row types

export type Row = {[key:string]: unknown};

/// ///////////////////////////////////////////////////
// Column types

export type ColumnType = 'text' | 'number' | 'select' | 'custom' | 'read-only' | 'weight';

type BaseColumn = {
  key: string;
  name: string;
  type: ColumnType;
  validate?: (value: unknown, record: Row) => false | string;
}

type BasicColumn = BaseColumn & {
  type: 'text' | 'number' | 'read-only' | 'weight';
  formatter?: (v: unknown) => ReactNode;
  calc?: (record: Row) => unknown;
}

type SelectColumn = BaseColumn & {
  type: 'select';
  options: { value: string, label: string }[];
}

type CustomColumn = BaseColumn & {
  type: 'custom';
  render: (options: CellRenderProps) => ReactElement;
}

export type Column = BasicColumn | SelectColumn | CustomColumn;

/// ///////////////////////////////////////////////////
// Props types

export type SpreadsheetProps = {
  columns: Column[];
  rows: Row[];
}

export type CellRenderProps<T> = {
  value: T;
  column: Column;
  record: Row;
  onChange: (newValue: T) => void;// ChangeEventHandler<T>;
  onKeyDown: KeyboardEventHandler;
  onBlur: () => void;
  editable: boolean;
  error: boolean | string;
}
