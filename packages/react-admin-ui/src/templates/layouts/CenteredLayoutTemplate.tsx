import clsx from 'clsx';
import Div from '../../atoms/Div';
import Image from '../../atoms/Image';
import Container from '../../atoms/Container';
import { AsWrapper } from '../../as';
import {WithCenter, WithImage, WithLogo} from '../../withs';

export function CenteredLayoutTemplate({ children, className, center = true, image, logo }: CenteredLayoutTemplateProps) {
    return (
        <Container
            bgImage={image}
            className={clsx(
                'bg-cover h-screen py-10 px-0 sm:px-3 flex flex-col justify-start sm:justify-center',
                center && 'items-center',
                className,
            )}
        >
            <Image expand={false} {...logo} className={'mx-auto max-w-xxs sm:max-w-xs'} />
            <Div
                full
                mt={'md'}
                p={'_sl'}
                className={'max-w-full sm:max-w-md bg-clear rounded-none sm:rounded-lg shadow-block'}
            >
                {children}
            </Div>
        </Container>
    );
}

export interface CenteredLayoutTemplateProps extends AsWrapper, WithImage, WithLogo, WithCenter {}

// noinspection JSUnusedGlobalSymbols
export default CenteredLayoutTemplate;
