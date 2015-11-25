'use strict';

import getJSON from '../lib/get.js';
import { log } from '../lib/bondage.js';

const google = "https://spreadsheets.google.com/feeds";

let key;
let config = {};

config.sheets = {};

config.getSheetUrl = function(sheetId) {
    return [ google, "list", config.sheetKey, sheetId, "public/values?alt=json" ].join('/');
};

export function register(sheetKey) {
    config.sheetKey = sheetKey;

    let sheetsUrl = [ google, "worksheets", config.sheetKey, "public/basic?alt=json" ].join('/');

    return getJSON(sheetsUrl)
        .then(data => data.feed.entry)
        .then( data => data.map( entry => {

            let sheetId = entry.link[entry.link.length - 1].href.split('/').pop();
            let sheetTitle = entry.title.$t.toLowerCase();

            config.sheets[sheetTitle.toLowerCase()] = sheetId;

        })).then( () => config);
}

export default config;
