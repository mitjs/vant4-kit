import { type PropType, defineComponent, inject, ref, renderSlot } from "vue";
import { Switch, Checkbox, CheckboxGroup, Radio, RadioGroup, Stepper, Rate, Slider, Field, Popup, Picker, Area, DatePicker, TimePicker, Cascader, PickerGroup, type PickerConfirmEventParams, type DatePickerProps, type TimePickerProps } from 'vant'
import { has, isArray, isBoolean, isFunction, } from "lodash-es";
import { getPlaceholder, getRules, getRightIcon } from './utils'
import { areaList, useCascaderAreaData } from '@vant/area-data'
import { RightIconCompMap, CompsEventsMap } from "./constatnts";
import { XDatetimePicker } from '../datetime-picker'
import type { CompAttrsPropsMap, CompTypes, FormProvideProps, PickerOption, XFormItemRow } from "./types";

export default defineComponent({
    props: {
        formValue: {
            type: Object as any
        },
        type: {
            type: String as PropType<CompTypes>,
            required: true,
        },
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array as PropType<PickerOption<CompTypes>[]>,
            default: () => []
        },
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        itemAttrs: {
            type: Object as PropType<any>,
            default: () => ({})
        },
        popup: {
            type: Object as PropType<XFormItemRow['popup']>,
            default: () => ({})
        },
        orgAttrs: {
            type: Object as PropType<CompAttrsPropsMap[CompTypes]>,
            default: () => ({})
        },
        config: {
            type: Object as PropType<any>,
            default: () => ({})
        },
    },
    setup(props, { }) {
        const { type, formValue, label, name, required, readonly, options, itemAttrs, orgAttrs, config, popup } = props

        const { formSlots, rules, onEvents } = inject('x-form') as FormProvideProps
        const showPopup = ref(false)

        /* 事件收集器 */
        const eventsCollector = () => {
            let events: any = {}
            if (CompsEventsMap['change'].includes(type)) {
                events['onChange'] = (...args: any) => onEvents('change', name, ...args)
            }

            if (CompsEventsMap['blur'].includes(type)) {
                events['onBlur'] = (e: MouseEvent) => onEvents('blur', name, e);
            }

            if (CompsEventsMap['focus'].includes(type)) {
                events['onFocus'] = (e: MouseEvent) => onEvents('focus', name, e);
            }

            if (CompsEventsMap['click'].includes(type)) {
                events['onClick'] = (e: MouseEvent) => onEvents('click', name, e)
            }
            return events
        }
        /* 处理slot */
        const handlerSlot = () => {
            let slots: any = {}

            const isHas = (slotName: string) => itemAttrs && has(itemAttrs, 'slots') && has(itemAttrs.slots, slotName)
            const renderSlotName = (slotName: string, query?: any) => {
                if (isFunction(itemAttrs.slots[slotName])) {
                    return itemAttrs.slots[slotName](query)
                } else {
                    throw new Error(`slots.${slotName} is not a function`)
                    return null
                }
            }

            if (label || has(formSlots, `${name}.label`) || isHas('label')) {
                slots['label'] = () => has(formSlots, `${name}.label`) ? renderSlot(formSlots, `${name}.label`) : isHas('label') ? renderSlotName('label') : label
            }

            if (has(formSlots, `${name}.left-icon`) || isHas('left-icon')) {
                slots['left-icon'] = () => has(formSlots, `${name}.left-icon`) ? renderSlot(formSlots, `${name}.left-icon`) : renderSlotName('left-icon')
            }

            if (has(formSlots, `${name}.right-icon`) || isHas('right-icon')) {
                slots['right-icon'] = () => has(formSlots, `${name}.right-icon`) ? renderSlot(formSlots, `${name}.right-icon`) : renderSlotName('right-icon')
            }

            if (has(formSlots, `${name}.error-message`) || isHas('error-message')) {
                slots['error-message'] = ({ message }: { message: string }) => has(formSlots, `${name}.error-message`) ? renderSlot(formSlots, `${name}.error-message`, { message }) : renderSlotName('error-message', { message })
            }

            if (has(formSlots, `${name}.button`) || isHas('button')) {
                slots['button'] = () => has(formSlots, `${name}.button`) ? renderSlot(formSlots, `${name}.button`) : renderSlotName('button')
            }

            if (has(formSlots, `${name}.extra`) || isHas('extra')) {
                slots['extra'] = () => has(formSlots, `${name}.extra`) ? renderSlot(formSlots, `${name}.extra`) : renderSlotName('extra')
            }

            return slots
        }

        const handlerCompSlots = () => {
            if (has(orgAttrs, 'slots')) {
                return orgAttrs.slots
            }
            return {}
        }
        /* 通用基本配置 */
        const getBasicConfig = (row: Indexable = {}) => {
            const curRules = has(itemAttrs, 'rules') && isArray(itemAttrs.rules) ? itemAttrs.rules : [] // 组件内部rules
            const itemRules = has(config, 'rules') ? config.rules : []; //局部rules
            const formRules = has(rules, name) ? rules[name] : [] //全局rules
            const newRules = [...curRules, ...itemRules, ...formRules]

            const FieldAttrs: any = {
                placeholder: getPlaceholder(type, label, itemAttrs?.placeholder),
                required: required,
                rules: getRules(required, newRules, label),
                label: label,
                name,
            };

            if (has(config, 'hiddenLabel') && isBoolean(config.hiddenLabel) && config.hiddenLabel) {
                FieldAttrs['class'] = 'xform-hidden-label';
            }

            Object.assign(FieldAttrs, itemAttrs);

            if (RightIconCompMap.includes(type)) {

                Object.assign(FieldAttrs, {
                    'right-icon': getRightIcon(type),
                    readonly: true,
                    onClickRightIcon: () => {
                        if (readonly) return;
                        showPopup.value = true;
                    }
                })
            }

            return Object.assign(FieldAttrs, row)
        }
        const onCancel = () => {
            closePopup()
            onEvents('cancel', name)
        }
        const closePopup = () => showPopup.value = false;

        const compGenerator: { [k in CompTypes]: any } = {
            'input': () => {
                return <Field v-model={formValue[name]}
                    {...eventsCollector()}
                    {...getBasicConfig()}
                    v-slots={handlerSlot()} />
            },
            'picker': () => {
                return <>
                    <Field
                        v-model={formValue[`${name}Text`]}
                        {...getBasicConfig()}
                        v-slots={handlerSlot()}
                    />
                    {renderPopup(
                        <Picker
                            v-model={formValue[name]}
                            title={`请选择${label}`}
                            columns={options}
                            {...eventsCollector()}
                            {...orgAttrs}
                            onConfirm={(...args: any) => {
                                const [{ selectedOptions }] = args
                                formValue[`${name}Text`] = selectedOptions.map((item: any) => item.text).join('/')
                                closePopup()
                                onEvents('confirm', name, ...args)
                            }}
                            onChange={(...args: any) => onEvents('change', name, ...args)}
                            onCancel={onCancel}
                            v-slots={handlerCompSlots()}
                        />
                    )}

                </>
            },
            'area': () => {
                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />
                    {renderPopup(
                        <Area
                            v-model={formValue[name]}
                            title={`请选择${label}`}
                            areaList={areaList}
                            {...eventsCollector()}
                            {...orgAttrs}
                            onConfirm={(...args: any) => {
                                const [{ selectedOptions }] = args
                                formValue[`${name}Text`] = selectedOptions.map((item: any) => item.text).join('/')
                                closePopup()
                                onEvents('confirm', name, ...args)
                            }}
                            onChange={(...args: any) => onEvents('change', name, ...args)}
                            onCancel={onCancel}
                            v-slots={handlerCompSlots()}
                        />
                    )}
                </>
            },
            'cascader': () => {
                const areaOptions = useCascaderAreaData()

                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />

                    {renderPopup(
                        <Cascader
                            v-model={formValue[name]}
                            title={`请选择${label}`}
                            options={orgAttrs && has(orgAttrs, 'useVantAreaData') ? areaOptions : options}
                            {...eventsCollector()}
                            {...orgAttrs}
                            onFinish={(...args: any) => {
                                const [{ selectedOptions }] = args
                                formValue[`${name}Text`] = selectedOptions.map((item: any) => item.text).join('/')
                                closePopup()
                                onEvents('finish', name, ...args)
                            }}
                            onChange={(...args: any) => onEvents('change', name, ...args)}
                            onClickTab={(...args: any) => onEvents('click-tab', name, ...args)}
                            onClose={onCancel}
                            v-slots={handlerCompSlots()}
                        />
                    )}
                </>
            },
            'date-picker': () => {
                const curYear = new Date().getFullYear();
                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />
                    {/* 日期选择器Popup */}
                    {renderPopup(
                        <DatePicker
                            v-model={formValue[name]}
                            title={`请选择${label}`}
                            {...eventsCollector()}
                            {...(orgAttrs as CompAttrsPropsMap['date-picker'])}
                            minDate={has(orgAttrs, 'minDate') ? orgAttrs['minDate'] : (new Date(curYear - 20, 1, 1))}
                            maxDate={has(orgAttrs, 'maxDate') ? orgAttrs['maxDate'] : (new Date(curYear + 10, 12, 31))}
                            onConfirm={(...args: any) => {
                                formValue[`${name}Text`] = formValue[name].join('-')
                                closePopup()
                                onEvents('confirm', name, ...args)
                            }}
                            onChange={(...args: any) => onEvents('change', name, ...args)}
                            onCancel={onCancel}
                            v-slots={handlerCompSlots()}
                        />
                    )}
                </>
            },
            'time-picker': () => {
                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />
                    {/* 时间选择器popup */}
                    {renderPopup(
                        <TimePicker
                            v-model={formValue[name]}
                            title={`请选择${label}`}
                            {...eventsCollector()}
                            {...(orgAttrs as CompAttrsPropsMap['time-picker'])}
                            onConfirm={(...args: any) => {
                                formValue[`${name}Text`] = formValue[name].join(':')
                                closePopup()
                                onEvents('confirm', name, ...args)
                            }}
                            onChange={(...args: any) => onEvents('change', name, ...args)}
                            onCancel={onCancel}
                            v-slots={handlerCompSlots()}
                        />
                    )}
                </>
            },
            'datetime-picker': () => {
                const curYear = new Date().getFullYear();
                const curAttrs = orgAttrs as CompAttrsPropsMap['datetime-picker']
                const defaultDateTime = (rows: CompAttrsPropsMap['datetime-picker']) => {
                    let groupAttrs: [Partial<DatePickerProps>, Partial<TimePickerProps>] = [{}, {}]
                    if (has(rows, 'groupProps') && isArray(rows['groupProps'])) {
                        const [dateAttrs, timeAttrs] = rows['groupProps'];
                        if (dateAttrs) {
                            groupAttrs[0] = {
                                ...dateAttrs,
                                minDate: dateAttrs['minDate'] || new Date(curYear - 20, 1, 1),
                                maxDate: dateAttrs['maxDate'] || new Date(curYear + 10, 12, 31)
                            };
                        }
                        if (timeAttrs) {
                            groupAttrs[1] = timeAttrs
                        }
                    }
                    return groupAttrs
                }
                const renderComp = () => {
                    let curShowType = has(orgAttrs, 'showType') && ['group', 'single'].includes(orgAttrs['showType']) ? orgAttrs['showType'] : 'group';
                    switch (curShowType) {
                        case 'group':
                            const dateTimeValue = ref({
                                date: isArray(formValue[name]) && formValue[name].length > 0 ? formValue[name][0] : [],
                                time: isArray(formValue[name]) && formValue[name].length > 1 ? formValue[name][1] : []
                            })

                            return <PickerGroup
                                title={`请选择${label}`}
                                {...eventsCollector()}
                                {...curAttrs}
                                tabs={has(curAttrs, 'tabs') ? curAttrs['tabs'] : ['选择日期', '选择时间']}
                                onConfirm={(...args: any) => {
                                    formValue[name] = [dateTimeValue.value.date, dateTimeValue.value.time]
                                    formValue[`${name}Text`] = `${dateTimeValue.value.date.join('-')} ${dateTimeValue.value.time.join(':')}`
                                    closePopup()
                                    onEvents('confirm', name, ...args)
                                }}
                                onChange={(...args: any) => onEvents('change', name, ...args)}
                                onCancel={onCancel}
                                v-slots={handlerCompSlots()}
                            >
                                <DatePicker
                                    v-model={dateTimeValue.value.date}
                                    {...defaultDateTime(curAttrs)[0]}
                                />
                                <TimePicker
                                    v-model={dateTimeValue.value.time}
                                    {...defaultDateTime(curAttrs)[1]}
                                />
                            </PickerGroup>;
                        case 'single':
                            return <XDatetimePicker v-model={formValue[name]}
                                title={`请选择${label}`}
                                {...eventsCollector()}
                                {...(has(curAttrs, 'groupProps') ? curAttrs['groupProps'] : {})}
                                onConfirm={(...args: any) => {
                                    const [{ selectedValues }] = args as PickerConfirmEventParams[]
                                    formValue[name] = selectedValues
                                    const dateTime = `${selectedValues.slice(0, 3).join('-')} ${selectedValues.slice(3).join(':')}`
                                    formValue[`${name}Text`] = dateTime
                                    closePopup()
                                    onEvents('confirm', name, ...args)
                                }}
                                onChange={(...args: any) => onEvents('change', name, ...args)}
                                onCancel={onCancel}
                                v-slots={handlerCompSlots()}
                            />;
                    }
                }

                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />
                    {/* 日期时间选择器Popup */}
                    {renderPopup(renderComp())}
                </>
            },
            'date-range-picker': () => {
                const curYear = new Date().getFullYear();
                const drValue = ref({
                    start: isArray(formValue[name]) && formValue[name].length > 0 ? formValue[name][0] : [],
                    end: isArray(formValue[name]) && formValue[name].length > 1 ? formValue[name][1] : []
                })
                const curAttrs = orgAttrs as CompAttrsPropsMap['date-range-picker']
                const defaultDate = (rows: CompAttrsPropsMap['date-range-picker']) => {
                    let dateGroup: [Partial<DatePickerProps>, Partial<DatePickerProps>] = [{}, {}]
                    if (has(rows, 'groupProps') && isArray(rows['groupProps'])) {
                        const [startDateGroup, endDateGroup] = rows['groupProps'] || []
                        if (startDateGroup) {
                            dateGroup[0] = startDateGroup;
                            dateGroup[0]['minDate'] = startDateGroup['minDate'] || new Date(curYear - 20, 1, 1)
                            dateGroup[0]['maxDate'] = startDateGroup['maxDate'] || new Date(curYear + 10, 1, 1)
                        }
                        if (endDateGroup) {
                            dateGroup[1] = endDateGroup;
                            dateGroup[1]['minDate'] = startDateGroup['minDate'] || new Date(curYear - 20, 1, 1)
                            dateGroup[1]['maxDate'] = startDateGroup['maxDate'] || new Date(curYear + 10, 1, 1)
                        }
                    }
                    return dateGroup
                }

                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />

                    {/* 日期范围选择器Popup */}
                    {renderPopup(<PickerGroup
                        title={`请选择${label}`}
                        {...eventsCollector()}
                        {...curAttrs}
                        tabs={has(curAttrs, 'tabs') ? curAttrs['tabs'] : ['开始日期', '结束日期']}
                        onConfirm={(...args: any) => {
                            formValue[name] = [drValue.value.start, drValue.value.end]
                            formValue[`${name}Text`] = `${drValue.value.start.join('-')} 至 ${drValue.value.end.join('-')}`
                            closePopup()
                            onEvents('confirm', name, ...args)
                        }}
                        onChange={(...args: any) => onEvents('change', name, ...args)}
                        onCancel={closePopup}
                        v-slots={handlerCompSlots()}
                    >
                        <DatePicker
                            v-model={drValue.value.start}
                            {...defaultDate(curAttrs)[0]}
                        />
                        <DatePicker
                            v-model={drValue.value.end}
                            {...defaultDate(curAttrs)[1]}
                        />
                    </PickerGroup>)}
                </>
            },
            'time-range-picker': () => {
                const trValue = ref({
                    start: isArray(formValue[name]) && formValue[name].length > 0 ? formValue[name][0] : [],
                    end: isArray(formValue[name]) && formValue[name].length > 1 ? formValue[name][1] : []
                })

                const curAttrs = orgAttrs as CompAttrsPropsMap['time-range-picker']
                const defaultTime = (rows: CompAttrsPropsMap['time-range-picker']) => {
                    let startTimeAttrs = {}
                    let endTimeAttrs = {}
                    if (has(rows, 'groupProps') && isArray(rows['groupProps'])) {
                        const [startProps, endProps] = rows['groupProps'];
                        if (startProps) {
                            startTimeAttrs = startProps
                        }
                        if (endProps) {
                            endTimeAttrs = endProps
                        }
                    }
                    return [startTimeAttrs, endTimeAttrs]
                }
                return <>
                    <Field v-model={formValue[`${name}Text`]}  {...getBasicConfig()} v-slots={handlerSlot()} />
                    {/* 日期时间选择器Popup */}
                    {renderPopup(<PickerGroup
                        title={`请选择${label}`}
                        {...eventsCollector()}
                        {...curAttrs}
                        tabs={has(curAttrs, 'tabs') ? curAttrs['tabs'] : ['开始时间', '结束时间']}
                        onConfirm={(...args: any) => {
                            closePopup()
                            formValue[name] = [trValue.value.start, trValue.value.end]
                            formValue[`${name}Text`] = `${trValue.value.start.join(':')} 至 ${trValue.value.end.join(':')}`
                            onEvents('confirm', name, ...args)
                        }}
                        onChange={(...args: any) => onEvents('change', name, ...args)}
                        onCancel={closePopup}
                        v-slots={handlerCompSlots()}
                    >
                        <TimePicker v-model={trValue.value.start} {...defaultTime(curAttrs)[0]} />
                        <TimePicker v-model={trValue.value.end} {...defaultTime(curAttrs)[1]} />
                    </PickerGroup>)}
                </>
            },
            'datetime-range-picker': () => {
                const dtrValue = ref({
                    start: isArray(formValue[name]) && formValue[name].length > 0 ? formValue[name][0] : [],
                    end: isArray(formValue[name]) && formValue[name].length > 1 ? formValue[name][1] : [],
                })

                const curAttrs = orgAttrs as CompAttrsPropsMap['datetime-range-picker']

                const handleDatetimeAttrs = (rows: CompAttrsPropsMap['datetime-range-picker']) => {
                    let startAttrs = {}
                    let endAttrs = {}
                    if (has(rows, 'groupProps') && isArray(rows['groupProps'])) {
                        const [startProps, endProps] = rows['groupProps'];
                        if (startProps) {
                            startAttrs = startProps
                        }
                        if (endProps) {
                            endAttrs = endProps
                        }
                    }
                    return [startAttrs, endAttrs]
                }
                return <>
                    <Field v-model={formValue[`${name}Text`]} {...getBasicConfig()} v-slots={handlerSlot()} />
                    {/* 日期时间选择器Popup */}
                    {renderPopup(<PickerGroup
                        title={`请选择${label}`}
                        {...eventsCollector()}
                        {...curAttrs}
                        tabs={has(curAttrs, 'tabs') ? curAttrs['tabs'] : ['开始时间', '结束时间']}
                        onConfirm={(...args: any) => {
                            const { start, end } = dtrValue.value
                            formValue[name] = [dtrValue.value.start, dtrValue.value.end]
                            const startStr = `${start.slice(0, 3).join('-')} ${start.slice(3).join(':')}`
                            const sendStr = `${end.slice(0, 3).join('-')} ${end.slice(3).join(':')}`
                            formValue[`${name}Text`] = `${startStr} 至 ${sendStr}`;
                            closePopup()
                            onEvents('confirm', name, ...args)
                        }}
                        onChange={(...args: any) => onEvents('change', name, ...args)}
                        onCancel={closePopup}
                        v-slots={handlerCompSlots()}
                    >
                        <XDatetimePicker v-model={dtrValue.value.start} {...handleDatetimeAttrs(curAttrs)[0]} />
                        <XDatetimePicker v-model={dtrValue.value.end} {...handleDatetimeAttrs(curAttrs)[1]} />
                    </PickerGroup>)}
                </>
            },
            // 'calender': () => {
            //     return <>
            //         <Field v-model={formValue[`${name}Text`]}  {...getBasicConfig()} v-slots={handlerSlot()} />
            //         <Calendar
            //             v-model={formValue[name]}
            //             onUpdate:show={(val: boolean) => (showPopup.value = val)}
            //             title={`请选择${label}`}
            //             {...eventsCollector()}
            //             {...(orgAttrs as CompAttrsPropsMap['calender'])}
            //             show={showPopup.value}
            //             onConfirm={(...args: any) => {
            //                 // console.log('calender', args);
            //                 formValue[`${name}Text`] = formValue[name].map((item: any) => dayjs(item).format('YYYY-MM-DD')).join('、')
            //                 closePopup()
            //                 onEvents('confirm', name, ...args)
            //             }}
            //             onChange={(...args: any) => {
            //                 onEvents('change', name, ...args)
            //             }}
            //             onPanelChange={(...args: any) => onEvents('panel-change', name, ...args)}
            //             onSelect={(...args: any) => onEvents('select', name, ...args)}
            //             onOpen={(...args: any) => onEvents('open', name, ...args)}
            //             onClose={(...args: any) => onEvents('close', name, ...args)}
            //             onOpened={(...args: any) => onEvents('opened', name, ...args)}
            //             onClosed={(...args: any) => onEvents('closed', name, ...args)}
            //             onUnselect={(...args: any) => onEvents('unselec', name, ...args)}
            //             onMonthShow={(...args: any) => onEvents('month-show', name, ...args)}
            //             onOverRange={(...args: any) => onEvents('over-range', name, ...args)}
            //             onClickDisabledDate={(...args: any) => onEvents('click-disabled-date', name, ...args)}
            //             onClickSubtitle={(...args: any) => onEvents('click-subtitle', name, ...args)}
            //             onCancel={onCancel}
            //             v-slots={handlerCompSlots()}      
            //         />,
            //     </>
            // },
            'radio': () => {
                return <Field {...getBasicConfig()}
                    v-slots={{
                        input: () => <RadioGroup
                            v-model={formValue[name]}
                            {...eventsCollector()}
                            {...(orgAttrs as CompAttrsPropsMap['radio'])}
                            class={{ 'readonly-radio': readonly }}
                            disabled={readonly || (has(orgAttrs, 'disabled') && (!!orgAttrs.disabled))}
                            v-slots={handlerCompSlots()}
                        >
                            {options?.map((item: any) => {
                                return <Radio  {...item.attrs} name={item.value}>{item.text}</Radio>
                            })}
                        </RadioGroup>
                    }}
                />
            },
            'checkbox': () => {
                return <Field
                    {...getBasicConfig()}
                    v-slots={{
                        ...handlerSlot(),
                        input: () => {
                            return <CheckboxGroup
                                v-model={formValue[name]}
                                {...eventsCollector()}
                                {...(orgAttrs as CompAttrsPropsMap['checkbox'])}
                                class={{ 'readonly-checkbox': readonly }}
                                disabled={readonly || (has(orgAttrs, 'disabled') && (!!orgAttrs.disabled))}
                                v-slots={handlerCompSlots()}
                            >
                                {options?.map((item: any) => {
                                    return <Checkbox  {...item.attrs} name={item.value} >{item.text}</Checkbox>
                                })}
                            </CheckboxGroup>
                        }
                    }}
                />
            },
            'switch': () => {
                return <Field
                    {...getBasicConfig()}
                    v-slots={{
                        ...handlerSlot(),
                        input: () => {
                            return <Switch v-model={formValue[name]}
                                {...eventsCollector()}
                                {...(orgAttrs as CompAttrsPropsMap['switch'])}
                                class={{ 'readonly-switch': readonly }}
                                disabled={readonly || (has(orgAttrs, 'disabled') && (!!orgAttrs.disabled))}
                                v-slots={handlerCompSlots()}
                            />
                        }
                    }}
                />
            },
            'rate': () => {
                return <Field
                    {...getBasicConfig()}
                    v-slots={{
                        ...handlerSlot(),
                        input: () => {
                            return <Rate v-model={formValue[name]}
                                {...eventsCollector()}
                                {...(orgAttrs as CompAttrsPropsMap['rate'])}
                                readonly={readonly || (has(orgAttrs, 'readonly') && (!!orgAttrs.readonly))}
                                v-slots={handlerCompSlots()}
                            />
                        }
                    }}
                />

            },
            'slider': () => {
                return <Field
                    {...getBasicConfig()}
                    v-slots={{
                        ...handlerSlot(),
                        input: () => {
                            return <Slider v-model={formValue[name]}
                                {...eventsCollector()}
                                {...(orgAttrs as CompAttrsPropsMap['slider'])}
                                class={{ 'readonly-slider': readonly }}
                                disabled={readonly || (has(orgAttrs, 'disabled') && (!!orgAttrs.disabled))}
                                onDragStart={(...args: any) => { onEvents('drag-start', name, ...args) }}
                                onDragEnd={(...args: any) => { onEvents('drag-end', name, ...args) }}
                                v-slots={handlerCompSlots()}
                            />
                        }
                    }}
                />

            },
            'stepper': () => {
                return <Field
                    {...getBasicConfig()}
                    v-slots={{
                        ...handlerSlot(),
                        input: () => {
                            return <Stepper v-model={formValue[name]}
                                {...eventsCollector()}
                                {...(orgAttrs as CompAttrsPropsMap['stepper'])}
                                class={{ 'readonly-stepper': readonly }}
                                disabled={readonly || (has(orgAttrs, 'disabled') && (!!orgAttrs.disabled))}
                                onPlus={(...args: any) => { onEvents('plus', name, ...args) }}
                                onMinus={(...args: any) => { onEvents('minus', name, ...args) }}
                                onOverlimit={(...args: any[]) => { onEvents('overlimit', name, ...args) }}
                                v-slots={handlerCompSlots()}
                            />
                        }
                    }}
                />
            },
            'text': () => <Field
                {...getBasicConfig()}
                v-slots={{
                    ...handlerSlot(),
                    input: () => {
                        return <>{formValue[name]}</>
                    }
                }}
            />,
            'html': () => <Field
                {...getBasicConfig()}
                v-slots={{
                    ...handlerSlot(),
                    input: () => <div v-html={formValue[name]} {...(orgAttrs as CompAttrsPropsMap['html'])}></div>
                }}
            />,
            'input-slot': () => <Field
                {...getBasicConfig()}
                v-slots={{
                    ...handlerSlot(),
                    input: () => <>
                        {has(formSlots, name) ? renderSlot(formSlots, name) : <></>}
                    </>
                }}
            />,
            'slot': () => <>{has(formSlots, name) ? renderSlot(formSlots, name) : <></>}
            </>
        }

        const renderPopup = (comp: any, popupConfig: Indexable = {}) => {
            return <Popup
                show={showPopup.value}
                onUpdate:show={(val: boolean) => (showPopup.value = val)}
                destroy-on-close
                round
                position="bottom"
                {...popupConfig}
                {...popup}
            >
                {comp}
            </Popup>
        }
        return () => {
            return <>
                {compGenerator[type]()}
            </>
        }
    },

})