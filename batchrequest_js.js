/**
 * GitHub  https://github.com/tanaikech/BatchRequest_js<br>
 * Run BatchRequest_js. Requests more than 100 can be used and the result values are parsed.<br>
 * @param {Object} Object Object
 * @return {Object} Return Object
 */
function Do(object) {
    return new BatchRequest(object).Do();
}
;
(function(r) {
  var BatchRequest;
  BatchRequest = (function() {
    var createRequest, parser;

    class BatchRequest {
      constructor(p_) {
        var bP, batchPath;
        if (!p_.hasOwnProperty("requests")) {
          throw new Error("'requests' property was not found in object.");
        }
        if (!p_.hasOwnProperty("accessToken")) {
          throw new Error("Please set the access token.");
        }
        this.p = p_.requests;
        this.url = "https://www.googleapis.com/batch";
        if (p_.batchPath) {
          bP = p_.batchPath.trim();
          batchPath = "";
          if (bP.includes("batch/")) {
            batchPath = bP.replace("batch", "");
          } else {
            batchPath = bP.slice(0, 1) === "/" ? bP : "/" + bP;
          }
          this.url += batchPath;
        }
        this.at = p_.accessToken;
        this.lb = "\r\n";
        this.boundary = "xxxxxxxxxx";
      }

      Do() {
        var e, i, j, limit, ref, reqs, split;
        try {
          limit = 100;
          split = Math.ceil(this.p.length / limit);
          reqs = [];
          for (i = j = 0, ref = split; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            reqs.push({
              url: this.url,
              params: createRequest.call(this, this.p.splice(0, limit))
            });
          }
          return Promise.all(reqs.map(({url, params}, i) => {
            return new Promise((resolve, reject) => {
              return fetch(url, params).then((res) => {
                return res.text();
              }).then((res) => {
                return resolve({
                  raw: res,
                  parsed: parser.call(this, res)
                });
              }).catch((err) => {
                return reject(err);
              });
            });
          }));
        } catch (error) {
          e = error;
          throw new Error(e);
        }
      }
    };

    BatchRequest.name = "BatchRequest_js";

    parser = function(d_) {
      var regex, temp;
      temp = d_.split("--batch");
      regex = /{[\S\s]+}/g;
      return temp.slice(1, temp.length - 1).map(function(e) {
        if (regex.test(e)) {
          return JSON.parse(e.match(regex)[0]);
        }
        return e;
      });
    };

    createRequest = function(d_) {
      var contentId, data, e, params;
      try {
        contentId = 0;
        data = d_.reduce((s, e) => {
          s += "Content-Type: application/http" + this.lb;
          s += "Content-ID: " + (++contentId) + this.lb + this.lb;
          s += e.method + " " + e.endpoint + this.lb;
          s += e.accessToken ? "Authorization: Bearer " + e.accessToken + this.lb : "";
          s += e.requestBody ? "Content-Type: application/json; charset=utf-8" + this.lb + this.lb : this.lb;
          s += e.requestBody ? JSON.stringify(e.requestBody) + this.lb : "";
          s += "--" + this.boundary + this.lb;
          return s;
        }, "--" + this.boundary + this.lb);
        params = {
          method: "POST",
          body: data,
          headers: {
            Authorization: 'Bearer ' + this.at,
            "Content-Type": "multipart/mixed; boundary=" + this.boundary
          }
        };
      } catch (error) {
        e = error;
        throw new Error(e);
      }
      return params;
    };

    return BatchRequest;

  }).call(this);
  return r.BatchRequest = BatchRequest;
})(this);
