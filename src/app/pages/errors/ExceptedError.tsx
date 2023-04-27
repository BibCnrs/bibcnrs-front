import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import type { ExceptedErrorProps } from '../../shared/types/props.types';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error }: FallbackProps) => {
    return (
        <div id="app">
            <h1>Unrecoverable Error</h1>
            <p>We failed to display or process asked element</p>
            <pre>{error?.message}</pre>
            <Link to="/">Go back to home</Link>
        </div>
    );
};

const ExceptedError = ({ children }: ExceptedErrorProps) => {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

export default ExceptedError;
