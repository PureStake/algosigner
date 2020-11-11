import { html } from 'htm/preact';
import { FunctionalComponent, VNode } from 'preact';

const TxAlert: FunctionalComponent = (props: any) => {
  const { vo } = props;

  // Using this structure so that any additional modifications for displaying
  // warning and dangerous alerts separately can be handled more easily
  const dangerList: Array<VNode<any>> = [];
  const warningList: Array<VNode<any>> = [];
  if (vo) {
    Object.keys(vo).forEach((key) => {
      if (vo[key]['status'] === 3) {
        dangerList.push(html`<b>${key}:</b> ${vo[key]['info']} `);
      } else if (vo[key]['status'] === 2) {
        warningList.push(html`<b>${key}:</b> ${vo[key]['info']} `);
      }
    });
  }
  return html` <div>
    ${dangerList.length > 0 &&
    html` <div id="danger-tx-list">
      <div style="font-weight: bold; color: rgb(100,0,0);">
        Dangerous Fields Detected:
      </div>
      <p>${dangerList}</p>
    </div>`}
    ${warningList.length > 0 &&
    html`
      <div id="warning-tx-list">
        <div style="font-weight: bold; color: rgb(75,75,0);">
          Risky Fields Detected:
        </div>
        <p>${warningList}</p>
      </div>
    `}
  </div>`;
};

export default TxAlert;
