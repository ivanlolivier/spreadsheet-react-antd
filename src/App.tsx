import './App.css';
import { Select } from 'antd';

import Spreadsheet from './components/spreadsheet';
import { Column } from './components/spreadsheet/types';

const columns: Column[] = [
  {
    name: 'Material',
    key: 'materialId',
    type: 'custom',
    render: ({
      editable, value, onChange, onBlur,
    }) => (editable ? <Select
      key='editable'
      value={value}
      style={{ width: 120 }}
      showSearch={true}
      onChange={(v) => {
        onChange(v);
        onBlur();
      }}
      open
      autoFocus
      options={[
        { value: '4321', label: 'Aluminium Cans' },
        { value: '1234', label: 'Copper #1' },
      ]}
    /> : <Select
      key='non-editable'
      value={value}
      style={{ width: 120 }}
      open={false}
      options={[
        { value: '4321', label: 'Aluminium Cans' },
        { value: '1234', label: 'Copper #1' },
      ]}
    />),
  },
  {
    name: 'Prod. Desc.',
    key: 'productDescriptionId',
    type: 'custom',
    render: () => <div>Prod desc</div>,
  },
  {
    name: 'Gross (lb)', key: 'grossWeight', type: 'weight', validate: (v: number) => (v < 0 ? 'Gross should be greater than 0' : false),
  },
  {
    name: 'Tare (lb)', key: 'tareWeight', type: 'weight', validate: (v, { grossWeight }) => (v > grossWeight ? 'Tare should be greater or equal than gross' : false),
  },
  {
    name: 'Net (lb)', key: 'netWeight', type: 'read-only', calc: ({ grossWeight = 0, tareWeight = 0 }) => grossWeight - tareWeight,
  },
  { name: 'Unit Price', key: 'unitPrice', type: 'number' },
  {
    name: 'Pricing Unit',
    key: 'pricingUnit',
    type: 'select',
    options: [
      { value: 'pounds', label: 'pounds' },
      { value: 'netTons', label: 'netTons' },
      { value: 'grossTons', label: 'grossTons' },
      { value: 'shortHundredweight', label: 'shortHundredweight' },
    ],
  },
  {
    name: 'Total (USD)', key: 'totalPrice', type: 'read-only', formatter: (v) => `$${v}`,
  },
  { name: 'Notes', key: 'notes', type: 'text' },
];

const rows = [
  {
    materialId: '1234', // 'Aluminium Cans',
    productDescriptionId: '1',
    grossWeight: 11,
    tareWeight: 1,
    unitPrice: 0.98,
    totalPrice: 9.8,
    pricingUnit: 'pounds',
    notes: '',
  },
  {
    materialId: '4321', // 'Cooper #1',
    productDescriptionId: '2',
    grossWeight: 11,
    tareWeight: 1,
    unitPrice: 0.98,
    totalPrice: 9.8,
    pricingUnit: 'pounds',
    notes: '',
  },
];

function App() {
  return (
      <Spreadsheet columns={columns} rows={rows} />
  );
}

export default App;
