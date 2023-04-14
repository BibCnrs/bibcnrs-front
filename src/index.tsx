import './index.scss';
import I18N from './app/shared/locales/I18N';
import LocalizedThemeProvider from './app/components/utils/LocalizedThemeProvider';
import { getTheme } from './app/shared/Theme';
import ContextProvider from './app/components/utils/ContextProvider';
import App from './app/App';
import ExceptedError from './app/pages/errors/ExceptedError';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ReactDOMClient from 'react-dom/client';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

if (getTheme() === 'dark') {
    import('./index.dark.scss');
}

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={I18N}>
                <LocalizedThemeProvider>
                    <BrowserRouter>
                        <ContextProvider>
                            <ExceptedError>
                                <App />
                            </ExceptedError>
                        </ContextProvider>
                    </BrowserRouter>
                </LocalizedThemeProvider>
            </I18nextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
