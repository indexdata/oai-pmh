import ky from 'ky';
import { parseStringPromise } from 'xml2js';

async function convertToJson(xml) {
  const obj = await parseStringPromise(xml);
  const res = obj['OAI-PMH'];
  if (res === undefined) {
    throw new Error('not an OAI-PMH response');
  } else if (res.error) {
    throw new Error(`OAI-PMH error: ${JSON.stringify(res.error)}`);
  }
  return res;
}

export default class OaiPmh {
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
  }

  async identify() {
    const xml = await ky.get(`${this.baseUrl}?verb=Identify`).text();
    const json = await convertToJson(xml);
    return json;
  }

  async listSets() {
    // XXX we do not support the optional `resumptionToken` argument
    const xml = await ky.get(`${this.baseUrl}?verb=ListSets`).text();
    const json = await convertToJson(xml);
    return json;
  }

  async listMetadataFormats() {
    // XXX we do not support the optional `identifier` argument
    const xml = await ky.get(`${this.baseUrl}?verb=ListMetadataFormats`).text();
    const json = await convertToJson(xml);
    return json;
  }
}
