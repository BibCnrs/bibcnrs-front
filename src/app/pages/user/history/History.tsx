import TableHistory from '../../../components/table/displayelement/TableHistory';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { history } from '../../../services/user/History';
import { translator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { HistoryDataType } from '../../../shared/types/data.types';
import type { TableArgsProps } from '../../../shared/types/props.types';

const History = () => {
    const t = translator();

    const [args, setArgs] = useState<TableArgsProps>({
        page: 1,
        perPage: 5,
    });

    const { data } = useQuery<HistoryDataType, any, HistoryDataType, any>({
        queryKey: ['history', args],
        queryFn: () => history(args.perPage, (args.page - 1) * args.perPage),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="history" t={t} />
            <h1>{t('pages.history.title')}</h1>
            <Table DisplayElement={TableHistory} results={data} args={args} setArgs={setArgs} total={args.perPage} />
        </div>
    );
};

export default History;
