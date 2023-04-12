import Button from '@mui/material/Button';

export default function NewsButton({ text }: any) {
    return (
        <div className="header-nav header-nav-spacer">
            <Button className="header-button">{text}</Button>
        </div>
    );
}
