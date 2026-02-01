"use client";

import { PaymentLinkApis } from "@/app/apis/payment-links";
import { CreatePaymentLinkPayload } from "@/app/apis/payment-links/paymentLinks.types";
import { Card, TextInput, Select, Checkbox, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { toast } from "react-toastify";

export default function Page() {
  // React Query mutation
  const createMutation = PaymentLinkApis.useCreatePaymentLink({
    onSuccess: (res) => {
      toast(res.message, {
        type: 'success'
      })
      form.reset(); // Reset form after successful submission
    },
    onError: (err) => {
      showNotification({
        title: "Error",
        message: err.message || "Something went wrong",
        color: "red",
      });
    },
  });

  // Mantine form
  const form = useForm<CreatePaymentLinkPayload>({
    initialValues: {
      title: "",
      description: "",
      currency: "PKR",
      customer_name: "",
      customer_email: "",
      expiry: "2", // default 2 days (string)
      allow_partial: false,
    },

    validate: {
      title: (value) => (value ? null : "Title is required"),
      customer_name: (value) => (value ? null : "Customer name is required"),
      customer_email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid email",
      expiry: (value) => (value ? null : "Expiry is required"),
    },
  });

  const expiryOptions = [
    { label: "2 Days", value: "2" },
    { label: "3 Days", value: "3" },
    { label: "1 Week", value: "7" },
    { label: "1 Month", value: "30" },
    { label: "2 Months", value: "60" },
  ];

  // Submit handler
  const handleSubmit = (values: CreatePaymentLinkPayload) => {
    const payload = {
      ...values,
      expiry: Number(values.expiry), // convert string to number for backend
    };
    createMutation.mutate(payload);
  };

  return (
    <div className="min-h-[75vh] bg-[#F9FAFB] w-full p-10">
      <h3 className="!text-[32px] text-[#1e3056] font-[700] m-0">Payment Link</h3>
      <p>Create payment link for your customers</p>

      <Card shadow="sm" radius="md" withBorder className="mt-10">
        <Card.Section>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="py-5 px-10 flex flex-col gap-4"
          >
            <TextInput
              label="Title"
              placeholder="Enter title"
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Description"
              placeholder="Enter description (optional)"
              {...form.getInputProps("description")}
            />
            <TextInput
              label="Customer Name"
              placeholder="Enter customer name"
              {...form.getInputProps("customer_name")}
            />
            <TextInput
              label="Customer Email"
              placeholder="Enter customer email"
              {...form.getInputProps("customer_email")}
            />
            <Select
              label="Expiry"
              placeholder="Select expiry"
              data={expiryOptions}
              {...form.getInputProps("expiry")}
            />
            <Checkbox
              label="Allow Partial Payment"
              {...form.getInputProps("allow_partial", { type: "checkbox" })}
            />

            <Flex justify="flex-end" className="mt-4">
              <Button
                type="submit"
                loading={createMutation.isPending}
              >
                Generate Link
              </Button>
            </Flex>
          </form>
        </Card.Section>
      </Card>
    </div>
  );
}
