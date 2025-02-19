import type { CompTypes, ProvideEventTypes } from './types'
export const AllCompMap = ['input', 'picker', 'cascader', 'area', 'radio', 'checkbox', 'date-picker', 'time-picker', 'datetime-picker', 'date-range-picker', 'time-range-picker', 'datetime-range-picker', 'switch', 'rate', 'slider', 'stepper', 'text', 'html', 'slot', 'input-slot']

/* 需要显示右侧箭头icon的组件收集 */
export const RightIconCompMap: CompTypes[] = ['picker', 'cascader', 'area', 'date-picker', 'time-picker', 'datetime-picker', 'date-range-picker', 'time-range-picker', 'datetime-range-picker']

/* 组件具备事件收集 */

export const CompsEventsMap: { [k in ProvideEventTypes]: CompTypes[] } = {
    change: ['rate', 'switch', 'stepper', 'slider', 'radio', 'checkbox',],
    blur: ['input', 'stepper'],
    focus: ['input', 'stepper'],
    click: ['input', 'switch'],
    confirm: [],
    cancel: [],
    'drag-end': ['slider'],
    'drag-start': ['slider'],
    plus: ['stepper'],
    minus: ['stepper'],
    finish: [],
    'click-tab': [],
    overlimit: []
}
