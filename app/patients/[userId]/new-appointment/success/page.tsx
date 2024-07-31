import Image from "next/image";
import Link from "next/link";
import React from "react";
import fullLogo from "@/public/assets/icons/logo-full.svg"
const Success = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div>
        <Link href="/">
        <Image src={fullLogo} alt="" />
        </Link>
        </div>
    </div>
  );
};

export default Success;
