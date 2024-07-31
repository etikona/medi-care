import Image from "next/image";
import Link from "next/link";
import React from "react";
import fullLogo from "@/public/assets/icons/logo-full.svg";
import success from "@/public/assets/gifs/success.gif";
const Success = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div>
        <Link href="/">
          <Image
            src={fullLogo}
            alt="logo"
            height={1000}
            width={1000}
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image src={success} alt="success" height={300} width={280} />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-blue-700">appointment request</span> has
            been successfully submitted.
          </h2>
          <p>We will touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p>Requested appointment details : </p>
          <div className="flex items-center gap-3"></div>
        </section>
      </div>
    </div>
  );
};

export default Success;
