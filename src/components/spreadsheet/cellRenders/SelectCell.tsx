import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { Column } from '../spreadsheet';

type Props = {
  column: Column;
  value: string;
  onChange: ChangeEventHandler;
  onKeyDown: KeyboardEventHandler;
  onBlur: () => void;
}

export default function SelectCell({
  value, column, onChange, onBlur,
}: Props) {
  return (
    <select
      autoFocus
      open
      onChange={(event) => {
        onChange(event.target.value);
        onBlur();
      }}
    >
      {column.options?.map((option: string) => (
        <option value={option} selected={value === option}>{option}</option>
      ))}
    </select>
  );
}
