import { args, s, a } from '../../utils';
import { IpAddressField } from '../../../src';

export default {
    title: 'Atoms/fields/IpAddressField',
    component: IpAddressField,
    argTypes: a({
        disabled: args.disabled,
        label: args.label,
        placeholder: args.placeholder,
        register: args._disabled,
        type: args.fieldType,
        errors: args._disabled,
        defaultValues: args._disabled,
        onChange: args._disabled,
        options: args._disabled,
        value: args.fieldValue,
        kind: args._disabled,
    }),
};

export const basic = s(IpAddressField, {});
