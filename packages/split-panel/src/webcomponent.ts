import { SplitPanel } from "./SplitPanel.js";

customElements.define("split-panel", SplitPanel);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "split-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
