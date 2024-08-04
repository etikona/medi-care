import Link from "next/link";
import logo from "@/public/assets/icons/medi_care_logo_transparent.png";
import appointmentIcon from "@/public/assets/icons/appointments.svg";
import pending from "@/public/assets/icons/pending.svg";
import cancel from "@/public/assets/icons/cancelled.svg";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import DataTable from "@/components/DataTable";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  console.log(appointments);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src={logo}
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit-content"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1>Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointment
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments}
            label="Schedule Appointment"
            icon={appointmentIcon}
          />
          <StatCard
            type="pending"
            count={appointments}
            label="Pending Appointment"
            icon={pending}
          />
          <StatCard
            type="cancel"
            count={appointments}
            label="Cancel Appointment"
            icon={cancel}
          />
          <DataTable />
        </section>
      </main>
    </div>
  );
};

export default Admin;
