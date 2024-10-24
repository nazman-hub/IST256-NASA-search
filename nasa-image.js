import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.photographer = '';
    this.description = '';
  }

  firstUpdated(){
    if(this.photographer === ''){
      this.photographer = 'N/A';
    }
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        photographer: { type: String },
        description: { type: String }
    };
  }

  static get styles() {
    return [css`
    

    :host {
      display:block;
      max-width: 240px;
      padding: --ddd-spacing-5;
      

    }
    .image{
      display: flex;
      flex-direction: column;
      /* padding: 20px; */
    }
    .image div {
    /* max-width: 240px; */
    font-size: 16px;
    font-weight: bold;
    }

    .image img {
    display: block;
    width: 240px;
    height: 240px;
    }

    



    `];
  }

 

  render() {
    return html`
    <div class="image">
      <a href="${this.source}" target="_blank" rel="noopener noreferrer">
        <img src="${this.source}" alt="${this.description}"/>
      </a>
      <div>${this.title}</div>
      <div>Photo Credit: ${this.photographer}</div>

    </div>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);