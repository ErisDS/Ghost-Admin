import Controller from '@ember/controller';
import {alias} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
    config: service(),

    previewValue: 1,

    guid: alias('model'),

    siteUrl: computed('config.blogUrl', 'previewValue', function () {
        let url = this.get('config.blogUrl');
        let withSlash = url.slice(-1) !== '/' ? `${url}/` : url;
        return `${withSlash}?p=${this.previewValue}`;
    }),

    actions: {
        changeSomething() {
            let newValue = Math.floor(Math.random() * 10 + 1);
            this.set('previewValue', newValue);
        }
    }
});
