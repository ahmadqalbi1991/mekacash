"use client";

import { useState } from "react";
import { Card, Table, Modal, Text, Flex, Tooltip } from "@mantine/core";
import CustomButton from "@/app/components/Common/CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MerchantApis } from "@/app/apis/api-keys";
import { IconCopy } from "@tabler/icons-react";

export default function Page() {
  const queryClient = useQueryClient();

  // Fetch API key
  const { data, isLoading } = MerchantApis.useGetApiKey();

  // Mutations
  const generateMutation = MerchantApis.useGenerateApiKey({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["merchant-api-key"] }),
  });

  const revokeMutation = MerchantApis.useRevokeApiKey({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["merchant-api-key"] }),
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"generate" | "revoke" | null>(
    null,
  );

  // Copy tooltip state
  const [copied, setCopied] = useState(false);

  const apiKey = data?.data;

  // Handlers
  const handleGenerate = () => {
    if (apiKey) {
      setActionType("generate");
      setModalOpen(true);
    } else {
      generateMutation.mutate();
    }
  };

  const handleRevoke = () => {
    setActionType("revoke");
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    if (actionType === "generate") {
      generateMutation.mutate();
    } else if (actionType === "revoke") {
      revokeMutation.mutate();
    }
    setActionType(null);
  };

  const handleCopy = (secretKey: string) => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[75vh] bg-[#F9FAFB] w-full p-10">
      <h3 className="!text-[32px] text-[#1e3056] font-[700] mb-4">API Keys</h3>

      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Public Key</Table.Th>
                <Table.Th>Secret Key</Table.Th>
                <Table.Th>Last Update</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={4}>Loading...</Table.Td>
                </Table.Tr>
              ) : apiKey ? (
                <Table.Tr>
                  <Table.Td>
                    <Flex align="center" gap="sm">
                      <span>{"****" + apiKey.api_public_key.slice(-6)}</span>
                      <Tooltip label={copied ? "Copied!" : "Copy"} withArrow>
                        <IconCopy
                          className="cursor-pointer"
                          color="blue"
                          onClick={() => handleCopy(apiKey.api_public_key)}
                        />
                      </Tooltip>
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    <Flex align="center" gap="sm">
                      <span>{"****" + apiKey.api_secret_key.slice(-6)}</span>
                      <Tooltip label={copied ? "Copied!" : "Copy"} withArrow>
                        <IconCopy
                          className="cursor-pointer"
                          color="blue"
                          onClick={() => handleCopy(apiKey.api_secret_key)}
                        />
                      </Tooltip>
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    {format(new Date(apiKey.updated_at), "dd MMM, yyyy hh:mma")}
                  </Table.Td>
                  <Table.Td>
                    <CustomButton
                      title="Revoke Key"
                      color="red"
                      size="xs"
                      radius="sm"
                      onClick={handleRevoke}
                    />
                  </Table.Td>
                </Table.Tr>
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4}>No API key found.</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Card.Section>
      </Card>

      <div className="mt-6 text-right">
        <CustomButton
          variant="outline"
          title={apiKey ? "Generate New Key" : "Generate Key"}
          radius="xl"
          onClick={handleGenerate}
        />
      </div>

      {/* Confirmation Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        centered
      >
        <Text>
          {actionType === "generate"
            ? "An API key already exists. Generating a new one will revoke the old key. Do you want to continue?"
            : "Are you sure you want to revoke your API key?"}
        </Text>
        <div className="mt-4 flex justify-end gap-3">
          <CustomButton
            title="Cancel"
            variant="outline"
            radius="sm"
            onClick={() => setModalOpen(false)}
          />
          <CustomButton
            title="Confirm"
            color="red"
            radius="sm"
            onClick={handleConfirm}
          />
        </div>
      </Modal>
    </div>
  );
}
