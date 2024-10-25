import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class NasaImage extends DDDSuper(I18NMixin(LitElement)){
  

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.photographer = '';
    this.description = '';
    this.owner = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        photographer: { type: String },
        description: { type: String },
        owner: { type: String},
    };
  }

  static get styles() {
    return [super.styles,css`
    

    :host {
      display:block;
      /* max-width: 240px;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px); */
    }

    .image{
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-3, 20px);;
      max-width: 240px;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px);
      font-family: var(--ddd-font-primary, roboto);
      font-weight: var(--ddd-font-weight-bold, bold);
      font-size:16px;
      color: var(--ddd-theme-primary);
      background-color: var(--ddd-theme-accent);
      /* padding: 20px; */
    }


    .image:focus-within,
    .image:hover{
      background-color: var(--ddd-theme-default-creekLight,lightcyan);  
      color: black;
    }
    .image div {
    /* max-width: 240px; */
    /* font: inherit; */
    }
    .credit{
      font-style : italic;
      font-size: 14px;
      font-weight: 400;
    }

    .image img {
    display: block;
    width: 240px;
    height: 240px;
    }
    a div{
      text-decoration: none;
      color:  var(--ddd-theme-primary); 
    }
    `];
  }

 

  render() {
    return html`
    <div class="image">

      <a href="${this.source}" target="_blank" rel="noopener noreferrer">
        <img src="${this.source}" alt="${this.description}"/>
      </a>
      <div class="text">
        <div class="description">${this.title}</div>
        <!-- hide owner div if owner/photographer === 'N/A' -->
        <div class="credit" ?hidden="${this.owner === 'N/A'}">Owner: ${this.owner}</div>
        <div class="credit" ?hidden="${this.photographer === 'N/A'}">Photographer: ${this.photographer}</div>
      </div>        
    </div>

    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);