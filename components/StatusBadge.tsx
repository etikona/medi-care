import { StatusIcon } from "@/constants";
import Image from "next/image";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        height={24}
        width={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold-capitalize", {
          "bg-green-500": status === "scheduled",
          "bg-blue-500": status === "pending",
          "bg-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
