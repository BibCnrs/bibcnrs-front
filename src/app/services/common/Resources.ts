import { createQuery, environment } from '../Environment';
import { ResourcesDataType } from '../../shared/types/data.types';

export const resources = async (): Promise<ResourcesDataType> => {
    const response: Response = await fetch(createQuery(environment.get.resources));
    return await response.json();
};
