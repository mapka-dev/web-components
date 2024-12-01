# Mapka Split Panel

```bash
yarn add @mapka/split-panel
```

## Usage

```tsx
import { SplitPanel } from "@mapka/split-panel";

<SplitPanel
  leftPanel={<div>Left panel</div>}
  rightPanel={<div>Right panel</div>}
/>
```

```tsx
import "@mapka/split-panel/webcomponent";

<mapka-split-panel>
  <div slot="left-panel">Left panel</div>
  <div slot="right-panel">Right panel</div>
</mapka-split-panel>
```
