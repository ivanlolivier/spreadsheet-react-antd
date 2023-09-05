import { ReactNode, useEffect } from 'react';

import type { CellRenderProps } from '../types';

export default function ReadOnlyCell({
  value, column, record, editable, onBlur,
}: CellRenderProps<number>) {
  if (column.type !== 'read-only') {
    throw new Error('Invalid column type');
  }

  useEffect(() => {
    onBlur();
  }, [editable]);

  const calculatedValue = column.calc ? column.calc(record) : value;
  const formatterValue = column.formatter ? column.formatter(calculatedValue) : calculatedValue;

  return <span>{formatterValue as ReactNode}</span>;
}
