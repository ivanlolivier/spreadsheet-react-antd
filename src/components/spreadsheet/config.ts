import {
  NumberCell, ReadOnlyCell, SelectCell, TextCell, WeightCell,
} from './cellRenders';

export const componentPerType = {
  'read-only': ReadOnlyCell,
  number: NumberCell,
  text: TextCell,
  select: SelectCell,
  weight: WeightCell,
  custom: null,
};
