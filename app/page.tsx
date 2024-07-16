import Image from "next/image";
import logo from "../public/assets/icons/medi_care_logo_transparent.png";
import onBoard from "../public/assets/images/onboarding-img.png";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
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
          <PatientForm />
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
      <Image src={onBoard} alt="patient" className="side-img max-w-[50%]" />
    </div>
  );
}
