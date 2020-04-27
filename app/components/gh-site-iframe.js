import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
    config: service(),

    tagName: '',

    srcUrl: computed('src', function () {
        return this.src || `${this.config.get('blogUrl')}/`;
    }),
    init() {
        this._super(...arguments);

        // Listen to messages sent from the content iframe
        var receiveMessage = function receiveMessage(e){
            console.log('got a message', e);
        };
        window.addEventListener('message', receiveMessage, false);
    },

    didReceiveAttrs() {
        // reset the src attribute each time the guid changes - allows for
        // a click on the navigation item to reset back to the homepage
        if ((this.guid !== this._lastGuid) || (this.src !== this._lastSrc)) {
            let iframe = document.querySelector('#site-frame');
            if (iframe) {
                iframe.src = this.src || `${this.config.get('blogUrl')}/`;
            }
        }
        this._lastGuid = this.guid;
        this._lastSrc = this.src;
    },

    actions: {
        onLoading() {
            let iframe = document.querySelector('#site-frame');
            console.log('on loading', iframe.src);
            if (iframe && iframe.src !== this.siteUrl) {
                console.log('setting site url');
                this.set('siteUrl', iframe.src);
            }
        }
    }

});
