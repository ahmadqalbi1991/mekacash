'use client';

import { Flex, Image } from "@mantine/core";
import CustomButton from "../components/Common/CustomButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter(); 
  return (
    <div className="my-10">
      <Flex direction='column' align='center' justify='center'>
        <div className="w-[25%] mx-auto">
          <Image src="/images/payment-failed.png" alt="" />
        </div>
        <p className="my-2 !text-[#838383] text-[20px]">Payment has been expired or cancelled by admin</p>
        <CustomButton 
        radius="sm"
        title="Go to Home"
        size="lg"
        onClick={() => {
            router.push('/')
        }}
        />
      </Flex>
    </div>
  );
}
