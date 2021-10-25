import type { RequestHandler } from '@sveltejs/kit';

import { buildRequest, buildResponse } from '$lib/http';
import { v4 } from '$lib/uuid'

export const get: RequestHandler = (req) => {
  const {count} = buildRequest(req);

  const uuids = Array.from({length: count}).map(() => v4());

  return buildResponse(req, uuids);
};
