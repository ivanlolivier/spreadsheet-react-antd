import { Input } from 'antd';

import type { CellRenderProps } from '../types';

export default function TextCell({ value, onChange, onKeyDown }: CellRenderProps<string>) {
  return (
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
      />
  );
}
