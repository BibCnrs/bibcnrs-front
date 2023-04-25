import I18N from './app/shared/locales/I18N';
import LocalizedThemeProvider from './app/components/provider/LocalizedThemeProvider';
import ContextProvider from './app/components/provider/ContextProvider';
import App from './app/App';
import ExceptedError from './app/pages/errors/ExceptedError';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ReactDOMClient from 'react-dom/client';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={I18N}>
                <ContextProvider>
                    <LocalizedThemeProvider>
                        <BrowserRouter>
                            <ExceptedError>
                                <App />
                            </ExceptedError>
                        </BrowserRouter>
                    </LocalizedThemeProvider>
                </ContextProvider>
            </I18nextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
