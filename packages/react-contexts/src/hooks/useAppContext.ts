import { useCallback, useMemo, useState } from 'react';
import formatLng from '../utils/formatLng';
import createClient, { gql, jwtDecode, useLazyQuery, useMutation, useQuery } from '@ohoareau/apollo-client-jwt';
import {
    decoded_token,
    user,
    storage,
    cart,
    user_context_value,
    locales_context_value,
    images_context_value,
    app_context_params,
    upload_context_value,
} from '../types';
import MuiLink from '@material-ui/core/Link';
import fetch from 'isomorphic-fetch';
import mergeCartItems from '../utils/mergeCartItems';
import i18nFactory from '../utils/i18nFactory';
import useDrawerProviderValue from './useDrawerProviderValue';

const navigationProviderValue: any = {
    InternalLink: MuiLink,
    ExternalLink: MuiLink,
};

function defaultStorageKeyFactory(key: string) {
    return `x_${key}`;
}

const defaultApiOptions = {};

const storage: storage | undefined = (() => {
    const s = 'undefined' === typeof localStorage ? undefined : localStorage;
    if (!s) return undefined;
    // noinspection JSUnusedGlobalSymbols
    return {
        setItem: (key: string, value: any) => {
            if (!value) return s.removeItem(key);
            return s.setItem(key, JSON.stringify(value));
        },
        getItem: (key: string) => {
            const v = s.getItem(key);
            return v && 'undefined' !== v ? JSON.parse(v) : undefined;
        },
        hasItem: (key: string) => s.hasItem(key),
        removeItem: (key: string) => s.removeItem(key),
    };
})();

export function useAppContext({
    storageKeyFactory = defaultStorageKeyFactory,
    themes,
    theme,
    queries,
    callbacks,
    apiOptions = undefined,
    translations,
    locales,
    defaultLocale = 'en-US',
    fallbackLocale = 'en-US',
    getImage,
    fullscreen,
    upload,
}: app_context_params) {
    apiOptions = apiOptions || defaultApiOptions;
    const { themeName = 'default' } = {};
    const fetchUserFromLocalStorage = useCallback(() => storage?.getItem(storageKeyFactory('user')), [storage]);
    const fetchCartFromLocalStorage = useCallback(() => storage?.getItem(storageKeyFactory('cart')), [storage]);
    const fetchLocaleFromLocalStorage = useCallback(() => storage?.getItem(storageKeyFactory('locale')), [storage]);
    const [user, setUser] = useState<user | undefined>(fetchUserFromLocalStorage);
    const [cart, setCart] = useState<cart | undefined>(fetchCartFromLocalStorage);

    const locale = fetchLocaleFromLocalStorage() || defaultLocale;
    const enrichedSetCart = useCallback(
        (cart) => {
            const localStorageCart = fetchCartFromLocalStorage();
            let mergedCart: cart;
            if (localStorageCart) {
                const { items: oldItems, ...oldCart }: cart = fetchCartFromLocalStorage();
                const { items: newItems, ...newCart } = cart;
                const mergedItems = mergeCartItems(newItems, oldItems);
                mergedCart = { ...oldCart, ...newCart, items: mergedItems };
            } else {
                mergedCart = cart;
            }
            storage?.setItem(storageKeyFactory('cart'), mergedCart);
            setCart(cart);
        },
        [storage, setCart, fetchCartFromLocalStorage],
    );

    const enrichedSetUser = useCallback(
        (user) => {
            storage?.setItem(storageKeyFactory('user'), user);
            setUser(user);
        },
        [storage, setUser],
    );

    const resetCart = useCallback(() => {
        storage?.removeItem(storageKeyFactory('cart'));
        setCart(undefined);
    }, [storage, setCart]);

    const getCurrentTokens = useCallback(() => {
        const u = fetchUserFromLocalStorage();
        return u
            ? {
                  token: u.token,
                  refreshToken: u.refreshToken,
              }
            : {};
    }, [fetchUserFromLocalStorage]) as any;

    const api: any = useState(() => ({ client: undefined }));

    const localApiOptions = useMemo(
        () => ({
            uri: process.env.GRAPHQL_API_ENDPOINT || process.env.REACT_APP_API_ENDPOINT,
            timeout: 5000,
            ...apiOptions,
        }),
        [apiOptions],
    );

    const getQuery = useCallback(
        (name: string) => {
            if (!queries || !(queries[name] || queries['*'])) throw new Error(`No query available for '${name}'`);
            if ('function' !== typeof (queries[name] || queries['*']))
                throw new Error(`Query must be a function for '${name}'`);
            return (queries[name] || queries['*'])(gql);
        },
        [queries],
    );

    const getCallbacks = useCallback(
        (name: string) => (!callbacks || !(callbacks[name] || callbacks['*']) ? {} : callbacks[name] || callbacks['*']),
        [callbacks],
    );

    const refreshUser = useCallback(async () => {
        const r = await api.client!.query({ query: getQuery('GET_CURRENT_USER') });
        if (!r || !r.data || !r.data.getCurrentUser) throw new Error('Unable to retrieve current user');
        await enrichedSetUser({ ...fetchUserFromLocalStorage(), ...r.data.getCurrentUser });
    }, [api, getQuery, enrichedSetUser, fetchUserFromLocalStorage]) as any;

    const setCurrentTokens = useCallback(
        async (tokens: any) => {
            const u = (await jwtDecode(tokens.token)) as decoded_token;
            await enrichedSetUser({ ...u, token: tokens.token, refreshToken: tokens.refreshToken });
            await refreshUser();
        },
        [enrichedSetUser, refreshUser],
    ) as any;

    const onLogout = useCallback(async () => {
        await enrichedSetUser(undefined);
    }, [enrichedSetUser]) as any;

    const apiProviderValue: any = useMemo<{
        getQuery: Function;
        getCallbacks: Function;
        useMutation: Function;
        useQuery: Function;
        useLazyQuery: Function;
    }>(() => ({ getQuery, getCallbacks, useMutation, useQuery, useLazyQuery }), [getQuery, getCallbacks]);
    const cartProviderValue: any = useMemo<{ cart: cart | undefined; setCart: Function; resetCart: Function }>(
        () => ({ cart: fetchCartFromLocalStorage(), setCart: enrichedSetCart, resetCart }),
        [cart, enrichedSetCart, resetCart],
    );
    const userProviderValue: any = useMemo<user_context_value>(
        () => ({
            user: fetchUserFromLocalStorage(),
            setUser: enrichedSetUser,
            getTokens: getCurrentTokens,
            setTokens: setCurrentTokens,
            logout: onLogout,
            refreshUser,
        }),
        [fetchUserFromLocalStorage, user, enrichedSetUser, setCurrentTokens, getCurrentTokens, onLogout, refreshUser],
    );

    const refreshTokens = useCallback(
        async (refreshToken: string, client: { mutate: Function }) => {
            const r = await client.mutate({
                mutation: getQuery('REFRESH_LOGIN'),
                variables: { data: { refreshToken } },
            });
            if (!r || !r.data || !r.data.refreshAuthToken) throw new Error('Unable to refresh auth token');
            return {
                token: r.data.refreshAuthToken.token,
                refreshToken: r.data.refreshAuthToken.refreshToken,
            };
        },
        [getQuery],
    );

    api.client = useMemo(() => {
        return createClient({
            fetch,
            getCurrentTokens,
            setCurrentTokens,
            refreshTokens,
            onLogout,
            onAuthError: onLogout,
            ...localApiOptions,
        });
    }, [localApiOptions, getCurrentTokens, setCurrentTokens, refreshTokens, onLogout]);

    const themeFactory = useCallback(
        (old: any = {}) => ({
            ...old,
            ...((themes as any)[themeName] || {}),
        }),
        [themes, themeName],
    );

    const i18n = useMemo(() => {
        return i18nFactory({ lng: formatLng(locale), resources: translations });
    }, [locale, translations]);

    const localesProviderValue: locales_context_value = useMemo(
        () => ({
            locales: (locales || []).map((x) => ({ ...x, label: i18n.t(x.label) })),
            default: defaultLocale,
            fallback: fallbackLocale,
        }),
        [locales, defaultLocale, fallbackLocale],
    );
    // noinspection JSUnusedLocalSymbols
    const imagesProviderValue: images_context_value = useMemo(
        () => ({ get: getImage || ((key: string) => undefined) }),
        [getImage],
    );
    const drawerProviderValue = useDrawerProviderValue();

    const uploadValue = useMemo(() => (!!upload ? { requestUploadInfos: upload } : undefined), [upload]) as
        | upload_context_value
        | undefined;
    return useMemo(
        () => ({
            client: api.client,
            i18n,
            baseTheme: theme,
            pageTheme: themeFactory,
            storage,
            locale,
            user: userProviderValue,
            api: apiProviderValue,
            cart: cartProviderValue,
            navigation: navigationProviderValue,
            locales: localesProviderValue,
            images: imagesProviderValue,
            themes,
            fullscreen,
            upload: uploadValue,
            drawer: drawerProviderValue,
        }),
        [
            drawerProviderValue,
            uploadValue,
            api.client,
            i18n,
            theme,
            themeFactory,
            storage,
            locale,
            userProviderValue,
            cartProviderValue,
            navigationProviderValue,
            localesProviderValue,
            imagesProviderValue,
            themes,
            fullscreen,
        ],
    );
}

// noinspection JSUnusedGlobalSymbols
export default useAppContext;
