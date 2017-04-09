This library is written with full support for Typescript.

The response types are taken from [https://api.imgur.com/models](). However, they don't all appear to follow the specified documentation so there may be some irregularities.

Full disclaimer: this is my first published Typescript project so it might be a little rough around the edges.

All request types and interfaces can be found on the global `Options` namespace. These are usually joined together to form the final option interface.

The main '@rmp135/imgur' module also contains a `ClientConfig` interface and `ReportReasonEnum` for reporting. Import these if you require them.