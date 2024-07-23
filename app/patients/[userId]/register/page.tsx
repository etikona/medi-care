import React from "react";
import logo from "@/public/assets/icons/medi_care_logo_transparent.png";
import register from "@/public/assets/images/register-img.png";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      {/* //! Otp verification */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            height={1000}
            width={1000}
            alt="patient"
            className="mb-10 h-12 w-fit"
            src={logo}
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediCare
            </p>
            {/* //! Customize link color green to blue */}
            <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image src={register} alt="patient" className="side-img max-w-[390]" />
    </div>
  );
};

export default Register;
