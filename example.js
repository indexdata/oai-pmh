import fetch from 'node-fetch';
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;

// eslint-disable-next-line import/no-extraneous-dependencies
import OaiPmh from '@indexdata/oai-pmh';

async function listPrefixes(url) {
  const oaiPmh = new OaiPmh(url);
  const formats = await oaiPmh.listMetadataFormats();
  return formats;
}

listPrefixes('https://ora.ox.ac.uk/oai2').then((formats) => {
  formats.ListMetadataFormats[0].metadataFormat.forEach((x) => {
    console.log(`prefix '${x.metadataPrefix} -> ${x.metadataNamespace}`);
  });
});
