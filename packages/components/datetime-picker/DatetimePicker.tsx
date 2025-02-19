import { defineComponent, ref, computed, type PropType, type ExtractPropTypes, type ComponentPublicInstance } from "vue";
import { Picker, type PickerInstance, } from 'vant'
import type { DatetimePickerExpose, DateTimePickerColumnType } from './types'
import { createNamespace } from '@vant4-kit/utils'
import { isEmpty } from "lodash-es";
import { sharedProps, genOptions, getMonthEndDay, NumberToString } from './utils'

const [name] = createNamespace('datetime-picker')

const datetimePickerProps = Object.assign({}, sharedProps, {
    minYear: {
        type: Number as PropType<number>,
        validator: (val: number) => val > 1970,
        default: new Date().getFullYear() - 10,
    },
    maxYear: {
        type: Number as PropType<number>,
        default: new Date().getFullYear(),
    },
    columnsType: {
        type: Array as PropType<DateTimePickerColumnType[]>,
        default: () => ['hour', 'minute'],
    },
})

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>
export type DateTimePickerInstance = ComponentPublicInstance<
    DatetimePickerProps,
    DatetimePickerExpose
>;

export default defineComponent({
    name,
    props: datetimePickerProps,
    emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
    setup(props, { emit, slots, expose }) {
        const vDate = new Date()
        const defaultTime = [String(vDate.getFullYear()), NumberToString(vDate.getMonth() + 1), NumberToString(vDate.getDate()), NumberToString(vDate.getHours()), NumberToString(vDate.getMinutes()), NumberToString(vDate.getSeconds())]
        const currentValues = computed({
            get: () => isEmpty(props.modelValue) ? defaultTime : props.modelValue,
            set(val) {
                console.log('val==', val);
                emit('update:modelValue', val)
            }
        })
        const pickerRef = ref<PickerInstance>();

        const genYearOptions = () => {
            const minYear = props.minYear as number;
            const maxYear = props.maxYear as number;
            return genOptions(
                minYear,
                maxYear,
                'year',
                props.formatter,
                props.filter,
                currentValues.value,
            );
        };
        const genMonthOptions = () => {
            const minMonth = 1;
            const maxMonth = 12;
            return genOptions(
                minMonth,
                maxMonth,
                'month',
                props.formatter,
                props.filter,
                currentValues.value,
            );
        };
        const genDayOptions = () => {
            const year = currentValues.value[0]
            const month = currentValues.value[1]
            const minDate = 1;
            const maxDate = getMonthEndDay(year ? +year : props.minYear, month ? +month : 1);
            return genOptions(
                minDate,
                maxDate,
                'day',
                props.formatter,
                props.filter,
                currentValues.value,
            );
        };
        const genHourOptions = () => {
            const { filter, formatter } = props;
            return genOptions(
                0,
                23,
                'hour',
                formatter,
                filter,
                currentValues.value,
            )
        }

        const genMinuteOptions = () => {
            const { filter, formatter } = props;
            return genOptions(
                0,
                59,
                'minute',
                formatter,
                filter,
                currentValues.value,
            )
        }

        const genSecondOptions = () => {
            const { filter, formatter } = props;
            return genOptions(
                0,
                59,
                'second',
                formatter,
                filter,
                currentValues.value,
            )
        }
        const columns = computed(() => {
            const ymd = [genYearOptions(), genMonthOptions(), genDayOptions()]
            const cols = props.columnsType.map((type) => {
                switch (type) {
                    case 'hour':
                        return genHourOptions();
                    case 'minute':
                        return genMinuteOptions();
                    case 'second':
                        return genSecondOptions();
                    default:
                        new Error(
                            `[Vant] DateTimePicker: unsupported columns type: ${type}`,
                        );
                        return [];
                }
            })
            return ymd.concat(cols)
        })
        const onChange = (...args: unknown[]) => emit('change', ...args);
        const onCancel = (...args: unknown[]) => emit('cancel', ...args);
        const onConfirm = (...args: unknown[]) => emit('confirm', ...args);
        const confirm = () => pickerRef.value?.confirm();
        const getSelectedDate = () => currentValues.value;

        expose({ confirm, getSelectedDate } as DatetimePickerExpose);

        return () => (
            <Picker
                ref={pickerRef}
                v-model={currentValues.value}
                v-slots={slots}
                columns={columns.value}
                {...props}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onChange={onChange}
            />
        )
    }
})