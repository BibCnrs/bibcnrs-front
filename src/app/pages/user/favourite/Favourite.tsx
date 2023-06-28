import CustomButton from '../../../components/element/button/CustomButton';
import PersonalBookmark from '../../../components/element/dialog/PersonalBookmark';
import SortableFavourite from '../../../components/element/dnd/SortableFavourite';
import PageTitle from '../../../components/internal/PageTitle';
import { useFavouriteResources } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import type { FavouriteResourceWithId } from '../../../shared/types/types';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';

const Favourite = () => {
    const t = useTranslator();
    const { favouritesWithId, removeFavourite, moveFavourite } = useFavouriteResources();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const [items, setItems] = useState<UniqueIdentifier[]>([]);
    const [personal, setPersonal] = useState(false);

    useEffect(() => {
        setItems(favouritesWithId.map((value) => value.id));
    }, [favouritesWithId]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            if (active.id !== over.id) {
                setItems((identifiers) => {
                    const oldIndex = identifiers.indexOf(active.id);
                    const newIndex = identifiers.indexOf(over.id);

                    moveFavourite(favouritesWithId[oldIndex], oldIndex, newIndex);

                    return arrayMove(identifiers, oldIndex, newIndex);
                });
            }
        }
    };

    const handleDelete = (entry: FavouriteResourceWithId) => {
        removeFavourite(entry);
    };

    const handleAddPersonalOpen = () => {
        setPersonal(true);
    };

    const handlerAddPersonalClose = () => {
        setPersonal(false);
    };

    return (
        <div id="app">
            <PageTitle page="favourite" />
            <PersonalBookmark open={personal} onClose={handlerAddPersonalClose} />
            <h1
                style={{
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        marginRight: 'auto',
                    }}
                >
                    {t('pages.favourite.title')}
                </div>
                <CustomButton onClick={handleAddPersonalOpen}>{t('pages.favourite.add')}</CustomButton>
            </h1>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <div
                        style={{
                            marginLeft: '50px',
                            marginRight: '50px',
                        }}
                    >
                        {items.map((id) => {
                            return <SortableFavourite key={id} id={id} onDelete={handleDelete} />;
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Favourite;
