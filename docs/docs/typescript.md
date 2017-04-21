This library is written with full support for Typescript.

The response types are taken from [https://api.imgur.com/models](). However, they don't all appear to follow the specified documentation so there may be some irregularities.

Full disclaimer: this is my first published Typescript project so it might be a little rough around the edges.

The main '@rmp135/imgur' contains a `ClientConfig` interface for constructing the main client configuration, an `Options` module for the API options parameters and `ReportReasonEnum` for reporting. Import these if you require them.