import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import BaseRating, { BaseBaseRatingProps } from './BaseRating';

const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    info: 'bg-info',
    warning: 'bg-warning',
    danger: 'bg-danger',
    light: 'bg-light',
    dark: 'bg-dark',
};

const useStyles = makeStyles({
    root: {
        flexDirection: 'row-reverse',
    },
    iconEmpty: {
        opacity: 0.25,
    },
});

const Icon = ({ color }: any) => <div className={clsx('w-5 h-5 mr-1', colors[(color as string) || 'primary'])} />;

export function ReverseSquaresRating(props: ReverseSquaresRatingProps) {
    return <BaseRating reverse kind={'reverse-squares'} styles={useStyles} icon={Icon} {...props} />;
}

export type ReverseSquaresRatingProps = BaseBaseRatingProps;

// noinspection JSUnusedGlobalSymbols
export default ReverseSquaresRating;
