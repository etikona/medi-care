import Image from "next/image";
import logo from "@/public/assets/icons/medi_care_logo_transparent.png";
import appointment from "@/public/assets/icons/appointments.svg";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view-new-appointment", patient.name);
  return (
    <div className="flex h-screen max-h-screen">
      {/* //! Otp verification */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            height={1000}
            width={1000}
            alt="patient"
            className="mb-10 h-12 w-fit"
            src={logo}
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
            setOpen={function (open: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
          <p className="copyright mt-10 py-12">© 2024 MediCare</p>
        </div>
      </section>
      <Image
        src={appointment}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default NewAppointment;
