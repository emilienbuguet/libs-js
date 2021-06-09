import {ReactNode} from 'react';
import clsx from 'clsx';
import Button from './Button';
import Dropdown from './Dropdown';
import colorClass from '../utils/colorClass';
import {box_color, box_variant, image} from '../types';
import Container from './Container';
import Icon from "./Icon";

const paddings = {
    none: '',
    default: 'p-10'
}

export function Block({title, icon, padding = 'default', variant = 'filled', children, color ='light', btnLabel, dropdownItems, image, className, classes = {}}: BlockProps) {
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
        <div className={clsx('rounded-2xl relative flex flex-col shadow-block', colorClass({color, variant}))} >
            {image &&
            <Container bgImage={image} className={clsx(className,classes.root,'rounded-2xl')}>
                content
            </Container>}
            { !image && content}
        </div>
    );
}

export interface BaseBlockProps {
    padding?: 'default' | 'none',
    color?: box_color,
    variant?: box_variant,
    children?: ReactNode,
    className?: string,
    classes?: {[key: string]: string},
}

export interface BlockProps extends BaseBlockProps {
    title?: ReactNode,
    icon?: string,
    btnLabel?: string,
    dropdownItems?: {name?: string}[],
    image?: image,
}

export default Block