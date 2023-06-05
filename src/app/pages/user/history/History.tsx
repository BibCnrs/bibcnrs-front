import './History.scss';
import CustomButton from '../../../components/custom/button/CustomButton';
import TableHistory from '../../../components/table/displayelement/TableHistory';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { deleteHistory, deleteHistoryEntry, history } from '../../../services/user/History';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import type { HistoryDataType } from '../../../shared/types/data.types';
import type { TableArgsProps } from '../../../shared/types/props.types';

export const HistoryContext = createContext<{ handleDeleteEntry: (id: number) => void }>(null as any);

const History = () => {
    const t = useTranslator();

    const [args, setArgs] = useState<TableArgsProps>({
        page: 1,
        perPage: 5,
        stateIndex: 0,
    });

    const { data } = useQuery<HistoryDataType, any, HistoryDataType, any>({
        queryKey: ['history', args],
        queryFn: () => history(args.perPage ?? 5, ((args.page ?? 1) - 1) * (args.perPage ?? 1)),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const handleDelete = () => {
        if (confirm(t('pages.history.confirm.delete') as unknown as string)) {
            deleteHistory().then(() => {
                setArgs({
                    page: 1,
                    perPage: 5,
                    stateIndex: (args.stateIndex ?? 0) + 1,
                });
            });
        }
    };

    const handleDeleteEntry = (id: number) => {
        deleteHistoryEntry(id).then(() => {
            setArgs({
                ...args,
                stateIndex: (args.stateIndex ?? 0) + 1,
            });
        });
    };

    return (
        <div id="app">
            <PageTitle page="history" />
            <h1>{t('pages.history.title')}</h1>
            <HistoryContext.Provider value={{ handleDeleteEntry }}>
                <Table
                    DisplayElement={TableHistory}
                    results={data}
                    args={args}
                    onArgsChange={setArgs}
                    total={data && data[0] ? data[0].totalCount : 0}
                    header={
                        <div className="history-header">
                            <CustomButton onClick={handleDelete}>{t('pages.history.buttons.delete')}</CustomButton>
                        </div>
                    }
                />
            </HistoryContext.Provider>
        </div>
    );
};

export default History;
