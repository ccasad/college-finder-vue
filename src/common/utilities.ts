const _addTargetToLinks = (html:string, target = "_blank") => {
  const domParser = new DOMParser();
  const document = domParser.parseFromString(html, "text/html");
  const serializer = new XMLSerializer();

  // Handles external links
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    if (link.href) {
      link.target = target;
      link.rel = "noopener noreferrer";
    }
  });

  return serializer.serializeToString(document);
};

const _removeHtmlTags = (html:string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, " ");
};

const _parseStringToObject = (thing:any, fieldName:string) => {
  if (
    thing &&
    fieldName &&
    thing[fieldName] &&
    typeof thing[fieldName] === "string"
  ) {
    thing[fieldName] = JSON.parse(thing[fieldName]);
  }
  return thing;
};

const _readMoreify = (content:string, link:string, el:any, opts:any) => {
  if (content && el) {
    let prefix = " ...";
    if (opts && opts.prefix) {
      prefix = opts.prefix;
    }
    let linkText = "Read more";
    if (opts && opts.linkText) {
      linkText = opts.linkText;
    }

    const ending =
      prefix +
      "<a href='" +
      link +
      "' target='_blank' rel='noopener'>" +
      linkText +
      "</a>";

    const wordArray = content.split(" ");
    el.innerHTML = wordArray.join(" ") + ending;
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(" ") + ending;
    }
  }
};

const _getArrayValueAverage = (arr:any) => {
  return arr.reduce((a:number, b:number) => a + b) / arr.length;
};

const _getUrlDomain = (url:string) => {
  // let extracted = tldExtract(url);
  // if (extracted.domain) {
  //   return extracted.domain;
  // } else {
  //   return url;
  // }
};

const _isEmptyOrSpaces = (str:string) => {
  return str === null || str === undefined || str.match(/^ *$/) !== null;
};

const _upperCaseFirstLetter = (str:string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const _formatBigNumber = (val:number) => {
  if (val > -1) {
    const MILLION = 1000000;
    const THOUSAND = 1000;
    let formatted;
    if (val > MILLION) {
      formatted = parseFloat((val / MILLION).toFixed(1)) + "M";
    } else if (val > THOUSAND) {
      formatted = parseFloat((val / THOUSAND).toFixed(1)) + "K";
    } else {
      formatted = val;
    }
    return formatted;
  }
  return null;
};

export { _addTargetToLinks as addTargetToLinks };
export { _removeHtmlTags as removeHtmlTags };
export { _parseStringToObject as parseStringToObject };
export { _readMoreify as readMoreify };
export { _getArrayValueAverage as getArrayValueAverage };
export { _getUrlDomain as getUrlDomain };
export { _isEmptyOrSpaces as isEmptyOrSpaces };
export { _upperCaseFirstLetter as upperCaseFirstLetter };
export { _formatBigNumber as formatBigNumber };
