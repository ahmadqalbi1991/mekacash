"use client";

import { Card, Container, Grid } from "@mantine/core";
import { ReactNode } from "react";
import SideBar from "./components/Sidebar";

export default function MerchantLayout({ children }: { children: ReactNode }) {
  return (
    <Container size="xl">
      <div className="my-20">
        <Grid>
          <Grid.Col span={3}>
            <SideBar />
          </Grid.Col>
          <Grid.Col span={9}>
            <div>{children}</div>
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}
