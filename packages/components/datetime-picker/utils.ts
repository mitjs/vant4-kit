import type { PropType } from 'vue'
import type { PickerOption } from 'vant'
import type { Filter, Formatter } from './types'

export const truthProp = {
    type: Boolean,
    default: true as const,
};

export const numericProp = [Number, String];
export const makeNumericProp = <T>(defaultVal: T) => ({
    type: numericProp,
    default: defaultVal,
});

export const sharedProps = Object.assign({}, {
    modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    filter: Function as PropType<Filter>,
    formatter: {
        type: Function as PropType<Formatter>,
        default: (type: string, option: PickerOption) => option,
    },
    loading: Boolean,
    readonly: Boolean,
    allowHtml: Boolean,
    title: String,
    cancelButtonText: String,
    confirmButtonText: String,
    optionHeight: makeNumericProp(44),
    showToolbar: truthProp,
    swipeDuration: makeNumericProp(1000),
    visibleOptionNum: makeNumericProp(6),
}
)

export function times<T>(n: number, iteratee: (index: number) => T) {
    if (n < 0) {
        return [];
    }

    const result: T[] = Array(n);

    let index = -1;
    while (++index < n) {
        result[index] = iteratee(index);
    }

    return result;
}
export function padZero(num: Numeric, targetLength = 2): string {
    let str = num + '';

    while (str.length < targetLength) {
        str = '0' + str;
    }
    return str;
}

export const genOptions = <T extends string>(
    min: number,
    max: number,
    type: T,
    formatter: Formatter,
    filter: Filter | undefined,
    values: string[],
) => {
    const options = times(max - min + 1, (index) => {
        const value = padZero(min + index);
        return formatter(type, {
            text: value,
            value,
        });
    });
    return filter ? filter(type, options, values) : options;
};

export const getMonthEndDay = (year: number, month: number): number =>
    32 - new Date(year, month - 1, 32).getDate();

/**
 * 数值转出字符串，小于10，补位0，
 * @param number
 * @returns
 */
export const NumberToString = (number: number) => (number < 10 ? `0${number}` : `${number}`)
