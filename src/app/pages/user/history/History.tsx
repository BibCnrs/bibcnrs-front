import './History.scss';
import CustomButton from '../../../components/element/button/CustomButton';
import TableHistory from '../../../components/element/table/TableHistory';
import PageTitle from '../../../components/internal/PageTitle';
import Table from '../../../components/page/table/Table';
import { deleteHistory, deleteHistoryEntry, history } from '../../../services/user/History';
import { disableAllSearchAlert } from '../../../services/user/SearchAlert';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import type { HistoryDataType } from '../../../shared/types/data.types';
import type { TableArgsProps } from '../../../shared/types/props.types';

export const HistoryContext = createContext<{
    handleDeleteEntry: (id: number) => void;
    requestUpdate: () => void;
}>(null as any);

const History = ({ displayOnlyAlert = false }: { displayOnlyAlert?: boolean }) => {
    const t = useTranslator();

    const [args, setArgs] = useState<TableArgsProps>({
        page: 1,
        perPage: 25,
        stateIndex: 0,
    });

    const { data } = useQuery<HistoryDataType, any, HistoryDataType, any>({
        queryKey: ['history', displayOnlyAlert, args],
        queryFn: () => history(args.perPage ?? 5, ((args.page ?? 1) - 1) * (args.perPage ?? 1), displayOnlyAlert),
    });

    const handleDelete = () => {
        if (confirm(t('pages.history.confirm.delete') as unknown as string)) {
            deleteHistory().then(() => {
                setArgs({
                    page: 1,
                    perPage: 25,
                    stateIndex: (args.stateIndex ?? 0) + 1,
                });
            });
        }
    };

    const handleDisable = () => {
        disableAllSearchAlert().then(() => {
            setArgs({
                page: 1,
                perPage: 25,
                stateIndex: (args.stateIndex ?? 0) + 1,
            });
        });
    };

    const handleDeleteEntry = (id: number) => {
        deleteHistoryEntry(id).then(() => {
            setArgs({
                ...args,
                stateIndex: (args.stateIndex ?? 0) + 1,
            });
        });
    };

    const handleUpdateRequest = () => {
        setArgs({
            ...args,
            stateIndex: (args.stateIndex ?? 0) + 1,
        });
    };

    return (
        <div id="app">
            <PageTitle page={displayOnlyAlert ? 'alert' : 'history'} />
            <h1>{t(`pages.${displayOnlyAlert ? 'alert' : 'history'}.title`)}</h1>
            <HistoryContext.Provider value={{ handleDeleteEntry, requestUpdate: handleUpdateRequest }}>
                <Table
                    DisplayElement={TableHistory}
                    results={data}
                    args={args}
                    onArgsChange={setArgs}
                    total={data && data[0] ? data[0].totalCount : 0}
                    header={
                        <div className="history-header">
                            {displayOnlyAlert ? (
                                <CustomButton onClick={handleDisable}>
                                    {t('pages.history.buttons.disable')}
                                </CustomButton>
                            ) : (
                                <CustomButton onClick={handleDelete}>{t('pages.history.buttons.delete')}</CustomButton>
                            )}
                        </div>
                    }
                />
            </HistoryContext.Provider>
        </div>
    );
};

export default History;
