import './scss/BookmarkButton.scss';
import { useFavoriteResources } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import { BibContext } from '../../internal/provider/ContextProvider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useState } from 'react';
import type { BookmarkButtonProps } from '../../../shared/types/props.types';

const BookmarkButton = ({ title, url, className }: BookmarkButtonProps) => {
    const { login } = useContext(BibContext);
    const t = useTranslator();
    const { favoriteResources, addFavorite, removeFavorite } = useFavoriteResources();
    const [inBookmark, setInBookmark] = useState(false);

    useEffect(() => {
        if (login) {
            const titles = new Set(favoriteResources.map((value) => value.title));
            if (titles.has(title)) {
                setInBookmark(true);
                return;
            }
            const urls = new Set(favoriteResources.map((value) => value.url));
            if (urls.has(url)) {
                setInBookmark(true);
            }
        }
    }, [favoriteResources, login, title, url]);

    const handleClick = () => {
        if (!inBookmark) {
            addFavorite({
                title,
                url,
                personal: false,
            });
            setInBookmark(true);
            return;
        }
        removeFavorite({
            title,
            url,
        });
        setInBookmark(false);
    };

    return (
        <div className={`favorite-button-container ${className}`}>
            <Tooltip title={t('components.button.favorite.tooltip')} arrow>
                <button className="favorite-button" onClick={handleClick}>
                    {inBookmark ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </button>
            </Tooltip>
        </div>
    );
};

export default BookmarkButton;
