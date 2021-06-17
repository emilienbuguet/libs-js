import "../assets/css/styles.css";
import i18nFactory from "../src/utils/i18nFactory";
import {I18nextProvider} from "react-i18next";
import {select} from "@storybook/addon-knobs";
import { StylesProvider } from '@material-ui/core/styles';
import translations from "../src/configs/translations";
import {boxVariants} from "../lib/mappings/box-variants";
import {boxColors} from "../lib/mappings/box-colors";
import {corners} from "../lib/mappings/corners";
import {paddings} from "../lib/mappings/paddings";
import {alignments} from "../lib/mappings/alignments";
import {progressVariants} from "../lib/mappings/progress-variants";
import {shapes} from "../lib/mappings/shapes";
import {spinnerVariants} from "../lib/mappings/spinner-variants";
import {statuses} from "../lib/mappings/statuses";
import {textVariants} from "../lib/mappings/text-variants";

export const langSelect = () => select('lang', translationNames, 'fr-FR');

const translationNames = Object.keys(translations);
translationNames.sort();

export function uiStory(Component, {}: {apiMocks: object|false} = {apiMocks: {}}) {
    return args => {
        const lang = langSelect();
        const i18n = i18nFactory({lng: lang});

        return  (
          <StylesProvider injectFirst>
            <I18nextProvider i18n={i18n}>
                <Component {...args} />
            </I18nextProvider>
          </StylesProvider>
        )
    }
}

export function s(Component, args, opts: any = {}) {
    const story = (Object.assign as any)(uiStory(Component, opts).bind({}), {args});
    story.story = story.story || {};
    story.story.parameters = story.story.parameters || {};
    story.story.parameters.themes = {
        list: [
            { name: 'orange', class: 'theme-orange', color: 'orange' },
            { name: 'blue', class: 'theme-blue', color: 'blue' },
            { name: 'green', class: 'theme-green', color: 'green' },
            { name: 'brown', class: 'theme-brown', color: 'brown' }
        ],
    };
    story.story.parameters.grid = {
        columns: 12,
    };
    return story;
}

export const args = {
    accordionVariant: { control: {type: 'select'}, options: ['filled', 'outlined', 'contained', 'light'] },
    _disable: { table: {disable: true} },
    actions: { control: {type: 'object'} },
    author:{ control: {type: 'text'}},
    badge: { control: {type: 'object'} },
    badges: { control: {type: 'object'} },
    badgeLabel: {control: {type: 'text'}},
    badgeVariant: { control: {type: 'select'}, options: ['pill', 'tag', 'none'] },
    bgColor: { control: {type: 'color'} },
    bgIcon: { table: {disable: true} },
    blockVariant: { control: {type: 'select'}, options: Object.keys(boxVariants) },
    btnLabel: {control: {type: 'text'}},
    buttonsItems: { control: {type: 'object'} },
    chart: { control: {type: 'object'} },
    chartItems: { control: {type: 'object'} },
    children: {control: {type: 'text'}},
    classes: { table: {disable: true} },
    closable: { control: {type: 'boolean'} },
    code: { control: {type: 'number'} },
    color: { control: {type: 'select'}, options: Object.keys(boxColors) },
    columns: { control: {type: 'object'} },
    comments : { control: {type: 'number'} },
    content: { control: {type: 'text'} },
    dashboardItems: { control: {type: 'object'} },
    datas: { control: {type: 'object'} },
    date: { control: {type: 'number'} },
    default: { control: {type: 'text'} },
    defaultValue: { control: {type: 'number'} },
    description: {control: {type: 'text'}},
    disabled: { control: {type: 'boolean'} },
    dropdownItems: { control: {type: 'object'} },
    error: { control: {type: 'boolean'} },
    errorText: { control: {type: 'text'} },
    fieldType: { control: {type: 'select'}, options: ['text', 'email', 'password'] },
    fieldValue: { control: {type: 'text'}},
    form: { control: {type: 'object'} },
    icon: { table: {disable: true} },
    corner: { control: {type: 'select'}, options: Object.keys(corners) },
    iconCorner: { control: {type: 'select'}, options: ['settings', 'query_builder', 'notifications_none_icon', 'none'] },
    image: { control: {type: 'object'} },
    initialPrice: { control: {type: 'object'} },
    isMenu: { control: {type: 'boolean'} },
    items: { control: {type: 'object'} },
    label: { control: {type: 'text'} },
    labels: { control: {type: 'object'} },
    large: { control: {type: 'boolean'} },
    likes : {control:{type: 'number'}},
    logo: { control: {type: 'object'} },
    menuItems: { control: {type: 'object'} },
    menu: { control: {type: 'object'} },
    message: { control: {type: 'text'} },
    name: { control: {type: 'text'} },
    onChange: { table: {disable: true} },
    onClick: { table: {disable: true} },
    onClose: { table: {disable: true} },
    opened: { control: {type: 'boolean'} },
    overline: { control: {type: 'text'} },
    padding: { control: {type: 'radio'}, options: Object.keys(paddings) },
    paginationVariant: { control: {type:'select'}, options :['text', 'outlined'] },
    pill: { control: {type: 'object'} },
    placeholder: { control: {type: 'text'} },
    position: { control: {type:'select'}, options: Object.keys(alignments) },
    price: { control: {type: 'text'} },
    progress: { control: {type: 'number'} },
    progressVariant: { control: {type: 'select'}, options: Object.keys(progressVariants) },
    quantity: { control: {type: 'number'} },
    rating: { control: {type: 'number'} },
    ribbon: { control: {type: 'select'}, options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] },
    rowsPerPage: { control: {type: 'number'} },
    selection: { control: {type: 'boolean'} },
    series: { control: {type: 'object'} },
    shape: { control: {type: 'select'}, options: Object.keys(shapes) },
    size: { control: {type: 'select'}, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    spinnerVariant: { control: {type: 'select'}, options: Object.keys(spinnerVariants) },
    status: { control: {type: 'select'}, options: Object.keys(statuses) },
    striped: { control: {type: 'boolean'} },
    subtitle: { control: {type: 'text'} },
    tag: { control: {type: 'object'} },
    text: { control: {type: 'text'} },
    textValue: { control: {type: 'text'} },
    textVariant: { control: {type:'select'}, options: Object.keys(textVariants) },
    toolbar: { control: {type: 'object'} },
    toRight: { control: {type: 'boolean'} },
    title: { control: {type: 'text'} },
    unit: { control: {type: 'select'}, options: [undefined, '$', '€', '£', 'M'] },
    value: { control: {type: 'number'} },
    values: { control: {type: 'object'} },
};