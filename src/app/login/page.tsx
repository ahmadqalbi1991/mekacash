'use client';

import { Card, Flex } from "@mantine/core";
import CustomInput from "../components/Common/CustomInput";
import CustomButton from "../components/Common/CustomButton";
import { useRouter } from "next/navigation";
import { useForm} from "@mantine/form"
import { LoginPayload } from "../apis/auth/auth.types";
import { AuthApis } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

export default function Page() {
  const router = useRouter();
  const {login} = useAuth();

  const form = useForm<LoginPayload>({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => {
        if (!value) return 'Email is required';

        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address';
      },
      password: (value) => 
        value.length >= 8
          ? null
          : 'Password must be at least 8 characters long',
    }
  })

  const { mutate: mutateLoginUser, isPending } = AuthApis.useLogin({
    onSuccess: async (response) => {
      if (response?.token) {
        localStorage.setItem('accessToken', response?.token);
        login(response?.user);
        router.push('/merchant/dashboard')
      }
    },
  });

  const handleFormSubmit = (values: typeof form.values) => {
    mutateLoginUser({
      email: values.email,
      password: values.password
    })
  };

  return (
    <div className="min-h-[75vh] bg-[#F9FAFB]">
      <Flex align="center" justify="center" direction="column" className="h-full p-40">
        <h3 className="!text-[32px] text-[#1e3056] font-[700]">Welcome Back!</h3>
        <p>Please login to continue.</p>
        <Card shadow="sm" radius="md" withBorder className="w-[35%] mt-6">
          <Card.Section>
            <div className="py-10 px-5">
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <CustomInput 
                label="Email Address"
                labelRequired={true}
                placeholder="Enter your email"
                className="mb-4"
                {...form.getInputProps('email')}
              />
              <CustomInput 
                label="Password"
                type="password"
                labelRequired={true}
                placeholder="Enter your password"
                className="mb-4"
                {...form.getInputProps('password')}
              />

              <div className="flex justify-between mb-6">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                <CustomButton 
                disabled={isPending}
                title="Login" type="submit" className="text-[20px] !w-[150px]" radius="sm" />
              </div>
            </form>
            </div>
          </Card.Section>
        </Card>
      </Flex>
      </div>
  );
}