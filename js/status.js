'use strict';

import config from './config.js';
import getJSON from '../lib/get.js';

export default function() {

    return getJSON(config.getSheetUrl(config.sheets.status));

};
