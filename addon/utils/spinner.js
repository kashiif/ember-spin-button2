import Spinner from 'spinner';

export default function createSpinner(button, props) {
  props = props || {};

  let { height, spinnerColor} = props;

  // Prefer an explicit height if one is defined
  if (height) {
    height = props.height | 0;
  }
  else {
    height = button.offsetHeight;

    if (height === 0) {
      // We may have an element that is not visible so
      // we attempt to get the height in a different way
      height = parseFloat(window.getComputedStyle(button).height);
    }

    // If the button is tall we can afford some padding
    if (height > 32) {
      height *= 0.8;
    }
  }

  let lines = 12;
  let radius = height * 0.2;
  let length = radius * 0.6;
  let width = radius < 7 ? 2 : 3;

  return new Spinner({
    color: spinnerColor || '#fff',
    lines: lines,
    radius: radius,
    length: length,
    width: width,
    zIndex: 'auto',
    top: 'auto',
    left: 'auto',
    className: props.className,
  });

}
