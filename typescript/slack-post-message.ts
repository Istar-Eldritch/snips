/**
 *  Sends a message using the slack HTTP API
 *  Configure config to have a slack_token and slack_base_uri
 */

import * as fetch from 'node-fetch';
import {get} from 'config';

const baseUri = get<string>('slack_base_uri');
const token = get<string>('slack_token');

const defaultOptions = {
  headers: ['accept: application/json']
}

interface MessageParams {
  channel: string;
  text: string;
  parse?: string;
  link_names?: number;
  attachments?: {[id: string]: string}[];
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string;
  as_user?: boolean;
  icon_url?: string;
  icon_emoji?: string;
}

function paramsToQuery(params: MessageParams) {
  return Object.keys(params).map(k => {
    if (typeof params[k] === 'object') {
      return `${k}=${JSON.stringify(params[k])}`
    }
    else {
      return `${k}=${params[k]}`
    }
  }).join('&');
}

export async function postMessage(params: MessageParams) {
  let query = paramsToQuery(params);
  let sentResult = await fetch(`${baseUri}/chat.postMessage?as_user=true&token=${token}&${query}`);
  if (sentResult.ok) {
    return await sentResult.json();
  }
  else {
    throw {name: 'MessageError', message: await sentResult.json()};
  }
}

export default postMessage;
