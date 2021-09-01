import axios from 'axios';
import ResourceFactory from '@/contracts/ResourceFactory';
import Builder from '@/Builder';

declare module 'axios' {
	export interface AxiosStatic {
		as<ResultType>(classToBuild: ResourceFactory<ResultType>): ResultType;
	}
}

(axios as any).as = function<ResultType> (classToBuild: ResourceFactory<ResultType>): ResultType {
	return new Builder(classToBuild).fromJSON({});
}