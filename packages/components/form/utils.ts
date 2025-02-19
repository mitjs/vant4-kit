import { isArray, has } from "lodash-es";
import type { CompTypes, } from "./types";
import type { FieldRule } from 'vant'
import { RightIconCompMap, } from "./constatnts";

export const getPlaceholder = (type: CompTypes, label: string, defalut?: string) => {
    const isSelect = ['picker', 'area', 'cascader', 'date-picker', 'time-picker', 'datetime-picker', 'date-range-picker', 'time-range-picker', 'datetime-range-picker'].includes(type)
    const isInput = ['input'].includes(type)

    if (isSelect) return defalut || `请选择${label}`
    if (isInput) return defalut || `请输入${label}`
    if (defalut) return defalut
}

export const getRules = (required: boolean, rules: FieldRule[] = [], label: string) => {
    let newRules: FieldRule[] = []
    const requiredRule: FieldRule = { required: true, message: `${label}不能为空`, trigger: ['onBlur', 'onChange', 'onSubmit'] }

    if (rules && isArray(rules)) {
        const isHaveRequiredRow = rules.find(item => has(item, 'required'))
        if (required && !isHaveRequiredRow) {
            newRules.push(requiredRule)
        }
        newRules = newRules.concat(rules)
    }

    return newRules

}

export const getMergeRules = () => {
    return []
}

export const getRightIcon = (type: CompTypes) => {
    if (RightIconCompMap.includes(type)) return 'arrow'
    return ''
}
