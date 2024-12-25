import { Card } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { SplitPanelExample } from "./SplitPanelExample.js";
import { memo, type FC } from "react";
import { isEqual } from "es-toolkit";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
  mapboxExample?: MapExample;
  mapboxAccessToken?: string;
  leafletExample?: MapExample;
  height?: string;
  width?: string;
}

export const SplitPanelExampleCard: FC<SplitPanelExampleProps> = memo(
  ({ height = "100%", width = "100%", ...props }) => {
    return (
      <MantineProvider>
        <Card
          className="not-content"
          shadow="sm"
          padding="0px"
          radius="md"
          withBorder
          w={width}
          h={height}
        >
          <SplitPanelExample {...props} />
        </Card>
      </MantineProvider>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  },
);
