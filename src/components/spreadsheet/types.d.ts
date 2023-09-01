import { KeyboardEventHandler, ReactNode } from 'react';

/// ///////////////////////////////////////////////////
// Row types

export type Row = {[key:string]: unknown};

/// ///////////////////////////////////////////////////
// Column types

export type ColumnType = 'text' | 'number' | 'select' | 'custom';

type BaseColumn = {
  key: string;
  name: string;
}

type BasicColumn = BaseColumn & {
  type: 'text' | 'number';
}

type SelectColumn = BaseColumn & {
  type: 'select';
  options: { value: string, label: string }[];
}

type CustomColumn = BaseColumn & {
  type: 'custom';
  render: (record: unknown) => ReactNode;
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
  onChange: (newValue: T) => void;// ChangeEventHandler<T>;
  onKeyDown: KeyboardEventHandler;
  onBlur: () => void;
}
