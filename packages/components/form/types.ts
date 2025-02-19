import type {
    FieldRule, PopupProps,
    CheckboxGroupProps, CheckboxProps, RadioProps, RadioGroupProps, SwitchProps, SliderProps, RateProps, StepperProps, FieldProps, DatePickerProps, TimePickerProps, PickerProps, CascaderProps, PickerGroupProps
} from 'vant'
import type { DatetimePickerProps } from '../datetime-picker'
import type { VNode } from 'vue'
/* 支持组件类型 */

type SelectComp = 'picker' | 'cascader' | 'area' | 'radio' | 'checkbox'
type InputComp = 'input'
type DateComp = 'date-picker' | 'time-picker' | 'datetime-picker' | 'date-range-picker' | 'time-range-picker' | 'datetime-range-picker'
type OtherComp = 'switch' | 'rate' | 'slider' | 'stepper' | 'text' | 'html' | 'slot' | 'input-slot'
export type CompTypes = SelectComp | InputComp | DateComp | OtherComp;

/* component 原生props */
export type CompAttrsPropsMap = {
    switch: SwitchProps,
    slider: SliderProps,
    rate: RateProps,
    stepper: StepperProps,
    checkbox: CheckboxGroupProps,
    radio: RadioGroupProps,
    input: Indexable,
    picker: PickerProps,
    area: Indexable,
    cascader: CascaderProps & { useVantAreaData?: boolean },
    'date-picker': DatePickerProps,
    'time-picker': TimePickerProps,
    'datetime-picker': PickerGroupProps & { showType?: 'group' | 'single', groupProps?: [DatePickerProps, TimePickerProps] | DatetimePickerProps, },
    'date-range-picker': PickerGroupProps & { groupProps?: [DatePickerProps, DatePickerProps] },
    'time-range-picker': PickerGroupProps & { groupProps?: [TimePickerProps, TimePickerProps] },
    'datetime-range-picker': PickerGroupProps & { groupProps?: [DatetimePickerProps, DatetimePickerProps] }
    // calender: CalendarProps,
    text: Indexable,
    html: Indexable,
    slot: Indexable,
    'input-slot': Indexable
}


/* 选择项  */
export type PickerOption<T> = {
    text: string,
    value: Numeric,
    children?: PickerOption<T>[]
} & T extends 'radio' | 'checkbox' ? { attrs: T extends 'radio' ? RadioProps : CheckboxProps } : Indexable

// 分离出需要options必填的类型  
export type OptionsRow<T> = T extends SelectComp ? { options: PickerOption<T>[] } : { options?: PickerOption<T>[] };


type CommonSlots = {
    label: () => VNode,
    'left-icon': () => VNode,
    'right-icon': () => VNode,
    'error-message': ({ message }: { message: string }) => VNode,
    button: () => VNode,
    extra: () => VNode,
    input: (value: string) => VNode
}

type XFormItemSlots<T> = T extends 'slot'
    ? Indexable
    : T extends 'input-slot'
    ? Partial<CommonSlots>
    : Partial<Omit<CommonSlots, 'input'>>

/* 表单项配置参数 */
export type XFormItemRow<T extends CompTypes = CompTypes> = {
    type: T;
    label?: string;
    name: string;
    required?: boolean;
    attrs?: (T extends keyof CompAttrsPropsMap ? (CompAttrsPropsMap[T] & Indexable) : Indexable) & { slots?: { [k: string]: (...args: any) => any } };
    vif?: boolean | ((values: Indexable) => boolean);
    rules?: FieldRule[];
    itemProps?: Partial<FieldProps> & { slots?: XFormItemSlots<T> } & Indexable;
    hiddenLabel?: boolean;
    popup?: PopupProps
} & OptionsRow<T>

export type XFormItemOption = XFormItemRow[]

export type ProvideEventTypes = 'change' | 'blur' | 'focus' | 'click' | 'confirm' | 'cancel' | 'drag-start' | 'drag-end' | 'plus' | 'minus' | 'overlimit' | 'finish' | 'click-tab'
export type FormProvideProps = {
    formSlots: Indexable,
    rules: { [key: string]: FieldRule[] }
    onEvents: (event: ProvideEventTypes, ...args: any) => void
}


