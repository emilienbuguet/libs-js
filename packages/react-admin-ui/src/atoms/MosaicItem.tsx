import clsx from 'clsx';
import { WithItem } from '../withs';
import { AsWrapper } from '../as';

export function MosaicItem({ children, item, className }: MosaicItemProps) {
    const Comp = typeof item === 'object' && item.component;
    if (!Comp) return <div className={clsx('w-44 h-20', 'bg-disabled', className)}>{children || ''}</div>;
    return <Comp className={clsx('w-44 h-20', className)} />;
}

export interface MosaicItemProps extends AsWrapper, WithItem {}

// noinspection JSUnusedGlobalSymbols
export default MosaicItem;
