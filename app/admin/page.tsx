import Link from "next/link";
import logo from "@/public/assets/icons/medi_care_logo_transparent.png";
import appointmentIcon from "@/public/assets/icons/appointments.svg";
import pending from "@/public/assets/icons/pending.svg";
import cancel from "@/public/assets/icons/cancelled.svg";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/columns";
// import DataTable from "@/components/table/DataTable";
// import { columns } from "@/components/table/columns";
async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

const Admin = async () => {
  const data = await getData();
  const appointments = await getRecentAppointmentList();
  console.table(appointments);

  if (!appointments) {
    return <div>Error loading appointments.</div>; // Handle case where appointments data is null or undefined
  }

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
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduleCount} // Schedule Appointment count
            label="Schedule Appointment"
            icon={appointmentIcon}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount} // Pending Appointment count
            label="Pending Appointment"
            icon={pending}
          />
          <StatCard
            type="cancel"
            count={appointments.cancelCount} // Cancelled Appointment count
            label="Cancel Appointment"
            icon={cancel}
          />
        </section>
        {/* <DataTable columns={columns} data={appointments.documents} /> */}
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
};

export default Admin;
