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

  let classCSS = props.class || '';

  return html`
    <a onClick=${copyToClipboard}
      class=${classCSS}>
      copy
    </a>
  `
}

export default ToClipboard;