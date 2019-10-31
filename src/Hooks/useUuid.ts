import { useState } from 'react';
import v4 from 'uuid/v4';

export type UuidGeneratorFunction = () => string;

export function useUuid(generator: UuidGeneratorFunction = v4): [string, () => void] {
  let [uuid, setUuid] = useState(generator());

  const refreshUuid = () => {
    setUuid(generator());
  };

  return [uuid, refreshUuid];
}
