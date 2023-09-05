import { Button, Space } from 'antd';
import { KeyboardEventHandler, useRef } from 'react';

import type { CellRenderProps } from '../types';

import NumberCell from './NumberCell.tsx';

export default function WeightCell({ onKeyDown, onChange, ...props }: CellRenderProps<number>) {
  const ref = useRef<HTMLElement>(null);
  const keyDownHandler: KeyboardEventHandler = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      ref.current?.click();
      return;
    }
    onKeyDown(e);
  };
  return <Space.Compact style={{ width: '100%' }}>
    <NumberCell {...props} onChange={onChange} onKeyDown={keyDownHandler} />
    <Button type="primary" ref={ref} onClick={() => onChange(123)}>Take</Button>
  </Space.Compact>;
}
