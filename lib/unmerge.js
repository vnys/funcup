'use strict';

export default function(arr) {
    return arr.map( (entry, i, arr) => {

        // unmerge rows

        Object.keys(entry).forEach( key => {

            if (entry[key] === "") {
                entry[key] = arr[i-1][key];
            }

        });

        return entry;

    });
}
