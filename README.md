# ember-spin-button2

Creates a button with a nice spinner.

Initial code comes from [ember-spin-button](https://github.com/ivanvanderbyl/ember-spin-button).

(Optional) Design based upon [Ladda](http://lab.hakim.se/ladda/), but implemented entirely as an Ember Component.

<a href="https://kashiif.github.io/ember-spin-button2/demo/" target="_blank">Demo</a>

# Changes from ember-spin-button

1. No bower dependency.
1. No forced default button style makes it easy to use with other framework e.g. bootstrap.
2. Setting spin-button enabled/disabled is supported and does not come in the way of spinner functionality. 
3. Title of spin-utton can be set.

## Installation

```bash
ember install ember-spin-button2
```

Add the stylesheet include if it wasn't added automatically during installation:

```css
// app/styles/app.scss
@import "spin-button";
```

## Usage

```handlebars
{{#spin-button 
	  class="btn btn-default"
    action=(action "createUser")
    buttonStyle="expand-right"}}
        Create User
{{/spin-button}}
```

When the button is clicked, it will automatically disable itself and then calls the `action`.

### Promise based approach (Preferred):

**Requires Ember 1.13**

In Ember 1.13+, closure action handlers can have return values. If you return a promise in your action handler, `ember-spin-button` will automatically use the state of the promise to indicate progress.

```js
// some-controller.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveRecord: function() {
      // Save returns a Promise from Ember Data which resolves when the model is saved.
      return this.get('model').save();
    },
  }
});
```

```handlebars
<!-- my-template.hbs -->
{{#spin-button action=(action "saveRecord")}}Save Changes{{/spin-button}}
```

Note that if the button lies in a component, the action must be passed as closure action down the route/component hierarchy (and not using `sendAction`).

### Non-Promise based approach:

You can manually bind something to indicate the busy state to `inFlight` attribute.


## Configuration

### `startDelay`

A delay before showing the animation, but after disabling the button.

**Default**: `150ms`. _Any value <4ms will disable this feature._

### `inFlight` (deprecated)

Binds the busy state of the button.

**Default**: `false`.

### `defaultTimeout`

A timeout after which the button will return to its default, non-in-flight state. Set to a falsy value to disable.

**Default**: `2E3`. _Any falsy value will disable this feature._

### `color`

You can specify one of the predefined colors, or define your own using the `buttonColor` mixin:

```
@include buttonColor( 'red', #FF0000 );
```

Predefined colors:

- `green`
- `purple`
- `mint`
- `red`
- `blue`

### `buttonStyle`

- `expand-right`
- `expand-left`
- `expand-down`
- `expand-up`
- `contract`
- `contract-overlay`
- `zoom-in`
- `zoom-out`
- `slide-left`
- `slide-right`
- `slide-up`
- `slide-down`

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
