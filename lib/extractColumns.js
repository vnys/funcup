'use strict';

function replacer(x) {
    return {
        æ: 'a',
        ø: 'o',
        å: 'a'
    }[x];
};

export default function(data) {
    return data.feed.entry.map( entry => {

        let obj = {};

        Object.keys(entry).forEach( key => {

            if (key.indexOf('gsx$') !== -1) {
                let str = key.split('gsx$')[1].replace(/([æøå])+/g, replacer);
                obj[str] = entry[key].$t;
            }

        });

        return obj;

    });
};
