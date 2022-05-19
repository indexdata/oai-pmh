// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
// eslint-disable-next-line import/extensions
import OaiPmh from './index.js';

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;

async function listPrefixes(url) {
  const oaiPmh = new OaiPmh(url);
  const formats = await oaiPmh.listMetadataFormats();
  return formats;
}

listPrefixes('https://ora.ox.ac.uk/oai2').then((formats) => {
  formats.ListMetadataFormats[0].metadataFormat.forEach((x) => {
    // eslint-disable-next-line no-console
    console.log(`prefix '${x.metadataPrefix} -> ${x.metadataNamespace}`);
  });
});
