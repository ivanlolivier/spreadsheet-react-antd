import { Input } from 'antd';

import type { CellRenderProps } from '../types';

export default function NumberCell({ value, onChange, onKeyDown }: CellRenderProps<number>) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
}
