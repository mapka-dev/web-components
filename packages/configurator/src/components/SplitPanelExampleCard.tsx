import { Card } from "@mantine/core";
import type { FC } from "react";
import { SplitPanelExample } from "./SplitPanelExample";
import { MantineProvider } from "@mantine/core";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
  mapboxExample?: MapExample;
  leafletExample?: MapExample;
}

export const SplitPanelExampleCard: FC<SplitPanelExampleProps> = () => {
  return (
    <MantineProvider>
      <Card shadow="sm" padding="0px" radius="md" h="800px" withBorder w="90%">
        <SplitPanelExample />
      </Card>
    </MantineProvider>
  );
};
