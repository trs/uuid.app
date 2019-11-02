import uuid from 'uuid/v5';
import {resolveArray, buildResponse, UuidGenerator} from './helpers';

const resolveNamespace = (value: string) => {
  try {
    new URL(value);
    return uuid.URL;
  } catch {
    return uuid.DNS;
  }
}

const generator: UuidGenerator = (req) => {
  const value = resolveArray(req.query.value);
  let namespace = resolveArray(req.query.namespace);

  if (!namespace) {
    namespace = resolveNamespace(value);
  }

  return uuid(value, namespace);
}

export default buildResponse(generator);
