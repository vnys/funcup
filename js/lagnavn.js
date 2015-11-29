'use strict';

import config from './config.js';
import getJSON from '../lib/get.js';
import unmerge from '../lib/unmerge.js';
import extractColumns from '../lib/extractColumns.js';

let regex = /[\w]+$/;

export default function() {

    return getJSON(config.getSheetUrl(config.sheets.lagnavn))
        .then(extractColumns)
        .then(unmerge);

};
