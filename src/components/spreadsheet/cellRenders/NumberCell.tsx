import { WarningOutlined } from '@ant-design/icons';
import { Input, InputRef, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

import type { CellRenderProps } from '../types';

export default function NumberCell({
  value, onChange, onKeyDown, editable, error,
}: CellRenderProps<number>) {
  const ref = useRef<InputRef>(null);
  useEffect(() => {
    if (editable) {
      ref.current?.focus();
    }
  }, [editable]);

  return (
    <Input
      status={error ? 'error' : undefined}
      suffix={
      error && typeof error === 'string'
        ? <Tooltip title={error}>
          <WarningOutlined style={{ color: 'red' }} />
        </Tooltip>
        : undefined
      }
      ref={ref}
      type="number"
      value={value}
      onChange={(event) => {
        onChange(Number(event.target.value));
      }}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
}
