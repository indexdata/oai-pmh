# @indexdata/oai-pmh

Copyright (C) 2022 Index Data Aps.

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Overview

This is a very simple
[OAI-PMH](https://www.openarchives.org/OAI/openarchivesprotocol.html)
client library, written because all the various existing libraries known to Node are abadonware or undocumented.

It exists primarily for the use of
[`ui-harvester-admin`](https://github.com/indexdata/ui-harvester-admin)
but should be of wider utility.

## Note on dependencies

The package file includes a dependency on `timers` even though we don't use that package directly. This is because the `xml2js` library needs it but doesn't have a dependency, probaby because it's relying on the behavior of Babel before v5.x which used to polyfill various node.js core modules.

## Of CORS security is an issue

Understandably, when a browser loads the FOLIO SPA from one origin, it's unhappy about letting that SPA make OIA-PHM requests (or any HTTP requests) to other origins. We will need to figure out a way to address this in production, but for development is suffices to use the
[`local-cors-anywhere`](https://github.com/dkaoster/local-cors-anywhere)
web proxy. Install globally with
`yarn global add local-cors-anywhere`
and run as
`env PORT=8081 ~/.yarn/bin/local-cors-anywhere`.
Then prefix OAI-PMH service URLs with
`http://localhost:8081/`,
so that the SPA accesses services at URLs like
http://localhost:8081/https://ora.ox.ac.uk/oai2

