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
    this.value = "aaa";
    this.title = 'help';
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
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }

      h3 span {
        font-size: var(--nasa-search-label-font-size, var(--ddd-font-size-s));
      }
      nasa-image:hover{
        background-color: lightgrey;
      }

      .results{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <h2>${this.title}</h2>
    <div>
        <input class="search input" placeholder="Search NASA images"  />
        <button @click="${this.inputChanged}">Search</button>
    </div>
    <div>Search results for: ${this.value}</div>
    <div class="results">
      ${this.items.map((item) => html`
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        description="${item.data[0].description}"
        photographer="${item.data[0].photographer}"
      ></nasa-image>
      `)}
      
    </div>
    `;
  }
  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('.search.input').value;
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