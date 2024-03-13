"use client";

import CommonTitle from "@/components/common-title";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Link from "next/link";
import features from "/public/features.jpg";
import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { HiOutlineFaceSmile } from "react-icons/hi2";

export default function Features() {
  return (
    <main className="flex flex-col gap-20">
      <CommonTitle title="TROVE FEATURES" subtitle="Explore Our Innovative Features">
        <p className="max-w-xl mx-auto">Whether you&apos;re a seasoned cinephile or a casual movie enthusiast, our features are tailored to cater to your needs and preferences.</p>
        <div>
          <Button color="primary" as={Link} href="#features">
            Get started today
          </Button>
        </div>
      </CommonTitle>
      <section className="px-8" id="features">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 items-center gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-4">
              <HiOutlineSparkles size={32} />
              <span className="uppercase text-sm bg-cyan-200 inline-block px-1">Intuitive User Interface</span>
              <p className="lg:max-w-lg">With a sleek design and intuitive controls, booking your tickets has never been easier.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <HiOutlineShieldCheck size={32} />
              <span className="uppercase text-sm bg-teal-200 inline-block px-1">Secure Ticket Booking</span>
              <p className="lg:max-w-lg">Enjoy peace of mind knowing that your ticket bookings are secure and protected.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <HiOutlineFaceSmile size={32} />
              <span className="uppercase text-sm bg-blue-200 inline-block px-1">Personalized Recommendations</span>
              <p className="lg:max-w-lg">Discover new movies and events tailored to your preferences with our personalized recommendation engine.</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image src={features} alt="Now showing film in cinema" quality={80} />
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="font-bold text-2xl text-center">Frequently Asked Questions</h2>
          <Accordion isCompact>
            <AccordionItem key="1" aria-label="How do I book tickets using the app?" title="How do I book tickets using the app?">
              Booking tickets is easy! Simply search for the movie or event you want to attend, select your preferred showtime, choose your seats, and proceed to checkout.
            </AccordionItem>
            <AccordionItem key="2" aria-label="Are there any convenience fees for booking tickets through the app?" title="Are there any convenience fees for booking tickets through the app?">
              Yes, there may be convenience fees associated with booking tickets through the app. These fees help cover the cost of maintaining and improving our platform to provide you with the best possible experience.
            </AccordionItem>
            <AccordionItem key="3" aria-label="How can I view my past bookings?" title="How can I view my past bookings?">
              You can view your past bookings by accessing the &quot;Bookings&quot; section of the app on your profile. Here, you&apos;ll find a detailed list of all the tickets you&apos;ve purchased through the app.
            </AccordionItem>
            <AccordionItem key="4" aria-label="What payment methods are accepted?" title="What payment methods are accepted?">
              We only accept credit/debit cards payment options.
            </AccordionItem>
            <AccordionItem key="5" aria-label="Do I need to create an account to use the app?" title="Do I need to create an account to use the app?">
              While you can browse movie listings and showtimes without creating an account, you&apos;ll need to sign up to book tickets, access personalized recommendations, and receive exclusive offers and discounts.
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
