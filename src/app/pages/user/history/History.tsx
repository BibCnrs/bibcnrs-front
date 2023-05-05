import './History.scss';
import CustomButton from '../../../components/custom/button/CustomButton';
import TableHistory from '../../../components/table/displayelement/TableHistory';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { deleteHistory, history } from '../../../services/user/History';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { HistoryDataType } from '../../../shared/types/data.types';
import type { TableArgsProps } from '../../../shared/types/props.types';

const History = () => {
    const t = useTranslator();

    const [args, setArgs] = useState<TableArgsProps>({
        page: 1,
        perPage: 5,
        stateIndex: 1,
    });

    const { data } = useQuery<HistoryDataType, any, HistoryDataType, any>({
        queryKey: ['history', args],
        queryFn: () => history(args.perPage, (args.page - 1) * args.perPage),
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
                    stateIndex: args.stateIndex + 1,
                });
            });
        }
    };

    return (
        <div id="app">
            <PageTitle page="history" t={t} />
            <h1>{t('pages.history.title')}</h1>
            <Table
                DisplayElement={TableHistory}
                results={data}
                args={args}
                setArgs={setArgs}
                total={data && data[0] ? data[0].totalCount : 0}
                header={
                    <div className="history-header">
                        <CustomButton onClick={handleDelete}>{t('pages.history.buttons.delete')}</CustomButton>
                    </div>
                }
            />
        </div>
    );
};

export default History;
