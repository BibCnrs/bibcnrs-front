import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { ResourcesDataType } from '../../shared/types/data.types';

export const resources = async (): Promise<ResourcesDataType> => {
    const response: Response = await fetch(createQuery(environment.get.resources));
    throwIfNotOk(response);
    return json<ResourcesDataType>(response);
};
