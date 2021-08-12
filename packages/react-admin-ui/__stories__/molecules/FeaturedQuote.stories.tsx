import { args, s, a } from '../utils';
import { FeaturedQuote } from '../../src';
import data from '../data';

export default {
    title: 'Molecules/FeaturedQuote',
    component: FeaturedQuote,
    argTypes: a({
        text: args.text,
        title: args.title,
        subtitle: args.price,
        color: args.color,
    }),
};

const Template = (args) => <FeaturedQuote {...args} />;

export const basic = s(Template, {
    title: data.user.name,
    subtitle: data.user.title,
    text: data.common.content,
});

export const withImage = s(Template, {
    text: data.common.content,
    title: data.user.name,
    subtitle: data.user.title,
    image: data.user.image,
});
