import ToolbarItem, { BaseToolbarItemProps } from '../ToolbarItem';
import useMessages from '@genstackio/react-contexts/lib/hooks/useMessages';

export function MessageToolbarItem(props: MessageToolbarItemProps) {
    const { messages } = useMessages();
    return (
        <ToolbarItem {...props} icon={'fa-far--comment-alt'} activeIcon={'fa-comment-alt'} count={messages.length} />
    );
}

export type MessageToolbarItemProps = BaseToolbarItemProps;

// noinspection JSUnusedGlobalSymbols
export default MessageToolbarItem;
