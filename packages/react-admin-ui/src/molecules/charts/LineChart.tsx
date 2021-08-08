import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import tailwindConfig from '../../../tailwind.config';
import Text from '../../atoms/Text';
import { WithBox, WithLabels, WithSeries, WithTitle } from '../../withs';
import { AsComponent } from '../../as';

const tailwindChartColors = tailwindConfig.theme.extend.chartColors;
const defaultOptions: ApexOptions = {
    chart: {
        toolbar: {
            tools: {
                download: true,
                pan: false,
                reset: false,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
            },
        },
    },
};

export function LineChart({
    className,
    color = 'primary',
    labels,
    series = [],
    title,
    variant = 'filled',
}: LineChartProps) {
    const col = `${variant}_${color}`;
    const options = { ...defaultOptions, labels: labels, colors: tailwindChartColors[col] };
    const datas: any = [];
    series.forEach((data) => {
        datas.push({ data });
    });
    return (
        <div className={className}>
            <Text text={title} variant={'subtitle'} />
            <Chart options={options} series={datas} type={'line'} />
        </div>
    );
}

export interface LineChartProps extends AsComponent, WithBox, WithTitle, WithSeries, WithLabels {}

// noinspection JSUnusedGlobalSymbols
export default LineChart;
