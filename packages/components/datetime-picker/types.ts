import type { PickerOption } from 'vant'
export type DateTimePickerColumnType = 'hour' | 'minute' | 'second';
export type Filter = (
    columnType: string,
    options: PickerOption[],
    values: string[],
) => PickerOption[];
export type Formatter = (type: string, option: PickerOption) => PickerOption;

export type DatetimePickerExpose = {
    confirm: () => void;
    getSelectedDate: () => string[];
};