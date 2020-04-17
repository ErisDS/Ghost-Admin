import Controller from '@ember/controller';
import {alias} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
    config: service(),

    oneColumn: false,
    color: null,

    guid: alias('model'),

    previewValue: computed('oneColumn', 'color', function () {
        let string = '';

        if (this.oneColumn) {
            string += 'l:1-';
        }

        if (this.color) {
            string += `c:${this.color}-`;
        }

        return string.replace(/-$/, '');
    }),

    siteUrl: computed('config.blogUrl', 'previewValue', function () {
        let url = this.get('config.blogUrl');
        let withSlash = url.slice(-1) !== '/' ? `${url}/` : url;
        return `${withSlash}?p=${this.previewValue}`;
    }),

    actions: {
        toggleLayout() {
            this.set('oneColumn', !this.oneColumn);
        }
    }
});
