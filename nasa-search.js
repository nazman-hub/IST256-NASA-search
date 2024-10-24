/**
 * Copyright 2024 nzmn-flex
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./nasa-image.js";


/**
 * `nasa-search`
 * 
 * @demo index.html
 * @element nasa-search
 */
export class nasaSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "nasa-search";
  }

  constructor() {
    super();
    this.value = "";
    this.title = '';
    this.loading = false;
    this.items = [];



    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/nasa-search.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  firstUpdated(){
    this.updateResults(this.value);

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array},
      value: { type: String },

    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        padding: 0;
        margin: 0;
      }
      * {
          margin: 0;          /* Remove default margin */
          padding: 0;         /* Remove default padding */
          /*-sizing: border-box; /* Include padding and border in element's total width and height */
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .container{
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .results{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      div{
        font: inherit;
      }
      .search{
        /* height: 30px; */
        font: inherit;
      }
      div.search{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        /* min-width: 90vh; */
        /* max-width: 100vh; */
        
        margin: auto;

      }
      button.search{
        height: 50px;
        padding: 0 20px;
        text-align: center;
        margin: auto;   
      }
      input.search{
        height: 50px;
        flex: 1 1 0;
        padding: 0 10px;
      }


    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="container">
      <h2>${this.title}</h2>
      <div class="search">
        <input class="search" placeholder="Search NASA images... (hit enter to search)"  @keydown="${(e)=>e.key==='Enter'?this.inputChanged():undefined}"/>
        <button class="search" @click="${this.inputChanged}">Search</button>
      </div>
      <div>Search results for: ${this.value}</div>
      <div class="results">
        ${this.items.map((item) => html`
        <nasa-image
          source="${item.links[0].href}"
          title="${item.data[0].title}"
          description="${item.data[0].description}"
          photographer="${item.data[0].photographer ? item.data[0].photographer : 'N/A'}"
          owner="${item.data[0].secondary_creator ? item.data[0].secondary_creator : 'N/A'}"
        ></nasa-image>
        ` )}
      </div>
    </div>
    `;
  }
  inputChanged(e) {
    
    this.value = this.shadowRoot.querySelector('input.search').value;
    
    // console.log(this.value);
    this.updateResults(this.value);
  }

  updated(changedProperties) { 
       
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
    
  }
  updateResults(value) {
    if (this.value) {
      this.loading = true;
      fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`)
      .then(d => d.ok ? d.json(): {})
      .then(data => {
        if (data.collection) {
          this.items = [];
          this.items = data.collection.items;
          this.loading = false;
          this.requestUpdate();
        }  
      });
    }else{
      this.items = [];
    }

    
      

  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(nasaSearch.tag, nasaSearch);