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
    const { favouriteResources, removeFavourite, moveFavourite } = useFavouriteResources();
    const [items, setItems] = useState<UniqueIdentifier[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        setItems(favouriteResources.map((value) => value.id));
    }, [favouriteResources]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            if (active.id !== over.id) {
                setItems((identifiers) => {
                    const oldIndex = identifiers.indexOf(active.id);
                    const newIndex = identifiers.indexOf(over.id);

                    moveFavourite(favouriteResources[oldIndex], oldIndex, newIndex);

                    return arrayMove(identifiers, oldIndex, newIndex);
                });
            }
        }
    };

    const handleDelete = (entry: FavouriteResourceWithId) => {
        removeFavourite(entry);
    };

    return (
        <div id="app">
            <PageTitle page="favourite" />
            <h1>{t('pages.favourite.title')}</h1>
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
