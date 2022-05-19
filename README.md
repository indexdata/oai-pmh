# @indexdata/oai-pmh

Copyright (C) 2022 Index Data Aps.

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.


## Overview

This is a very simple
[OAI-PMH](https://www.openarchives.org/OAI/openarchivesprotocol.html)
client library, written because
[all the various existing libraries known to Node](https://www.npmjs.com/search?q=oai-pmh)
are abadonware or undocumented.

It exists primarily for the use of
[`ui-harvester-admin`](https://github.com/indexdata/ui-harvester-admin)
but should be of wider utility.


## API

First, create an OAI-PMH client object associated with a specific service:

	import OaiPmh from '@indexdata/oai-pmh';
	const oaiPmh = new OaiPmh('https://ora.ox.ac.uk/oai2');

Now you can use it to ask the server to identify itself, supply a list of sets, etc:

	const identity = await oaiPmh.identify();
	const sets = await oaiPmh.listSets();
	const formats = await oaiPmh.listMetadataFormats();

At present, only the Identify, ListSets and ListMetadataFormat verbs are supported: we will add others as we have a need for them. The optional parameters to the second and third of these are ignored.

All methods return a promise that resolves to a JavaScript object containing the data returned from the service. So for example:

	formats.ListMetadataFormats[0].metadataFormat.map(x => {
	  console.log(`prefix '${x.metadataPrefix} -> ${}`);
	});

See the [very simple example code](example.js).


## Note on dependencies

The package file includes a dependency on `timers` even though we don't use that package directly. This is because the `xml2js` library needs it but doesn't have a dependency, probaby because it's relying on the behavior of Babel before v5.x which used to polyfill various node.js core modules.


## Of CORS security is an issue

Understandably, when a browser loads the FOLIO SPA from one origin, it's unhappy about letting that SPA make OIA-PMH requests (or any HTTP requests) to other origins. We will need to figure out a way to address this in production, but for development is suffices to use the
[`local-cors-anywhere`](https://github.com/dkaoster/local-cors-anywhere)
web proxy. Install globally with
`yarn global add local-cors-anywhere`
and run as
`env PORT=8081 ~/.yarn/bin/local-cors-anywhere`.
Then prefix OAI-PMH service URLs with
`http://localhost:8081/`,
so that the SPA accesses services at URLs like
http://localhost:8081/https://ora.ox.ac.uk/oai2


