import { ReactNode } from 'react';

export type ColumnType = 'text' | 'number' | 'select' | 'custom';

export type Column = {
  key: string;
  name: string;
  type: ColumnType;
} & ({
  type: 'custom';
  render: (record: any) => ReactNode;
} | {
  type: 'select';
  options: string[];
});
