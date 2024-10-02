import { Card } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import type { FC } from "react";
import { SplitPanelExample } from "./SplitPanelExample";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
  mapboxExample?: MapExample;
  leafletExample?: MapExample;
}

export const SplitPanelExampleCard: FC<SplitPanelExampleProps> = (props) => {
  return (
    <MantineProvider>
      <Card className="not-content" shadow="sm" padding="0px" radius="md" withBorder w="100%">
        <SplitPanelExample {...props} />
      </Card>
    </MantineProvider>
  );
};
