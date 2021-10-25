import type { IncomingRequest } from "@sveltejs/kit";

export function buildRequest(req: IncomingRequest) {
  let countStr = req.query.get('count');
  if (!countStr) {
    countStr = '1';
  }

  if (Array.isArray(countStr)) {
    countStr = countStr[0];
  }

  let count = parseInt(countStr);
  if (isNaN(count)) {
    return {
      status: 400,
      body: {
        error: 'Expected a number'
      }
    }
  }

  count = Math.min(count, 100);

  return {
    count
  };
}
