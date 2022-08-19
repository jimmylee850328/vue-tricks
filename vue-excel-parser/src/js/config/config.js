"use strict";
const developAjaxURL = "http://127.0.0.1:12345";
const web_url = location.href.match('http(s?)://(.*?)/')[0]
export const ajaxURL = web_url.includes('localhost') ? developAjaxURL : web_url

export const ajaxTimeout = 1000;
