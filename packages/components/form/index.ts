import Form from './Form.tsx';
import { withInstall } from '@vant4-kit/utils';
import './style.css'

export const XForm = withInstall(Form);
export type { FormProps } from './Form.tsx'
export type { XFormItemOption, XFormItemRow, CompTypes } from './types.ts'