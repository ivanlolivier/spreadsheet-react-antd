import { NumberCell, SelectCell, TextCell } from './cellRenders';

export const componentPerType = {
  number: NumberCell,
  text: TextCell,
  select: SelectCell,
  custom: null,
};
