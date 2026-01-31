"use client";

import { ROUTES } from "@/utils/routes";
import { AppShell, Button, Container, Flex, Image, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLogout,
  IconLogout2,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import CustomButton from "./Common/CustomButton";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const router = useRouter();
  const auth = useAuth();

  return (
    <AppShell
      padding="md"
      className="w-full"
      navbar={{
        width: "300",
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header className="w-full !bg-[#000]">
        <div className="py-1">
          <Container fluid>
            <Flex justify="space-between" className="w-full">
              <div className="w-[50%]">
                <Flex className="w-full" justify="flex-start" gap={25}>
                  <p>+923044716740</p>
                  <p>support@mekacash.com</p>
                </Flex>
              </div>
              <div className="w-[50%]">
                <Flex justify="flex-end" gap={10}>
                  <IconBrandFacebook />
                  <IconBrandLinkedin />
                  <IconBrandInstagram />
                  <IconBrandGoogle />
                </Flex>
              </div>
            </Flex>
          </Container>
        </div>
        <div className="bg-[#fff] shadow-lg">
          <Container fluid>
            <Flex align="center" justify="space-between">
              <div>
                <Image src="/images/logo.png" alt="" className="!w-[75px]" />
              </div>
              <div className="text-[#000]">
                {ROUTES.map((route, index) => {
                  return (
                    <Link className="mx-5" key={index} href={route.url}>
                      {route.label}
                    </Link>
                  );
                })}
              </div>
              {auth.user ? (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <p className="cursor-pointer">{auth?.user.name}</p>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item onClick={() => auth.logout()} leftSection={<IconLogout2 color={'red'} size={14} />}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <CustomButton
                  radius="lg"
                  variant="outline"
                  title="Login / Signup"
                  onClick={() => router.push("/login")}
                />
              )}
            </Flex>
          </Container>
        </div>
      </AppShell.Header>
      {/* <AppShell.Navbar className='!bg-[#fff] !h-[200px]'>Navbar</AppShell.Navbar> */}
    </AppShell>
  );
}
