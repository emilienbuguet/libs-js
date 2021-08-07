import clsx from 'clsx';
import Block from '../atoms/Block';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import boxClass from '../utils/boxClass';
import { BoxProvider } from '@genstackio/react-contexts/lib/contexts/BoxContext';
import { WithClassName, WithItemsOfPricing } from '../withs';

export function Pricing({ className, items = [] }: PricingProps) {
    return (
        <div className={clsx('flex inline', className)}>
            {items.map((item, index) => (
                <Block
                    key={index}
                    image={item.image}
                    contentClassName={'space-y-3 flex justify-center items-center flex-col pr-4 pl-4'}
                >
                    <div className={'uppercase'}>
                        <Text text={item?.name} variant={'title4'} />
                    </div>
                    <div
                        className={clsx(
                            boxClass({ color: item.color, variant: item.variant }),
                            'flex rounded-full h-32 w-32 items-center justify-center',
                        )}
                    >
                        <BoxProvider value={{ color: item.color, variant: item.variant }}>
                            <Text text={item.currency} variant={'description'} />
                            <Text text={`${item.price}`} variant={'title1'} />
                            <Text text={item.period} variant={'subtitle'} />
                        </BoxProvider>
                    </div>
                    <div className={'flex flex-col justify-center space-y-3'}>
                        {item.features &&
                            item.features.map(({ title }, index) => (
                                <Text key={index} text={title} variant={'subtitle'} />
                            ))}
                    </div>
                    <div className={'uppercase'}>
                        <Button variant={item.variant} color={item.color} onClick={item.onClick}>
                            {item.label}
                        </Button>
                    </div>
                </Block>
            ))}
        </div>
    );
}

export interface PricingProps extends WithClassName, WithItemsOfPricing {}

export default Pricing;
