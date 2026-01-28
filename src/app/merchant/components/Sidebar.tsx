'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, Flex, Text } from '@mantine/core';
import { MERCHANT_ROUTES } from '@/utils/routes';

export default function SideBar() {
  const pathname = usePathname();

  return (
    <Card
      shadow="lg"
      padding="md"
      radius="md"
      className="h-full w-full"
    >
      <Card.Section className="px-3 py-4">
        <Text fw={700} size="lg">
          Merchant Panel
        </Text>
      </Card.Section>

      <div className="flex flex-col gap-2 mt-3">
        {MERCHANT_ROUTES.map((link, index) => {
          const isActive = pathname === link.url;
          const Icon = link.icon;

          return (
            <Link
              key={index}
              href={link.url}
              className={`
                no-underline rounded-md
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <Flex
                align="center"
                gap={12}
                px={12}
                py={10}
              >
                <Icon size={18} />
                <Text size="sm" fw={isActive ? 600 : 500}>
                  {link.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
