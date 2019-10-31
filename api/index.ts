import uuid from 'uuid/v4';
import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse) => {
  if (!req.query.count) {
    req.query.count = '1';
  }

  if (Array.isArray(req.query.count)) {
    req.query.count = req.query.count[0];
  }

  let count = parseInt(req.query.count);
  if (isNaN(count)) {
    res.status(400).send('Expected a number');
    return;
  }

  count = Math.min(count, 100);

  const uuids = new Array(count).fill(0).map(() => uuid());

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.setHeader('content-type', 'application/json');
    res.send(uuids);
  } else if (req.headers.accept && req.headers.accept.includes('text/html')) {
    res.setHeader('content-type', 'text/html');
    res.send(uuids.map((uuid) => `<p>${uuid}</p>`).join('\n'));
  } else {
    res.setHeader('content-type', 'text/plain');
    res.send(uuids.join('\n'));
  }
}
