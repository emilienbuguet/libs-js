import React from 'react';
import { args, s, a } from '../../utils';
import { SwitchField } from '../../../src';
import { useForm } from '../../../src/hooks/useForm';

export default {
    title: 'Atoms/fields/SwitchField',
    component: SwitchField,
    argTypes: a({
        label: args.label,
        disabled: args.disabled,
        helper: args.helper,
        name: args._disabled,
        register: args._disabled,
        errors: args._disabled,
        defaultValues: args._disabled,
        onChange: args._disabled,
        options: args._disabled,
        field: args._disabled,
        kind: args._disabled,
    }),
};

const Template = () => {
    const defaultValues = { myfield: false };
    const { field, Form, SubmitButton} = useForm({defaultValues, onSubmit: (data: any) => {alert(JSON.stringify(data, null, 4))}});
    return (
    <Form>
        <SwitchField kind={'myfield'} {...field}/>
        <SubmitButton/>
    </Form>);
};

export const basic = s(Template, {});
