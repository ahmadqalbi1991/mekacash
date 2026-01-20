'use client';

import { Card, Flex } from "@mantine/core";
import CustomInput from "../components/Common/CustomInput";
import CustomButton from "../components/Common/CustomButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] bg-[#F9FAFB]">
      <Flex align="center" justify="center" direction="column" className="h-full p-40">
        <h3 className="!text-[32px] text-[#1e3056] font-[700]">Welcome Back!</h3>
        <p>Please login to continue.</p>
        <Card shadow="sm" radius="md" withBorder className="w-[35%] mt-6">
          <Card.Section>
            <div className="py-10 px-5">
            <form action="">
              <CustomInput 
                label="Email Address"
                labelRequired={true}
                placeholder="Enter your email"
                className="mb-4"
              />
              <CustomInput 
                label="Password"
                type="password"
                labelRequired={true}
                placeholder="Enter your password"
                className="mb-4"
              />

              <div className="flex justify-between mb-6">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                <CustomButton title="Login" className="text-[20px] !w-[150px]" radius="sm" onClick={() => {
                  router.push('/merchant/dashboard')
                }} />
              </div>
            </form>
            </div>
          </Card.Section>
        </Card>
      </Flex>
      </div>
  );
}