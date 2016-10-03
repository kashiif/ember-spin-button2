import Ember from 'ember';
import layout from '../templates/components/spin-button';
import createSpinner from 'ember-spin-button2/utils/spinner';

const { observer } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  type: 'submit',

  /**
   * allow consumers to set disabled property. Consumer can set this property to a computed one.
   */
  disabled: false,

  inFlight: false,

  buttonStyle: 'expand-right',

  defaultTimeout: 1,

  startDelay: 100,

  spinnerClass: '',

  attributeBindings: [
    /**
     * bind rendered element's 'disabled' attribute to components's computed property
     */
    '_disabledComputed:disabled',
    '_titleComputed:title',
    'type',
    '_dataColorComputed:data-color', /* This attribute is used only in css to apply one of the default color themes */
    'buttonStyle:data-style',
  ],
  classNameBindings: ['inFlight:in-flight:ready', ':spin-button'],

  _timer: null,

  click: function (event) {
    event.preventDefault();
    this.set('inFlight', true);

    if (this.attrs && 'function' === typeof this.attrs.action) {
      let actionResult = this.attrs.action();

      if (Ember.isPresent(actionResult) &&
          ('function' === typeof actionResult.finally)) {
        actionResult.finally(() => { this.set('inFlight', false); });
      }
    }
    else {
      this.sendAction('action');
    }
  },

  _inFlightDidChange: observer('inFlight', function () {
    var element = this.get('element');

    if (!element) {
      return;
    }

    var inFlight = this.get('inFlight');

    if (inFlight) {
      if (this.get('startDelay') > 4) {
        Ember.run.later(this, this._createSpinner, element, this.get('startDelay'));
      }
      else {
        this._createSpinner(element);
      }
    }
    else {
      this.setEnabled();
    }
  }),

  _cancelTimer(){
    if (this._timer) {
      Ember.run.cancel(this._timer);
    }
  },

  _createSpinner(element) {
    if (!this._spinner) {
      this._spinner = createSpinner(element, {
        spinnerClass: this.get('spinnerClass')
      });
      this._spinner.spin(element.querySelector('.spin-button-spinner'));
    }

    this._cancelTimer();

    var timeout = this.get('defaultTimeout');
    if (timeout > 4) {
      this._timer = Ember.run.later(this, this.setEnabled, timeout);
    }
  },

  _disabledComputed: Ember.computed('disabled', 'inFlight', {
    get() {
      return this.get('inFlight') || this.get('disabled');
    },
    set( /* key */ /*, value */ ) {
      Ember.logger.error('[spin-button]: _disabledComputed property is readonly. Use `disabled` proeprty.');
    },
  }),

  _titleComputed: Ember.computed('title', 'inFlight', {
    get() {
      let t;

      if (this.get('inFlight')) {
        t = this.get('titleWhenBusy');
      }
      else {
        t = this.get('title');
      }

      if (!t) { // null or undefined
        t = '';
      }

      return t;
    },
    set( /* key */ /*, value */ ) {
      Ember.logger.error('[spin-button]: _titleComputed property is readonly. Use `title` or `titleWhenBusy`' +
        ' property.');
    },
  }),

  _dataColorComputed: Ember.computed('data-color', function(){
    return this.get('data-color') || undefined;
  }),

  setEnabled() {
    this._cancelTimer();

    if (this._spinner) {
      this._spinner.stop();
      this._spinner = null;
    }

    if (!this.get('isDestroyed')) {
      this.setProperties({
        inFlight: false,
      });
    }
  },
});
