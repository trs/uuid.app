import uuid from 'uuid/v4';
import {buildResponse, UuidGenerator} from './helpers';

const generator: UuidGenerator = () => uuid();

export default buildResponse(generator);
