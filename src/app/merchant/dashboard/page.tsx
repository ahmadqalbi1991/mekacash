"use client";

import CustomButton from "@/app/components/Common/CustomButton";
import CustomInput from "@/app/components/Common/CustomInput";
import CustomLabel from "@/app/components/Common/CustomLabel";
import CustomSelect from "@/app/components/Common/CustomSelect";
import { BarChart } from "@mantine/charts";
import { Card, Flex, Grid, GridCol, Group, Table, Text } from "@mantine/core";
import { DateInput, DatePicker, DatePickerInput } from "@mantine/dates";

export default function DashboardPage() {
  const data = [
    { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  return (
    <div>
      <h3 className="text-[20px] font-[700] mb-2">Dashboard</h3>
      <Card padding="lg" withBorder shadow="lg">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>Transactions Chart</Text>
          </Group>
        </Card.Section>
        <div className="w-[350px] my-10">
          <CustomLabel text="Date Range" />
          <DatePickerInput type="range" placeholder="Please select dates" />
        </div>
        <div>
          <BarChart
            h={300}
            data={data}
            dataKey="month"
            series={[
              { name: "Smartphones", color: "violet.6" },
              { name: "Laptops", color: "blue.6" },
              { name: "Tablets", color: "teal.6" },
            ]}
            tickLine="y"
          />
        </div>
      </Card>

      <Card padding="lg" withBorder shadow="lg" className="mt-10">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>Transactions List</Text>
          </Group>
        </Card.Section>
        <div className="w-full my-10">
          <Grid>
            <Grid.Col span={4}>
              <CustomInput label="Transaction ID" />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomSelect label="Description" />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomSelect label="Status" />
            </Grid.Col>
            <Grid.Col span={4}>
              <DatePickerInput type="range" placeholder="Please select dates" />
            </Grid.Col>
            <Grid.Col span={4}>
              <Flex gap={8}>
                <CustomButton title="Submit" radius="sm" />
                <CustomButton title="Reset" color="red" radius="sm" />
              </Flex>
            </Grid.Col>
          </Grid>
        </div>
        <div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Element position</Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {elements.map((element) => (
                <Table.Tr key={element.name}>
                  <Table.Td>{element.position}</Table.Td>
                  <Table.Td>{element.name}</Table.Td>
                  <Table.Td>{element.symbol}</Table.Td>
                  <Table.Td>{element.mass}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
