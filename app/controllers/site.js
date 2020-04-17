import Controller from '@ember/controller';
import {alias} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
    config: service(),
    settings: service(),

    // Settings we can change
    oneColumn: false,
    brandColor: null,
    newColor: null,

    guid: alias('model'),

    previewValue: computed('oneColumn', 'newColor', function () {
        let string = '';

        if (this.oneColumn) {
            string += 'l:1-';
        }

        if (this.newColor) {
            string += `c:${this.newColor}-`;
        }

        return encodeURIComponent(string.replace(/-$/, ''));
    }),

    siteUrl: computed('config.blogUrl', 'previewValue', function () {
        let url = this.get('config.blogUrl');
        let withSlash = url.slice(-1) !== '/' ? `${url}/` : url;
        return `${withSlash}?p=${this.previewValue}`;
    }),

    actions: {
        toggleLayout() {
            this.set('oneColumn', !this.oneColumn);
        },

        changeBrandColor() {
            let newColor = this.brandColor;
            if (newColor[0] !== '#') {
                newColor = `#${newColor}`;
            }
            if (newColor.length === 7) {
                this.set('newColor', newColor);
            }
        }
    }
});
