import { createQuery, environment, json } from '../Environment';
import type { ResourcesDataType } from '../../shared/types/data.types';

export const resources = async (): Promise<ResourcesDataType> => {
    const response: Response = await fetch(createQuery(environment.get.resources));
    return json<ResourcesDataType>(response);
};
