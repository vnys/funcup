'use strict';

import config from './config.js';
import getJSON from '../lib/get.js';
import unmerge from '../lib/unmerge.js';
import removeEmptyRows from '../lib/removeEmptyRows.js';
import extractColumns from '../lib/extractColumns.js';



export default function() {

    return getJSON(config.getSheetUrl(config.sheets.gruppespill))
        .then(extractColumns)
        .then(removeEmptyRows)
        .then(unmerge)
        .then( rows => {

            let matches = {
                a: [],
                b: [],
                c: [],
                d: []
            };

            let results = {
                a: [],
                b: [],
                c: [],
                d: []
            };

            rows.forEach( (row, i) => {

                let match = {
                    hjemmelag: row.hjemmelag,
                    bortelag: row.bortelag,
                    stilling: [ row.hmal, row.bmal ].join(' – ')
                };

                matches[row.gruppe.toLowerCase()].push(match);

                let result = {
                    lag: row.lag,
                    v: row.v,
                    u: row.u,
                    t: row.t,
                    goals: row.mal,
                    diff: row.diff,
                    poeng: row.poeng
                };

                results[row.gruppe.toLowerCase()].push(result);

            });

            // remove two last rows in results
            Object.keys(results).forEach( group => {
                results[group].splice(4, 2);
            });

            return {
                matches: matches,
                results: results
            };

        });

};
