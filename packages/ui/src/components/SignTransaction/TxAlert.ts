import { html } from 'htm/preact';
import { FunctionalComponent, VNode } from "preact";
import logging from "@algosigner/common/logging";


const TxAlert: FunctionalComponent = (props: any) => {
  const { vo } = props;

  // Using this structure so that any additional modifications for displaying
  // warning and dangerous alerts separately can be handled more easily
  var dangerList:Array<VNode<{}>> = []
  var warningList:Array<VNode<{}>> = []
  if(vo){
    Object.keys(vo).forEach(key => 
    {
      if(vo[key]['status'] === 3) {
        dangerList.push(html`<b>${key}:</b> ${vo[key]['info']}\n`)
      } 
      else if(vo[key]['status'] === 2){
        warningList.push(html`<b>${key}:</b> ${vo[key]['info']}\n`)
      }
    });
  }
  return html`
    <div>
      ${(dangerList.length > 0) && html`
        <div id="danger-tx-list">
          <div style="font-weight: bold; color: rgb(100,0,0);">Dangerous Fields Detected:</div>
          <p>${dangerList}</p>
        </div>`
      }
      ${(warningList.length > 0) && html`
        <div id="warning-tx-list">
          <div style="font-weight: bold; color: rgb(75,75,0);">Risky Fields Detected:</div>
          <p>${warningList}</p>
        </div>
      `}
    </div>`;
}

export default TxAlert