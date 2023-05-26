import App from './app/App';
import AuthenticationProvider from './app/components/provider/AuthenticationProvider';
import ContextProvider from './app/components/provider/ContextProvider';
import LocalizedThemeProvider from './app/components/provider/LocalizedThemeProvider';
import ExceptedError from './app/pages/errors/ExceptedError';
import I18N from './app/shared/locales/I18N';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

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
                                <AuthenticationProvider>
                                    <App />
                                </AuthenticationProvider>
                            </ExceptedError>
                        </BrowserRouter>
                    </LocalizedThemeProvider>
                </ContextProvider>
            </I18nextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
