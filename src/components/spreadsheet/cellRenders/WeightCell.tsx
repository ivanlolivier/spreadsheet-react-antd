import { Button, Space } from 'antd';

import type { CellRenderProps } from '../types';

import NumberCell from './NumberCell.tsx';

export default function WeightCell(props: CellRenderProps<number>) {
  return <Space.Compact style={{ width: '100%' }}>
    <NumberCell {...props} />
    <Button type="primary">Take</Button>
  </Space.Compact>;
}
