import { Link } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ExceptedErrorProps } from '../../shared/types/props.types';

function ErrorFallback({ error }: FallbackProps) {
    return (
        <div id="app">
            <h1>Unrecoverable Error</h1>
            <p>We failed to display or process asked element</p>
            <pre>{error?.message}</pre>
            <Link to="/">Go back to home</Link>
        </div>
    );
}

export default function ExceptedError(props: ExceptedErrorProps) {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>;
}
