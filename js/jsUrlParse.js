function getQueryString() {
          var key = false, res = {}, itm = null;
          // get the query string without the ?
          var qs = location.search.substring(1);
          // check for the key as an argument
          if (arguments.length > 0 && arguments[0].length > 1)
            key = arguments[0];
          // make a regex pattern to grab key/value
          var pattern = /([^&=]+)=([^&]*)/g;
          // loop the items in the query string, either
          // find a match to the argument, or build an object
          // with key/value pairs
          while (itm = pattern.exec(qs)) {
            if (key !== false && decodeURIComponent(itm[1]) === key)
              return decodeURIComponent(itm[2]);
            else if (key === false)
              res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
          }

          return key === false ? res : null;
}
getUrlParam(key) {
    const url = decodeURI(document.location);
    let query = {};
    const index = url.indexOf("?");
    if (index != -1) {
        const str = url.substr(index + 1);
        const pairs = str.split("&");
        for(let i = 0; i < pairs.length; i ++) {
          const pair = pairs[i].split("=");
          query[pair[0]] = pair[1];
        }
    }
    return query[key] || '';
          // ie全线不支持URL
    // const urlObj = new URL(document.location);
    // if ('searchParams' in urlObj) {
    //   let params = urlObj.searchParams;
    //   return params.get(key);
    // } else {
    //   const url = decodeURI(document.location);
    //   let query = {};
    //   const index = url.indexOf("?");
    //   if (index != -1) {
    //       const str = url.substr(index + 1);
    //       const pairs = str.split("&");
    //       for(let i = 0; i < pairs.length; i ++) {
    //         const pair = pairs[i].split("=");
    //         query[pair[0]] = pair[1];
    //       }
    //   }
    //   return query[key] || '';
    // }
  }
