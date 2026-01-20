'use client';

import { ROUTES } from "@/utils/routes";
import { Container, Grid, Image } from "@mantine/core";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#000] text-white pt-10 pb-2">   
    <Container fluid>
        <Grid>
            <Grid.Col span={4} className="text-justify mr-10">
                <Image src="/images/logo_white.png" alt="" className="!w-[150px] mb-4" />
                <p>Join the thousands of companies of all sizes that use MekaCash to accept payments online and in person, embed financial services, power custom revenue models, and build a more profitable business.</p>
                </Grid.Col>
            <Grid.Col span={2} className="px-10">
                <h3 className="mb-10 font-bold text-lg">Quick Links</h3>
                <ul className="text-[#b5b5b5]">
                    {ROUTES.map((route, index) => {
                  return (
                    <li key={index} className="mb-2">
                    <Link className="mx-5" href={route.url}>
                      {route.label}
                    </Link>
                    </li>
                  );
                })}
                </ul>
            </Grid.Col>
            <Grid.Col span={4} className="px-10 text-white">
                <h3 className="mb-10 font-bold text-lg">Contact Us</h3>
                <p className="mb-4">Address: 1234 Street Name, City, State, Country</p>
                <p className="mb-4">Phone: +923044716740</p>
                <p className="mb-4">Email: info@mekacash.com</p>
                </Grid.Col>
        </Grid>
      <div className="text-center mt-10 ">
        <p>© 2024 MekaCash. All rights reserved.</p>
      </div>
    </Container> 
    </div>
    );  
}