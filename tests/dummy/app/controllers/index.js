import Ember from 'ember';
const { String: { w } } = Ember;

function getAttributesForGeneratedCode() {
  let selectedColor = this.get('selectedColorForSpinButton'),
    buttonStyle = this.get('selectedAnimation'),
    cssClass = this.get('classNamesForSpinButton');

  if (selectedColor) {
    selectedColor = `  data-color="${selectedColor}"`;
  }

  if (cssClass) {
    cssClass = `  class="${cssClass}"`;
  }

  if (buttonStyle) {
    buttonStyle = `  buttonStyle="${buttonStyle}"`;
  }

  return [
    '  action=(action "myCustomAction")',
    selectedColor,
    cssClass,
    buttonStyle
  ];
}

export default Ember.Controller.extend({
  booleanControllerVarForSpinner: false,

  buttonStyles: w('expand-left expand-right expand-up expand-down contract contract-overlay zoom-in zoom-out slide-left slide-right slide-up slide-down'),
  buttonColors: w('green red blue mint purple'),

  buttonClassNames: 'btn btn-primary',
  buttonLabel: 'Submit',
  colorPreference: 'css-class',
  selectedAnimation: 'expand-left',
  selectedColor: 'green',

  templateCodeNonPromise: Ember.computed('selectedColorForSpinButton', 'selectedAnimation', 'timeout', 'inFlight', 'classNames', 'buttonLabel',
    function(){

      let timeout = this.get('timeout'),
          buttonLabel= this.get('buttonLabel'),
          attributes = getAttributesForGeneratedCode.call(this);


      let lines = ['{{#spin-button',
        '  inFlight=booleanControllerVarForSpinner',
        `  defaultTimeout=${timeout}`]
        .concat(attributes)
        .concat([
          '}}',
          `  ${buttonLabel}`,
          '{{/spin-button}}'
        ]);

      return lines.filter((item) => item).join('\n');

  }),

  templateCodeWithPromise: Ember.computed('selectedColorForSpinButton', 'selectedAnimation', 'timeout', 'inFlight', 'classNames', 'buttonLabel',
    function(){

      let buttonLabel= this.get('buttonLabel'),
          attributes = getAttributesForGeneratedCode.call(this);

      let lines = ['{{#spin-button']
          .concat(attributes)
          .concat([
            '}}',
            `  ${buttonLabel}`,
            '{{/spin-button}}'
          ]);

      return lines.filter((item) => item).join('\n');

  }),

  timeout: 2E3,

  isTimeoutEnabled: Ember.computed('timeout', function(){
    let t = this.get('timeout') | 0;
    return t > 4;
  }),

  selectedColorForSpinButton: Ember.computed('selectedColor', 'colorPreference', function(){
    let pref = this.get('colorPreference');

    if (pref === 'built-in') {
      return this.get('selectedColor');
    }

    return '';
  }),

  classNamesForSpinButton: Ember.computed('buttonClassNames', 'colorPreference', function(){
    let pref = this.get('colorPreference');

    if (pref === 'css-class') {
      return this.get('buttonClassNames');
    }

    return '';
  }),

  actions: {
    createWithPromise: function () {
      return new Ember.RSVP.Promise((resolve) => {
        setTimeout(resolve, this.get('timeout'));
      });
    },

    createWithoutPromise() {
    },
  },
});
