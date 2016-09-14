import Ember from 'ember';
const { String: { w } } = Ember;
export default Ember.Controller.extend({
  inFlight: false,

  buttonStyles: w('expand-left expand-right expand-up expand-down contract contract-overlay zoom-in zoom-out slide-left slide-right slide-up slide-down'),
  buttonColors: w('green red blue mint purple'),
  templateCode: Ember.computed('selectedColor', 'selectedAnimation', 'timeout', 'inFlight', function(){

    return '{{#spin-button\n' + 
      (this.get('selectedColor') ? '\tdata-color=' + this.get('selectedColor') + '\n' : '') +
      //'\tinFlight=inFlight'  + '\n' +
      '\taction=(action "myCustomAction")'  + '\n' +
      '\tdefaultTimeout=' + this.get('timeout')  + '\n' +
      (this.get('selectedAnimation') ? '\tbuttonStyle="' + this.get('selectedAnimation') + '"\n' : '') +
      '}} Do Something Expensive' + '\n' +
    '{{/spin-button}}';

  }),
  timeout: 2E3,

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
