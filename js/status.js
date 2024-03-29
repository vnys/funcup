'use strict';

import config from './config.js';
import getJSON from '../lib/get.js';
import extractColumns from '../lib/extractColumns.js';

let regex = /[\w]+$/;

export default function() {

    return getJSON(config.getSheetUrl(config.sheets.status))
        .then(extractColumns);

};
