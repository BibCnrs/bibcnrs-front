import { updateFavourite } from './Favourite';
import { updateAlert } from './SearchAlert';
import { createQuery, environment } from '../Environment';
import type { FavouriteResourceDataType, SessionUserDataType } from '../../shared/types/data.types';
import type { Institute } from '../../shared/types/types';

class Session {
    private session: Storage;
    private readonly key: string;
    constructor() {
        this.session = window.sessionStorage;
        this.key = 'user';
    }

    getUser = (): SessionUserDataType | null => {
        const status = this.session.getItem(this.key);
        if (status === null) {
            return null;
        }
        return JSON.parse(status) as SessionUserDataType;
    };

    needFetch = (): boolean => {
        const user = this.getUser();
        if (user === null || user.fetch === null) {
            return false;
        }
        return user.fetch;
    };

    getUsername = (): string | 'null' => {
        const user = this.getUser();
        if (user) {
            return user.username;
        }
        return 'null';
    };

    getFavouriteDomain = (): Institute | undefined => {
        const user = this.getUser();
        if (user) {
            return user.favorite_domain;
        }
        return undefined;
    };

    getDomains = (): Institute[] => {
        const user = this.getUser();
        if (user) {
            return user.domains;
        }
        return [];
    };

    getFavouriteResources = (): FavouriteResourceDataType[] => {
        const user = this.getUser();
        if (user) {
            return user.favouriteResources ?? [];
        }
        return [];
    };

    updateFavouriteResources = async (data: FavouriteResourceDataType[]) => {
        const user = this.getUser();
        if (user) {
            user.favouriteResources = data;
            this.update(user);
            updateFavourite(user.id, data).then();
        }
    };

    updateSearchAlert = async (historyId: number, frequency: string) => {
        const user = this.getUser();
        if (user) {
            await updateAlert(user.id, historyId, frequency);
        }
    };

    getToken = (): string | undefined => {
        const user = this.getUser();
        if (user) {
            return user.token;
        }
        return undefined;
    };

    setNeedFetch = (): void => {
        this.session.setItem(
            this.key,
            JSON.stringify({
                fetch: true,
            }),
        );
    };

    isLegacy = (): boolean => {
        const user = this.getUser();
        if (user) {
            return user.legacy;
        }
        return true;
    };

    update = (data: SessionUserDataType): void => {
        this.session.setItem(this.key, JSON.stringify(data));
    };

    remove = (): void => {
        this.session.removeItem(this.key);
    };
}

const session = new Session();

export const getUsername = session.getUsername;
export const isLegacy = session.isLegacy;
export const getDomains = session.getDomains;
export const getFavouriteDomain = session.getFavouriteDomain;
export const getFavouriteResources = session.getFavouriteResources;
export const updateFavouriteResources = session.updateFavouriteResources;
export const updateSearchAlert = session.updateSearchAlert;
export const getToken = session.getToken;

export const loginToJanus = (): void => {
    const janusUrl = createQuery(environment.get.account.janus, {
        origin: window.location.href,
    });
    session.setNeedFetch();
    window.location.assign(janusUrl);
};

export const loginToLegacy = async (form: any): Promise<boolean> => {
    let response;
    try {
        response = await fetch(createQuery(environment.post.account.legacy), {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
    } catch (e) {
        return false;
    }

    try {
        const user = {
            ...(await response.json()),
            fetch: false,
            legacy: true,
        };

        // If response return an error, abort login
        if (user.error) {
            return false;
        }

        session.update(user);
    } catch (e) {
        return false;
    }

    return true;
};

export const logout = async (): Promise<void> => {
    await fetch(createQuery(environment.post.account.logout), {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    session.remove();
};

export const initSession = async (): Promise<boolean> => {
    const status = session.getUser();

    if (status === null) {
        return false;
    }

    if (!session.needFetch()) {
        return !!status.token;
    }

    let response;
    try {
        response = await fetch(createQuery(environment.post.account.user), {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        return false;
    }

    try {
        const user = {
            ...(await response.json()),
            fetch: false,
            legacy: false,
        };

        // If response return an error, abort login
        if (user.error) {
            return false;
        }

        session.update(user);
    } catch (e) {
        return false;
    }

    return true;
};
