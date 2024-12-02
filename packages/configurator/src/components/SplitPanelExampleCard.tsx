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
}

export const SplitPanelExampleCard: FC<SplitPanelExampleProps> = memo(
  (props) => {
    return (
      <MantineProvider>
        <Card className="not-content" shadow="sm" padding="0px" radius="md" withBorder w="100%">
          <SplitPanelExample {...props} />
        </Card>
      </MantineProvider>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  },
);
