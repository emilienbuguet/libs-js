import clsx from 'clsx';
import Badge from '../atoms/Badge';
import boxClass from '../utils/boxClass';
import { WithBadge, WithColorOfBox, WithItemsOfList } from '../withs';
import { AsComponent } from '../as';

export function List({ className, badge: globalBadge, color: globalColor, items = [] }: ListProps) {
    return (
        <ul className={clsx('px-0', className)}>
            {items.map(({ color, text, badge }, index) => (
                <li
                    key={index}
                    className={clsx(
                        boxClass({ color: color || globalColor, variant: 'contained' }),
                        'border list-none rounded-sm px-3 py-3 flex justify-between',
                    )}
                >
                    {text || ''}
                    {(badge || globalBadge) && (
                        <Badge
                            variant={badge?.variant || globalBadge?.variant}
                            color={badge?.color || globalBadge?.color}
                            text={badge?.text || globalBadge?.label}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}

export interface ListProps extends AsComponent, WithColorOfBox, WithBadge, WithItemsOfList {}

// noinspection JSUnusedGlobalSymbols
export default List;
