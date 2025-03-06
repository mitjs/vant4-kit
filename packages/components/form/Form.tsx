import { defineComponent, toRefs, ref, provide, type PropType, type ExtractPropTypes } from "vue";
import type { XFormItemRow, XFormItemOption, FormProvideProps, ProvideEventTypes } from "./types";
import { Form, CellGroup, formProps, type FieldRule } from 'vant'
import { has, isFunction } from "lodash-es";
import FormItem from './FormItem'
import { createNamespace } from '@vant4-kit/utils'
import { AllCompMap } from "./constatnts";

const [name] = createNamespace('form')

export const xformProps = Object.assign({}, formProps, {
    model: {
        type: Object as PropType<Record<string, any>>,
        required: true,
        default: () => ({})
    },
    items: {
        type: Array as PropType<XFormItemOption>,
        required: true,
        default: () => [] as XFormItemOption
    },
    rules: {
        type: Object as PropType<{ [k: string]: FieldRule[] }>,
        default: () => ({})
    },
    inset: {
        type: Boolean,
        default: false
    }
})

export type FormProps = ExtractPropTypes<typeof xformProps>;

export default defineComponent({
    name,
    props: xformProps,
    emits: ['submit', 'failed', 'confirm', 'cancel', 'change', 'blur', 'focus', 'click', 'drag-start', 'drag-end', 'plus', 'minus', 'overlimit', 'finish', 'click-tab'],
    setup(props, { slots, attrs, emit, expose }) {
        const formRef = ref()
        const onSubmit = (...args: any) => emit("submit", ...args)
        const onFailed = (...args: any) => emit("failed", ...args)

        provide<FormProvideProps>('x-form', {
            formSlots: slots,
            rules: props.rules,
            onEvents: (event: ProvideEventTypes, ...args: any) => {
                emit(event, ...args)
            }

        })

        expose({
            submit: () => formRef.value.submit(),
            getValues: () => formRef.value.getValues(),
            validate: async (name?: string | string[]): Promise<void> => {
                return await formRef.value?.validate(name)
            },
            resetValidation: (name?: string | string[]) => formRef.value.resetValidation(name),
            getValidationStatus: () => formRef.value.getValidationStatus(),
            scrollToField: (name: string, alignToTop: boolean) => formRef.value.scrollToField(name, alignToTop)
        })

        /* 处理是否必填 */
        const getRequired = (row: XFormItemRow): boolean => {
            const { itemProps, name } = row
            const ruleIsRequired = has(props.rules, name) ? !!(props.rules[name].find((item: FieldRule) => (has(item, 'required') && item.required))) : false
            const itemRequired = has(row, 'required') ? !!row.required : false
            const compReq = itemProps && has(itemProps, 'required') ? (!!itemProps.required) : false;

            return compReq || itemRequired || ruleIsRequired || !!props.required
        }

        return {
            formRef,
            ...toRefs(props),
            attrs,
            getRequired,
            onSubmit,
            onFailed,
        }
    },
    render() {
        const { formRef, items, model, rules, required, readonly, onSubmit, onFailed, attrs, inset, getRequired, ...otherProps } = this;
        return <Form ref="formRef" onSubmit={onSubmit} onFailed={onFailed} required={required} readonly={readonly}  {...otherProps} {...attrs} >
            <CellGroup inset={inset}>
                {items.map((item: XFormItemRow, index: number) => {
                    const { vif, type, name, label, itemProps, popup } = item;

                    if (!AllCompMap.includes(type)) {
                        throw new Error(`${type} 类型组件暂不支持`)
                        return null
                    }

                    const isRenderCurField = has(item, 'vif') ? isFunction(vif) ? vif(model) : vif : true; // 是否渲染该表单项
                    if (!isRenderCurField) return null;

                    return <FormItem key={name + index}
                        formValue={model}
                        type={type}
                        name={name}
                        label={label}
                        options={item.options}
                        config={item}
                        required={getRequired(item)}
                        readonly={readonly}
                        popup={popup}
                        itemAttrs={itemProps}
                        orgAttrs={item.attrs}
                    ></FormItem>

                })}
            </CellGroup>
        </Form>
    }
})

