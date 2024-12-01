import { SplitPanel } from "./web-components/SplitPanel.js";

customElements.get("mapka-split-panel") ?? customElements.define("mapka-split-panel", SplitPanel);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "split-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
