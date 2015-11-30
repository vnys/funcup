'use strict';

import config from './config.js';
import getJSON from '../lib/get.js';
import unmerge from '../lib/unmerge.js';
import removeEmptyRows from '../lib/removeEmptyRows.js';
import extractColumns from '../lib/extractColumns.js';
import jsonml from '../lib/jsonml.js';

let template = {
    a: [],
    b: [],
    c: [],
    d: []
};

export default function() {

    return getJSON(config.getSheetUrl(config.sheets.gruppespill))
        .then(extractColumns)
        .then(removeEmptyRows)
        .then(unmerge)
        .then( rows => {

            let matches = JSON.parse(JSON.stringify(template));
            let results = JSON.parse(JSON.stringify(template));

            console.log(matches);

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
                    mal: row.mal,
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

        })
        .then( data => {

            // matches
            Object.keys(data.matches).forEach( group => {
                let table = [ 'table', { 'data-gruppe': group }];
                let caption = [ 'caption', 'Kamper gruppe ' + group ];
                let thead = [ 'thead',
                                [ 'tr',
                                    [ 'th', 'Hjemmelag' ],
                                    [ 'th', 'Stilling' ],
                                    [ 'th', 'Bortelag' ],
                                ]
                            ];
                let tbody = [ 'tbody' ];

                let matches = data.matches[group].map( match => {
                    return [ 'tr', [ 'td', match.hjemmelag ], [ 'td', match.stilling ], [ 'td', match.bortelag ] ];
                });

                tbody.push(matches);
                table.push(caption);
                table.push(thead);
                table.push(tbody);

                data.matches[group] = jsonml(table).children[0];

            });

            // results
            Object.keys(data.matches).forEach( group => {
                let table = [ 'table', { 'data-gruppe': group }];
                let caption = [ 'caption', 'Resultat gruppe ' + group ];
                let thead = [ 'thead',
                                [ 'tr',
                                    [ 'th', 'Lag' ],
                                    [ 'th', 'V' ],
                                    [ 'th', 'U' ],
                                    [ 'th', 'T' ],
                                    [ 'th', 'Mål' ],
                                    [ 'th', 'Diff' ],
                                    [ 'th', 'Poeng' ]
                                ]
                            ];
                let tbody = [ 'tbody' ];

                let results = data.results[group].map( match => {
                    return [ 'tr',
                                [ 'td', match.lag ],
                                [ 'td', match.v ],
                                [ 'td', match.u ],
                                [ 'td', match.t ],
                                [ 'td', match.mal ],
                                [ 'td', match.diff ],
                                [ 'td', match.poeng ]
                            ]
                });

                tbody.push(results);
                table.push(caption);
                table.push(thead);
                table.push(tbody);

                data.results[group] = jsonml(table).children[0];

            });

            return data;
        });

};
