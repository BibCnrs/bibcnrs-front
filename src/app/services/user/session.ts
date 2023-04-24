import { createQuery, environment } from '../Environment';
import { SessionUserDataType } from '../../shared/types/data.types';

class Session {
    private session: Storage;
    private readonly key: string;
    constructor() {
        this.session = window.sessionStorage;
        this.key = 'user';
    }

    getUser = (): SessionUserDataType | null => {
        const status = this.session.getItem(this.key) as string | null;
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
