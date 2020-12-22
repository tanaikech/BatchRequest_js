# BatchRequest_js

<a name="top"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

**This is a library for running Batch Requests for Google APIs using Javascript.**

<a name="description"></a>

# Description

When users use Google's APIs, one quota is used for one API call. When the batch request is used, several APIs can be called by one quota, although there are some limitations in the batch request.

`google-api-javascript-client` can run the batch request. [Ref](https://github.com/google/google-api-javascript-client/blob/master/docs/batch.md) But, I created this for my self study. This library can achieve the batch request using `fetch` without using `google-api-javascript-client`.

<a name="install"></a>

## Install

```html
<script src="batchrequest_js.min.js"></script>
```

Or, using jsdelivr cdn

<script src="https://cdn.jsdelivr.net/gh/tanaikech/BatchRequest_js@master/batchrequest_js.min.js"></script>

# Usage

<a name="do"></a>

## Method: Do()

When this method is used, the raw values and the parsed values from the batch requests are returned. And also, the number of requests more than 100 can be used. The maximum number of requests is 100. But, the split of the number of requests is processed for the limitation of 100. This sample script renames 2 files using [update of Drive API v3](https://developers.google.com/drive/v3/reference/files/update).

```javascript
const object = {
  batchPath: "batch/drive/v3", // batch path. This will be introduced in the near future.
  accessToken: token, // Required
  requests: [
    {
      method: "PATCH",
      endpoint: "https://www.googleapis.com/drive/v3/files/###?fields=name",
      requestBody: { name: "sample1" },
      accessToken: "###", // If this key is used, this access token is used for this request.
    },
    {
      method: "PATCH",
      endpoint: "https://www.googleapis.com/drive/v3/files/###?fields=name",
      requestBody: { name: "sample2" },
    },
  ],
};
Do(object)
  .then((e) => console.log(e))
  .catch((err) => console.log(err));
```

- In the current stage, [`batchPath`](https://developers.google.com/drive/v3/web/batch#details) is required to be used. `batchPath` can be retrieved by [Discovery](https://developers.google.com/discovery/v1/reference/apis).

- If `accessToken` is used in the object of requests, the `accessToken` is used for the individual request in the batch request. If `accessToken` is not used in the requests, this library uses `object.accessToken` for the whole batch request.

- In this method, the raw values and the parsed values from the batch requests are returned as follows.

  ```json
  { "parsed": [, , ,], "raw": "###" }
  ```

* `requests`
  - [`batchPath`](https://developers.google.com/drive/v3/web/batch#details): `batchPath` can be retrieved by [Discovery](https://developers.google.com/discovery/v1/reference/apis).
  - `method`: GET, POST, PUT, PATCH, DELETE and so on. Please set this for the API you want to use.
  - `endpoint`: Endpoint of the API you want to use.
  - `requestBody`: Request body of the API you want to use. This library for Google APIs. So in this case, the request body is sent as JSON.

# Limitations for batch request

There are some limitations for the batch request.

- In the current stage, the batch request can be used for the following APIs. The number of requests which can be used in one batch request has the limitations for each API. Please check the detail information from following links.

  - Calendar API: [https://developers.google.com/calendar/batch](https://developers.google.com/calendar/batch)
  - Cloud Storage: [https://cloud.google.com/storage/docs/json_api/v1/how-tos/batch](https://cloud.google.com/storage/docs/json_api/v1/how-tos/batch)
  - Directory API: [https://developers.google.com/admin-sdk/directory/v1/guides/batch](https://developers.google.com/admin-sdk/directory/v1/guides/batch)
  - Drive API: [https://developers.google.com/drive/v3/web/batch](https://developers.google.com/drive/v3/web/batch)
  - Gmail API: [https://developers.google.com/gmail/api/guides/batch](https://developers.google.com/gmail/api/guides/batch)

- At Batch request, it can include only one kind of API in the requests. For example, Drive API and Gmail API cannot be used for one batch request. Only one API can be used. So as a sample, you can rename the filenames of several files using Drive API by one batch request.

- The batch request is worked by the asynchronous processing. So the order of request is not guaranteed.

---

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="updatehistory"></a>

# Update History

- v1.0.0 (December 22, 2020)

  1. Initial release.

[TOP](#top)
