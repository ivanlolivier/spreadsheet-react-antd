import './App.css';
import { Select } from 'antd';

import Spreadsheet from './components/spreadsheet';
import { Column } from './components/spreadsheet/spreadsheet';

const columns: Column[] = [
  { name: 'Name', key: 'name', type: 'text' },
  { name: 'Age', key: 'age', type: 'number' },
  {
    name: 'Country', key: 'country', type: 'select', options: ['Uruguay', 'Argentina', 'Peru'],
  },
  {
    name: 'Type',
    key: 'type',
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
          { value: 'jackvalue', label: 'Jack Label' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
        ]}
      /> : <Select
      key='non-editable'
      value='Yiminghe'
      style={{ width: 120 }}
      open={false}
      options={[
        { value: 'jackvalue', label: 'Jack Label' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />),
  },
];

const rows = [
  {
    name: 'John Doe', age: 23, type: 'lucy', country: 'Uruguay',
  },
  {
    name: 'John Smith', age: 25, type: 'lucy', country: 'Uruguay',
  },
  {
    name: 'Ana Doe', age: 40, type: 'Yiminghe', country: 'Uruguay',
  },
];

function App() {
  return (
      <Spreadsheet columns={columns} rows={rows} />
  );
}

export default App;
