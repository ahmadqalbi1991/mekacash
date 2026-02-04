"use client";

import { useEffect } from "react";
import { useParams, redirect, useRouter } from "next/navigation";

import {
  Card,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  Container,
  Divider,
  Image,
  Loader,
  Flex,
  Modal,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { toast } from "react-toastify";

import { PaymentLinkApis } from "@/app/apis/payment-links";
import { useDisclosure } from "@mantine/hooks";
import CustomButton from "@/app/components/Common/CustomButton";

/* ---------- helpers ---------- */

type CardType = "visa" | "mastercard" | null;

const detectCardType = (number: string): CardType => {
  if (/^4/.test(number)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(number)) return "mastercard";
  return null;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) => {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length <= 2) return clean;
  return `${clean.slice(0, 2)}/${clean.slice(2)}`;
};

const isValidCardNumber = (number: string) => {
  let sum = 0;
  let double = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = Number(number[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
};

const isValidExpiry = (expiry: string) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [mm, yy] = expiry.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return yy > currentYear || (yy === currentYear && mm >= currentMonth);
};

/* ---------- icons ---------- */

const VisaIcon = () => <Image src="/images/visa.webp" alt="Visa" w={40} />;
const MasterCardIcon = () => (
  <Image src="/images/mastercard.png" alt="MasterCard" w={40} />
);

/* ---------- page ---------- */

export default function Page() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const { data: checkPayment, isLoading } =
    PaymentLinkApis.useCheckPayment(id);

  const createPayNow = PaymentLinkApis.usePayNow({
    onSuccess: () => {
      open();
    },
    onError: (err) => {
      showNotification({
        title: "Error",
        message: err.message || "Something went wrong",
        color: "red",
      });
    },
  });

  /* ---------- redirect if inactive ---------- */
  useEffect(() => {
    if (!isLoading && checkPayment?.payment_status !== "active") {
      redirect("/payment-failed");
    }
  }, [checkPayment, isLoading]);

  /* ---------- form ---------- */

  const form = useForm({
    initialValues: {
      card_number: "",
      card_expiry: "",
      card_cvv: "",
    },

    validate: {
      card_number: (value) => {
        const raw = value.replace(/\s/g, "");
        if (raw.length !== 16) return "Card number must be 16 digits";
        if (!isValidCardNumber(raw)) return "Invalid card number";
        return null;
      },

      card_expiry: (value) =>
        isValidExpiry(value) ? null : "Invalid expiry date",

      card_cvv: (value) =>
        value.length < 3 ? "Invalid CVV" : null,
    },
  });

  const rawCardNumber = form.values.card_number.replace(/\s/g, "");
  const cardType = detectCardType(rawCardNumber);

  const handleSubmit = form.onSubmit((values) => {
    createPayNow.mutate({
      id: id,
      payment_method: "card",
      card_number: values.card_number.replace(/\s/g, ""),
      card_expiry: values.card_expiry,
      card_cvv: values.card_cvv,
    });
  });

  return (
    <>
    <Container size="sm" className="flex items-center my-10">
      {isLoading ? (
        <Flex align="center" justify="center" className="h-[500px] w-full">
          <Loader size="md" />
        </Flex>
      ) : (
        <Card shadow="lg" radius="lg" padding="lg" withBorder w="100%">
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <div>
                <Text size="lg" fw={600}>
                  Secure Payment
                </Text>
                <Text size="sm" c="dimmed">
                  Enter your card details
                </Text>
              </div>

              <Divider />

              <TextInput
                label="Card number"
                placeholder="4242 4242 4242 4242"
                {...form.getInputProps("card_number")}
                rightSection={
                  cardType === "visa" ? (
                    <VisaIcon />
                  ) : cardType === "mastercard" ? (
                    <MasterCardIcon />
                  ) : null
                }
                onChange={(e) =>
                  form.setFieldValue(
                    "card_number",
                    formatCardNumber(e.currentTarget.value)
                  )
                }
              />

              <Group grow>
                <TextInput
                  label="Expiry"
                  placeholder="MM/YY"
                  {...form.getInputProps("card_expiry")}
                  onChange={(e) =>
                    form.setFieldValue(
                      "card_expiry",
                      formatExpiry(e.currentTarget.value)
                    )
                  }
                />

                <TextInput
                  label="CVV"
                  placeholder="***"
                  type="password"
                  {...form.getInputProps("card_cvv")}
                  onChange={(e) =>
                    form.setFieldValue(
                      "card_cvv",
                      e.currentTarget.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                />
              </Group>

              <Button
                fullWidth
                size="md"
                mt="md"
                type="submit"
                loading={createPayNow.isPending}
              >
                Pay now {checkPayment?.data.currency}{" "}
                {checkPayment?.data.amount}
              </Button>
            </Stack>
          </form>
        </Card>
      )}
    </Container>

    <Modal size='lg' centered opened={opened} onClose={close} withCloseButton={false}>
        <div className="my-10 px-25">
              <Flex direction='column' align='center' justify='center' className="text-center">
                <div className="w-[25%] mx-auto">
                  <Image src="/images/success-icon.png" alt="" />
                </div>
                <h3 className="text-[#3a3a3a] font-[700] text-[24px]">Your Payment was successful</h3>
                <p className="text-[#838383] text-[16px]">Thank you for your payment. We will be in touch with more details shortly.</p>
                <CustomButton 
                radius="sm"
                title="Go to Home"
                size="sm"
                className="mt-5"
                onClick={() => {
                    router.push('/')
                }}
                />
              </Flex>
            </div>
    </Modal>
    </>
  );
}
