import { KeyboardEventHandler } from 'react';

type Props = {
  value: string;
  onChange: (v: any) => void;
  onKeyDown: KeyboardEventHandler;
}

export default function TextCell({ value, onChange, onKeyDown }: Props) {
  return (
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
      />
  );
}
