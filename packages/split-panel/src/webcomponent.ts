import { SplitPanel } from "./web-components/SplitPanel.js";

customElements.get("split-panel") ?? customElements.define("split-panel", SplitPanel);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "split-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
