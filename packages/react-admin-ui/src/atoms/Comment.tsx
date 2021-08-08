import clsx from 'clsx';
import Text from './Text';
import { WithSubtitle, WithTitle, WithMessage } from '../withs';
import { AsComponent } from '../as';

export function Comment({ title, subtitle, message, className }: CommentProps) {
    return (
        <div className={clsx('p-4', className)}>
            <div className={'flex items-end'}>
                <Text variant={'subtitle'} text={title} color={'dark'} />
                <Text variant={'xsmall'} text={subtitle} color={'dark'} className={'ml-4 mb-1'} />
            </div>
            <div className={'pt-6'}>
                <Text variant={'description'} text={message} color={'dark'} className={'leading-7'} />
            </div>
        </div>
    );
}

export interface CommentProps extends AsComponent, WithTitle, WithSubtitle, WithMessage {}

// noinspection JSUnusedGlobalSymbols
export default Comment;
