import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';

const ToClipboard: FunctionalComponent = (props: any) => {
  const copyToClipboard = () => {
    var textField = document.createElement('textarea')
    textField.innerText = props.data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const classCSS = props.class || '';
  const styleCSS = props.style || '';

  return html`
    <a onClick=${copyToClipboard}
      class=${classCSS}
      style=${styleCSS}>
      copy
    </a>
  `
}

export default ToClipboard;