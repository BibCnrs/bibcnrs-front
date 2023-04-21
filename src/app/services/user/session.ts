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

    update = (data: SessionUserDataType): void => {
        this.session.setItem(this.key, JSON.stringify(data));
    };

    remove = (): void => {
        this.session.removeItem(this.key);
    };
}

const session = new Session();

export const getUsername = session.getUsername;

export const loginToJanus = () => {
    const janusUrl = createQuery(environment.get.account.janus, {
        origin: window.location.href,
    });
    session.setNeedFetch();
    window.location.assign(janusUrl);
};

export const logout = async () => {
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

export const initSession = async () => {
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

    const user = {
        ...(await response.json()),
        fetch: false,
    };

    session.update(user);

    return true;
};
