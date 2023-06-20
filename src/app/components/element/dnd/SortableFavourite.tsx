import './SortableFavourite.scss';
import CustomButton from '../button/CustomButton';
import AnimatedPaper from '../paper/animated/AnimatedPaper';
import { useSortable } from '@dnd-kit/sortable';
import { CSS as DndCSS } from '@dnd-kit/utilities';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { SortableFavouriteProps } from '../../../shared/types/props.types';

const SortableFavourite = ({ id, entry }: SortableFavouriteProps) => {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id });

    if (!entry) {
        return null;
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: DndCSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}
        >
            <AnimatedPaper className="favourite-entry" color={entry.personal ? '#00FFFF' : undefined} border>
                <div
                    className="favourite-entry-navigation"
                    style={
                        entry.personal
                            ? {
                                  borderColor: '#00FFFF', // TODO Found a better color
                              }
                            : undefined
                    }
                >
                    <div className="favourite-entry-navigation-button" ref={setActivatorNodeRef} {...listeners}>
                        <DragIndicatorIcon htmlColor={entry.personal ? '#00FFFF' : 'var(--table-border)'} />
                    </div>
                </div>
                <div className="favourite-entry-content">
                    <div className="favourite-entry-content-textual">
                        <h1 className="favourite-entry-content-title">
                            <a className="link" href={entry.url} target="_blank" rel="noreferrer noopener nofollow">
                                {entry.title}
                            </a>
                        </h1>
                    </div>
                    <div className="favourite-entry-content-button-container">
                        <CustomButton className="favourite-entry-content-button margin" size="small">
                            <DeleteOutlineIcon />
                        </CustomButton>
                        <CustomButton className="favourite-entry-content-button" size="small">
                            <OpenInNewIcon />
                        </CustomButton>
                    </div>
                </div>
            </AnimatedPaper>
        </div>
    );
};

export default SortableFavourite;
