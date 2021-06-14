import {ReactNode} from 'react';
import clsx from 'clsx';
import Button from './Button';
import Dropdown from './Dropdown';
import boxClass from '../utils/boxClass';
import {box_color, box_variant, image} from '../types';
import Container from './Container';
import Icon from "./Icon";

const paddings = {
    none: '',
    default: 'p-10'
}

export function Block({btnLabel, children, classes = {}, className, color ='light', dropdownItems, icon, image, padding = 'default', title, variant = 'filled'}: BlockProps) {
    const content = <>
        { title && (
            <div className={clsx(paddings['default'], 'border-b-1 flex justify-between items-center')}>
                <h5 className={'text-2xl'}>{title}</h5>
                {btnLabel && <Button color={color}>{btnLabel}</Button>}
                {dropdownItems && <Dropdown menuItems={dropdownItems} color={color} variant={variant} />}
                {icon && <Icon icon={icon}/>}
            </div>
        )}
        <div className={clsx(paddings[padding], classes.content, 'text-md')}>
            {children || ''}
        </div>
    </>
    return (
        <div className={clsx('rounded-2xl relative flex flex-col shadow-block', boxClass({color, variant}))} >
            {image &&
            <Container bgImage={image} className={clsx(className,classes.root,'rounded-2xl')}>
                content
            </Container>}
            { !image && content}
        </div>
    );
}

export interface BaseBlockProps {
    children?: ReactNode,
    classes?: {
        [key: string]: string
    },
    className?: string,
    color?: box_color,
    padding?: 'default' | 'none',
    variant?: box_variant,
}

export interface BlockProps extends BaseBlockProps {
    btnLabel?: string,
    dropdownItems?: {
        name?: string
    }[],
    icon?: string,
    image?: image,
    title?: ReactNode,
}

export default Block