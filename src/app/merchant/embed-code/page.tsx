"use client";

import CustomButton from "@/app/components/Common/CustomButton";
import CustomInput from "@/app/components/Common/CustomInput";
import { useAuth } from "@/app/context/AuthContext";
import { Flex, Card, Text } from "@mantine/core";
import { useState } from "react";

export default function EmbedCodeCard() {
  const auth = useAuth();
  const [copied, setCopied] = useState(false);

  const iframeCode = `<iframe width="576" height="450" src="https://www.mekacash.co.uk/embed/${auth?.user?.id}" frameborder="0"></iframe>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);

      // Reset button label after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" className="w-full max-w-4xl mx-auto">
      <Text size="lg" mb="md">
        Embed Your Widget
      </Text>

      <Flex justify="center" align="center">
        <CustomInput
          value={iframeCode}
          readOnly
          className="w-full"
        />
      </Flex>

      <Flex justify="center" mt="md">
        <CustomButton
          title={copied ? "Copied!" : "Copy Code"}
          radius="xl"
          variant="outline"
          onClick={copyToClipboard}
        />
      </Flex>
    </Card>
  );
}
