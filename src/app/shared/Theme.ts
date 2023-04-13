const createIfNotExsite = () => {
    if (window.localStorage.getItem('mode') === null) {
        window.localStorage.setItem('mode', 'light');
    }
};

export const getTheme = (): 'light' | 'dark' => {
    const mode = window.localStorage.getItem('mode');
    if (mode === null) {
        createIfNotExsite();
        return 'light';
    }
    return mode as 'light' | 'dark';
};

export const setTheme = (value: boolean) => {
    if (value) {
        window.localStorage.setItem('mode', 'dark');
    } else {
        window.localStorage.setItem('mode', 'light');
    }
};
