import { NowRequest, NowResponse } from '@now/node';

export type UuidGenerator = (req: NowRequest) => string;

const AcceptContentType = {
  JSON: ['application/json'],
  HTML: ['text/html'],
  XML: ['text/xml', 'application/xml'],
  PLAIN: ['text/plain']
};

const hasAcceptHeaderFactory = (req: NowRequest) => (values: string[]) => {
  if (!req.headers.accept) return false;
  return values.findIndex((value) => (req.headers.accept as string).includes(value)) >= 0;
}

export const buildResponse = (uuid: UuidGenerator) => (req: NowRequest, res: NowResponse) => {
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

  const uuids = new Array(count).fill(0).map(() => uuid(req));

  const hasAcceptHeader = hasAcceptHeaderFactory(req);

  if (hasAcceptHeader(AcceptContentType.JSON)) {
    res.setHeader('content-type', AcceptContentType.JSON);
    res.send(uuids);
  } else if (hasAcceptHeader(AcceptContentType.HTML)) {
    res.setHeader('content-type', AcceptContentType.HTML);
    res.send(uuids.map((uuid) => `<p>${uuid}</p>`).join('\n'));
  } else if (hasAcceptHeader(AcceptContentType.XML)) {
    res.setHeader('content-type', AcceptContentType.XML);
    res.send(uuids.map((uuid) => `<uuid>${uuid}</uuid>`).join('\n'));
  } else {
    res.setHeader('content-type', AcceptContentType.PLAIN);
    res.send(uuids.join('\n'));
  }
}
