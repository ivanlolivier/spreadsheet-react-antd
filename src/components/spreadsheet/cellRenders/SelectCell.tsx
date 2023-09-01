import { Select } from 'antd';

import type { CellRenderProps, SelectColumn } from '../types';

type Props = CellRenderProps<string> & {column: SelectColumn};

export default function SelectCell({
  value, column, onChange, onBlur,
}: Props) {
  return <Select
    value={value}
    style={{ width: 120 }}
    showSearch={true}
    onChange={(v) => {
      onChange(v);
      onBlur();
    }}
    open
    autoFocus
    options={column.options}
  />;
}
