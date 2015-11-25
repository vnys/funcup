import { log, err } from '../lib/bondage.js';
import * as config from './config.js';
import status from './status.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AFKFunCup extends _HTMLElement {

    createdCallback() {
        this.setAttribute('element-created', '');
        log('element created');

        config.register(this.getAttribute('sheet-id'))
            .then(status)
            .then(log);

    }

    attachedCallback() {
        this.setAttribute('element-attached', '');
        log('element attached');
    }

    detachedCallback() { }

    attributeChangedCallback() { }

}

document.registerElement('afk-funcup', AFKFunCup);
