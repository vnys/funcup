'use strict';

export default function(arr) {
    return arr.filter( row => {
        if (row.gruppe !== 'xxx') {
            return row;
        }
    })
};
