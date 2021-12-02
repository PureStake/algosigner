import { html } from 'htm/preact';
import { FunctionalComponent, VNode } from 'preact';

const TxAlert: FunctionalComponent = (props: any) => {
  const { vo } = props;

  // Using this structure so that any additional modifications for displaying
  // warning and dangerous alerts separately can be handled more easily
  const dangerList: Array<VNode<{}>> = [];
  const warningList: Array<VNode<{}>> = [];
  if (vo) {
    Object.keys(vo).forEach((key) => {
      if (vo[key]['status'] === 3) {
        dangerList.push(html`<b>${key}:</b> ${vo[key]['info']} `);
      } else if (vo[key]['status'] === 2) {
        warningList.push(html`<b>${key}:</b> ${vo[key]['info']} `);
      }
    });
  }
  if (dangerList.length || warningList.length) {
    return html`<section id="txAlerts" class="section py-0">
      ${dangerList.length > 0 &&
      html` <div id="danger-tx-list" class="p-2 my-2">
        <div style="font-weight: bold; color: rgb(100,0,0);">Dangerous Fields Detected:</div>
        <p>${dangerList}</p>
      </div>`}
      ${warningList.length > 0 &&
      html`
        <div id="warning-tx-list" class="p-2 my-2">
          <div style="font-weight: bold; color: rgb(75,75,0);">Risky Fields Detected:</div>
          <p>${warningList}</p>
        </div>
      `}
    </section>`;
  } else {
    return null;
  }
};

export default TxAlert;
