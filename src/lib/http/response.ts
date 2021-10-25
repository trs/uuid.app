import type { IncomingRequest, EndpointOutput } from '@sveltejs/kit';

const AcceptContentType = {
  JSON: ['application/json'],
  HTML: ['text/html'],
  XML: ['text/xml', 'application/xml'],
  PLAIN: ['text/plain']
};

const hasAcceptHeaderFactory = (req: IncomingRequest) => (values: string[]) => {
  if (!req.headers.accept) return false;
  return values.findIndex((value) => (req.headers.accept as string).includes(value)) >= 0;
}

export const buildResponse = (req: IncomingRequest, uuids: string[]): EndpointOutput => {
  const hasAcceptHeader = hasAcceptHeaderFactory(req);

  if (hasAcceptHeader(AcceptContentType.JSON)) {
    return {
      headers: {
        'content-type': AcceptContentType.JSON
      },
      body: uuids
    };
  } else if (hasAcceptHeader(AcceptContentType.HTML)) {
    return {
      headers: {
        'content-type': AcceptContentType.HTML
      },
      body: `<html>
<head>
  <meta charset="utf-8" />
</head>
<body>${uuids.map((uuid) => `<p>${uuid}</p>`).join('\n')}</body>
</html>`
    };
  } else if (hasAcceptHeader(AcceptContentType.XML)) {
    return {
      headers: {
        'content-type': AcceptContentType.XML[0]
      },
      body: `<uuids>
${uuids.map((uuid) => `<uuid>${uuid}</uuid>`).join('\n')}
</uuids>`
    };
  } else {
    return {
      headers: {
        'content-type': AcceptContentType.PLAIN
      },
      body: uuids.join('\n')
    };
  }
}
