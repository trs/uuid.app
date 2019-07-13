import { NowRequest, NowResponse } from '@now/node';
import uuid from 'uuid/v4';

export default function v4(req: NowRequest, res: NowResponse) {
  res.send(uuid());
}
