import SearchBar from '../SearchBar';
import ToolbarItem, { BaseToolbarItemProps } from '../ToolbarItem';
import { WithActive, WithClassName, WithOnChange, WithOnToggle } from '../../withs';

export function SearchToolbarItem({ className, onChange, onToggle, active = false, ...props }: SearchToolbarItemProps) {
    return active ? (
        <SearchBar defaultFocus onClear={onToggle} onChange={onChange} className={className} />
    ) : (
        <ToolbarItem {...props} icon={'fa-search'} onToggle={onToggle} className={className} />
    );
}

export interface SearchToolbarItemProps
    extends BaseToolbarItemProps,
        WithClassName,
        WithOnChange,
        WithOnToggle,
        WithActive {}

export default SearchToolbarItem;
