import { debounce } from "es-toolkit";

const medianWidth = 10;
const mobileColumns = "100% 0px 100%";
const desktopColumns = `1fr ${medianWidth}px 1fr`;

export const renderShadow = (el: HTMLElement, html: string, css?: string) => {
  if (el.shadowRoot) {
    return;
  }
  const shadow = el.attachShadow({ mode: "open" });
  shadow.innerHTML = css ? `<style>${css}</style>${html}` : `${html}`;
};

export class SplitPanel extends HTMLElement {
  #isResizing = false;
  isMobileView: boolean | null = null;
  visiblePanel: "map" | "content" = "map";

  rec: DOMRect | null = null;
  median!: HTMLDivElement;
  mapPanel!: HTMLDivElement;
  contentPanel!: HTMLDivElement;

  set isResizing(value) {
    this.#isResizing = value;
    if (value) {
      this.setAttribute("resizing", "");
    } else {
      this.style.userSelect = "";
      this.style.cursor = "";
      this.removeAttribute("resizing");
    }
  }
  get isResizing() {
    return this.#isResizing;
  }

  cacheDom = () => {
    if (!this.shadowRoot) {
      return;
    }
    this.median = this.shadowRoot.querySelector("#median") as HTMLDivElement;
    this.mapPanel = this.querySelector('[slot="map-panel"]') as HTMLDivElement;
    this.contentPanel = this.querySelector('[slot="content-panel"]') as HTMLDivElement;
  };

  updateRec = () => {
    this.rec = this.getBoundingClientRect();
  };

  switchToMobile = () => {
    this.isMobileView = true;
    this.style.gridTemplateColumns = mobileColumns;
    this.style.overflowX = "hidden";
  };

  switchDesktop = () => {
    this.isMobileView = false;
    this.style.gridTemplateColumns = desktopColumns;
    this.style.overflowX = "auto";
    this.mapPanel.style.transform = "none";
    this.contentPanel.style.transform = "none";
  };

  handleResolution = () => {
    if (window.innerWidth < 1024 && this.style.gridTemplateColumns !== mobileColumns) {
      this.switchToMobile();
    }
    if (window.innerWidth > 1024 && this.style.gridTemplateColumns !== desktopColumns) {
      this.switchDesktop();
    }
  };

  handleWindowResize = debounce(() => {
    this.updateRec();
    this.handleResolution();
  }, 500);

  handlePointerdown = (event: PointerEvent) => {
    event.stopPropagation();
    this.isResizing = true;
    this.addEventListener("pointermove", this.handleResizeDrag);
    this.addEventListener("pointerup", this.handlePointerup);
  };
  handlePointerup = (event: PointerEvent) => {
    event.stopPropagation();
    this.isResizing = false;
    this.removeEventListener("pointermove", this.handleResizeDrag);
    this.removeEventListener("pointerup", this.handlePointerup);
  };

  handleResizeDrag = (e: PointerEvent) => {
    e.stopPropagation();
    if (this.rec) {
      const newMedianLeft = e.clientX - this.rec.left;
      this.style.gridTemplateColumns = `calc(${newMedianLeft}px - ${medianWidth / 2}px) ${medianWidth}px 1fr`;
    }
  };

  attachLocalEvents = () => {
    this.median.addEventListener("pointerdown", this.handlePointerdown);
  };

  attachEvents = () => {
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("loaded", this.handleResolution);
  };

  disconnectEvents = () => {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("loaded", this.handleResolution);
  };

  connectedCallback() {
    this.render();
    this.cacheDom();
    this.attachEvents();
    this.attachLocalEvents();
    this.updateRec();
    this.handleResolution();
  }

  disconnectedCallback(): void {
    this.disconnectEvents();
  }

  static styles = ` 
    :host { 
      display: grid;
      min-height: 100%;
      max-height: 100%;
      min-width: 100%;
      max-width: 100%;
    }
    :host([resizing]){ 
      user-select: none; 
    }
    :host([resizing]){ 
      cursor: col-resize; 
    }
    :host { 
      grid-template-columns: ${desktopColumns};
      grid-template-rows: 1fr;
    }
    :host #median {
      inline-size: ${medianWidth}px;
      grid-column: 2 / 3; 
    }
    :host #median:hover { 
      cursor: col-resize; 
    }
    slot[name="map-panel"] { 
      grid-column: 1 / 2; 
      grid-row: 1 / 1;
    }
    slot[name="content-panel"] { 
      grid-column: 3 / 4; 
      grid-row: 1 / 1; 
    }
    :host([resizing][direction=col]){ cursor: row-resize; }

    #median { 
      background: #ccc; 
      width: ${medianWidth}px;
      background: grey;
    }
    ::slotted(*) { overflow: auto; }
  `;

  static html = `
    <slot id="map-panel" name="map-panel"></slot>
    <div id="median" part="median"></div>
    <slot id="content-panel" name="content-panel"></slot>
  `;

  render() {
    renderShadow(this, SplitPanel.html, SplitPanel.styles);
  }
}
