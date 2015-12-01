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

                this.appendChild(data.matches.a);
                this.appendChild(data.results.a);

                this.appendChild(data.matches.b);
                this.appendChild(data.results.b);

                this.appendChild(data.matches.c);
                this.appendChild(data.results.c);

                this.appendChild(data.matches.d);
                this.appendChild(data.results.d);

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
