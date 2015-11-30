import { log, err } from '../lib/bondage.js';
import * as config from './config.js';
import status from './status.js';
import lagnavn from './lagnavn.js';
import gruppespill from './gruppespill.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AFKFunCup extends _HTMLElement {

    createdCallback() {
        this.setAttribute('element-created', '');
        log('element created');

        config.register(this.getAttribute('sheet-id'))
            .then(gruppespill)
            .then( data => {

                document.body.appendChild(data.matches.a);
                document.body.appendChild(data.results.a);

                document.body.appendChild(data.matches.b);
                document.body.appendChild(data.results.b);

                document.body.appendChild(data.matches.c);
                document.body.appendChild(data.results.c);

                document.body.appendChild(data.matches.d);
                document.body.appendChild(data.results.d);

                console.log(data);
            });
            // .then(log);

    }

    attachedCallback() {
        this.setAttribute('element-attached', '');
        log('element attached');
    }

    detachedCallback() { }

    attributeChangedCallback() { }

}

document.registerElement('afk-funcup', AFKFunCup);
