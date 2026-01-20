"use client";

import { Avatar, Card, Container, Flex, Grid, Image, Input } from "@mantine/core";
import CustomCarousel from "./components/Common/CustomCarousel";
import CustomButton from "./components/Common/CustomButton";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { countries as countryData } from "country-data";
import Link from "next/link";
import { IconBrandGooglePlay, IconPlayerPlayFilled } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import CountUp from "react-countup";

export default function Home() {
  countries.registerLocale(en);

  const isoCodes = Object.keys(countries.getAlpha2Codes()).slice(0, 20);
  return (
    <>
      <CustomCarousel />

      <Container fluid>
        <div className="text-center">
          <h3 className="text-[32px] text-[#1e3056] font-[700] mb-2">
            Signup and Earn $1
          </h3>
          <Grid>
            <Grid.Col span={{ sm: 12, md: 6 }} className="!px-10">
              <div className="text-justify">
                <p className="text-[16px]">
                  Anyone can earn their first dollar online. Just start with
                  what you know, see what sticks, and get paid. It's that easy.
                  We want you to try them, lots of them, and find out what
                  works. You don't have to be a tech expert or even understand
                  how to start a business. You just got to take what you know
                  and sell it. Make your own road Whether you need more balance,
                  flexibility, or just a different gig, we make it easier to
                  chart a new path. You don't have to be a tech expert or even
                  understand how to start a business. You just got to take what
                  you know and sell it. Join the thousands of companies of all
                  sizes that use MekaCash to accept payments online and in
                  person, embed financial services, power custom revenue models,
                  and build a more profitable business.
                </p>
              </div>
              <div className="text-left mt-10">
                <CustomButton
                  radius="xl"
                  title="Talk to us"
                  size="lg"
                  variant="outline"
                  color="#735996"
                />
              </div>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
              <div>
                <Image src="/images/payment-gateway.png" alt="" />
              </div>
            </Grid.Col>
          </Grid>
        </div>

        <div className="w-full my-20">
          <h3 className="text-[32px] text-center my-10 text-[#1e3056] font-[700] mb-2">
            Country – Currency Directory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {isoCodes.map((code) => {
              const country = countryData[code];
              const currency = country?.currencies?.[0] || "N/A";

              return (
                <Card key={code} shadow="sm" padding="md">
                  <Card.Section className="p-4 text-center font-semibold">
                    <Flex align="center">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-4 shadow-lg">
                        <Image
                          src={`/images/flags/${code.toLowerCase()}.png`}
                          alt={countries.getName(code, "en") || ""}
                          className="!w-full !h-full mb-2"
                        />
                      </div>
                      <div>
                        <div>{countries.getName(code, "en")}</div>
                        <div className="text-sm text-gray-600">{currency}</div>
                      </div>
                    </Flex>
                  </Card.Section>
                </Card>
              );
            })}
          </div>
          <div className="text-center flex justify-center w-full my-5">
            <Link href="/country-currency-directory">View All Countries</Link>
          </div>
        </div>
      </Container>
      <div className="w-full">
        <div className="h-[500px] bg-[linear-gradient(90deg,#D1E7FF_10%,#FAFAFA_90%)]">
          <Container fluid className="h-full flex items-center justify-center">
            <Grid>
              <Grid.Col
                span={{ sm: 12, md: 6 }}
                className="flex items-center justify-center"
              >
                <div>
                  <h3 className="text-[32px] text-[#1e3056] font-[700] mb-2">
                    Take your startup farther, faster
                  </h3>
                  <p className="text-[16px] mb-4">
                    Join the thousands of companies of all sizes that use
                    MekaCash to accept payments online and in person, embed
                    financial services, power custom revenue models, and build a
                    more profitable business.
                  </p>
                  <CustomButton
                    radius="xl"
                    title="Get Started"
                    size="lg"
                    variant="outline"
                    color="#735996"
                  />
                </div>
              </Grid.Col>
              <Grid.Col
                span={{ sm: 12, md: 6 }}
                className="flex items-center justify-center"
              >
                <div className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-[200px] h-[200px] rounded-full bg-white flex items-center justify-center shadow-lg">
                    <IconPlayerPlayFilled size={150} color="#735996" />
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </div>
      </div>

      <Container className="my-10">
        <div className="text-center">
          <h3 className="text-[32px] text-[#1e3056] font-[700] mb-2">
            Hear From Our Satisfied Customers
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
            <Carousel
              slideSize="65%"
              slideGap="xs"
              controlsOffset="xs"
              controlSize={26}
              withControls
              withIndicators={false}
            >
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" className="max-w-xl mx-auto">
                  <Flex direction="column" align="center" gap="md">
                    <Avatar
                      src="/images/user.png"
                      alt="Customer 1"
                      size={80}
                      radius={80}
                    />
                    <div className="text-center">
                      <p className="italic">
                        "MekaCash has transformed the way we handle
                        transactions. The seamless integration and user-friendly
                        interface have made it a breeze for our customers to
                        make payments."
                      </p>
                      <p className="font-bold mt-2">- John D.</p>
                    </div>
                  </Flex>
                </Card>
              </Carousel.Slide>
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" className="max-w-xl mx-auto">
                  <Flex direction="column" align="center" gap="md">
                    <Avatar
                      src="/images/customer2.jpg"
                      alt="Customer 2"
                      size={80}
                      radius={80}
                    />
                    <div className="text-center">
                      <p className="italic">
                        "The customer support from MekaCash is outstanding.
                        Whenever we had questions or needed assistance, their
                        team was quick to respond and provided effective
                        solutions."
                      </p>
                      <p className="font-bold mt-2">- Sarah K.</p>
                    </div>
                  </Flex>
                </Card>
              </Carousel.Slide>
            </Carousel>
          </div>
        </div>
      </Container>

      <Container fluid className="text-center py-10 mt-20">
        <h3 className="text-[32px] text-[#1e3056] font-[700] mb-2">
          Our Achievement & Success
        </h3>
        <p className="text-[16px] max-w-2xl mx-auto">
          We have created a seamless experience for our customers by bringing
          all dependable business solutions together through one integration.
        </p>
        <Grid className="mt-10">
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <Card shadow="lg" padding="xl" className="mx-auto mb-5">
              <div className="bg-[linear-gradient(-25deg,#a045fd_0%,#eb83a8_100%)] bg-clip-text text-transparent text-4xl font-bold">
                <CountUp start={0} end={200} duration={5} suffix="+" />
              </div>
              <div className="text-[20px]">Global Customers</div>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <Card shadow="lg" padding="xl" className="mx-auto mb-5">
              <div className="bg-[linear-gradient(-25deg,#a045fd_0%,#eb83a8_100%)] bg-clip-text text-transparent text-4xl font-bold">
                <CountUp start={0} end={4} duration={5} />
              </div>
              <div className="text-[20px]">Years of experience</div>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 4 }}>
            <Card shadow="lg" padding="xl" className="mx-auto mb-5">
              <div className="bg-[linear-gradient(-25deg,#a045fd_0%,#eb83a8_100%)] bg-clip-text text-transparent text-4xl font-bold">
                <CountUp
                  start={0}
                  end={99.99}
                  duration={5}
                  decimals={2}
                  suffix="%"
                />
              </div>
              <div className="text-[20px]">Customer Success</div>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      <div className="bg-[#1e3056] shadow-xl text-center py-10 mt-10">
        <h3 className="text-[32px] text-[#fff] font-[700] mb-2">
          Get More Updates by Subscribing to Our Newsletter
        </h3>
        <div className="py-10 flex items-center justify-center">
          <Input size="lg" placeholder="Enter your email address"
          className="w-[500px]"
          classNames={{
            input: "!rounded-xl !rounded-tr-none !rounded-br-none" 
          }}
          />;
          <CustomButton
            className="ml-0 !rounded-xl !rounded-tl-none !rounded-bl-none"
            title="Subscribe Now"
            size="lg"
            variant="filled"
            color="#735996"
          />
        </div>
      </div>
    </>
  );
}
