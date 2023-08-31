import { ChangeEventHandler, KeyboardEventHandler } from 'react';

type Props = {
  value: string;
  onChange: ChangeEventHandler;
  onKeyDown: KeyboardEventHandler;
}

export default function NumberCell(props: Props) {
  return (
    <input {...props} type="number" autoFocus/>
  );
}
