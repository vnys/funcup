'use strict';

import { tag, txt, log } from './bondage.js';

export default function (jsonml) {

    var fragment = document.createDocumentFragment();

    function build(parent, jsonml) {

        if (Array.isArray(jsonml)) {

            if (typeof jsonml[0] === typeof 'str') {
                var el = tag(jsonml.shift());
                parent.appendChild(el);
                parent = el;
            }

            jsonml.forEach(function(node) {
                build(parent, node);
            });

        } else if (typeof jsonml === typeof 'str') {

            parent.appendChild(txt(jsonml));

        } else {

            Object.keys(jsonml).forEach(function (prop) {
                parent.setAttribute(prop, jsonml[prop]);
            });

        }

        return fragment;

    }

    return build(fragment, jsonml);

}
