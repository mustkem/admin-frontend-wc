import { type } from "ramda";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const colorScale = (src, r = 100, g = 100, b = 100) => {
  if (!src) {
    return false;
  }
  if (typeof window !== "undefined") {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    if (!canvas.width || !canvas.height) {
      return false;
    }
    ctx.drawImage(imgObj, 0, 0);
    let imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        let i = y * 4 * imgPixels.width + x * 4;
        let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        if (avg > 0) {
          imgPixels.data[i] = r;
          imgPixels.data[i + 1] = g;
          imgPixels.data[i + 2] = b;
        }
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    let generatedUrl = canvas.toDataURL();
    canvas = null;
    ctx = null;
    imgObj = null;
    return generatedUrl;
  }
  return src;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    if (typeof value === "string") {
      isValid = value.trim() !== "" && isValid;
    } else if (typeof value === "object") {
      isValid = Object.keys(value).length > 0 && isValid;
    }
  }

  if (rules.mobileNumber) {
    const pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (value && rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (value && rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (value && rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (value && rules.isLatitude) {
    const pattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (value && rules.isLongitude) {
    const pattern = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (value && rules.isWebsite) {
    const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    isValid = pattern.test(value) && isValid;
  }

  if (value && rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.matchDependent) {
    const targetInput = document.getElementById(rules.matchDependent);
    const synthaticEventObj = {
      target: targetInput,
    };
    Object.keys(targetInput).forEach((key) => {
      if (key.includes("reactEventHandlers")) {
        setTimeout(() => {
          if (targetInput.value !== "") {
            targetInput[key].onChange(synthaticEventObj);
          }
        }, 1);
      }
    });
  }

  if (rules.match) {
    const targetInput = document.getElementById(rules.match);
    isValid = value === targetInput.value && isValid;
  }

  return isValid;
};

export const browserClasses = (ua, extraClasses = "") => {
  const $ = {};

  if (/mobile/i.test(ua)) $.mobile = true;

  if (/like Mac OS X/.test(ua)) {
    $.ios = /CPU( iPhone)? OS ([0-9._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, ".");
    $.iphone = /iPhone/.test(ua);
    $.ipad = /iPad/.test(ua);
  }

  if (/Android/.test(ua)) $.android = /Android ([0-9.]+)[);]/.exec(ua)[1];

  if (/webOS\//.test(ua)) $.webOS = /webOS\/([0-9.]+)[);]/.exec(ua)[1];

  if (/(Intel|PPC) Mac OS X/.test(ua))
    $.mac = /(Intel|PPC) Mac OS X ?([0-9._]*)[);]/.exec(ua)[2].replace(/_/g, ".") || true;

  if (/Windows NT/.test(ua)) $.windows = /Windows NT ([0-9._]+)[);]/.exec(ua)[1];

  if (/firefox/i.test(ua)) $.firefox = true;
  else if (/chrome/i.test(ua)) $.chrome = true;
  else if (/safari/i.test(ua)) $.safari = true;
  else if (/msie/i.test(ua)) $.msie = true;
  else $.unknown = true;
  let classes = "";
  Object.keys($).map((classKey) => {
    if ($[classKey] !== false) {
      classes += classKey + " ";
    }
    return null;
  });
  const classesArray = [];
  classesArray.push(classes.trim());
  if (extraClasses) {
    classesArray.push(extraClasses);
  }
  return classesArray.join(" ");
};

export const deepCopy = (src) => JSON.parse(JSON.stringify(src));

export const deepCopyV2 = (src) => {
  // will preserv all references like functions, class
  let target = "Array" === type(src) ? [] : {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      if ("Object" === type(src[prop]) || "Array" === type(src[prop])) {
        target[prop] = deepCopyV2(src[prop]);
      } else {
        target[prop] = src[prop];
      }
    }
  }
  return target;
};

export const shortContent = (constent = "", numberOfWords = 25, dots = false) => {
  const contentArr = constent.length ? constent.split(" ") : [];
  if (contentArr.length > numberOfWords) {
    contentArr.length = numberOfWords;
  }
  let shortContent = contentArr.join(" ");
  contentArr.length = 0;
  if (dots) {
    shortContent += "...";
  }
  return shortContent;
};

export const shortContentByCharacters = (content = "", numberOfChars = 25, dots = false) => {
  const contentArr = content.length ? content.split("") : [];
  if (contentArr.length > numberOfChars) {
    contentArr.length = numberOfChars;
  }
  let shortContent = contentArr.join("");
  if (dots && contentArr.length === numberOfChars) {
    shortContent += "...";
  }
  contentArr.length = 0;
  return shortContent;
};

//shortContent(item.model.model_info, 15)
