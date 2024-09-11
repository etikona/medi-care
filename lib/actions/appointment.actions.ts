"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

// ! Get Appointment

export const getRecentAppointmentList = async () => {
  try {
    // Fetch appointments without querying
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!
    );

    // Log the full response for debugging
    console.log("Raw Appointments Data:", appointments);

    // Check if appointments exist
    if (!appointments.documents || appointments.documents.length === 0) {
      console.error("No documents found in the appointment collection.");
      return {
        totalAppointments: 0,
        scheduleCount: 0,
        pendingCount: 0,
        cancelCount: 0,
        documents: [],
      };
    }

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelCount: 0,
    };

    // Count appointments based on status
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduleCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    // Sort by date manually if $createdAt is unavailable in the query
    const sortedDocuments = appointments.documents.sort((a, b) => {
      const dateA = new Date(a.$createdAt || a.createdAt).getTime();
      const dateB = new Date(b.$createdAt || b.createdAt).getTime();
      return dateB - dateA;
    });

    const data = {
      totalAppointments: appointments.total, // Total number of documents
      ...counts,
      documents: sortedDocuments, // Sorted documents by creation date
    };

    console.log("Processed Appointment Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return {
      totalAppointments: 0,
      scheduleCount: 0,
      pendingCount: 0,
      cancelCount: 0,
      documents: [],
    }; // Return empty data in case of error
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updateAppointment) {
      throw new Error("Appointment doesn't update");
    }
    // TODO SMS Notification
    const smsMessage = `Hi, It's Medi Care.
    ${
      type === "Schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform you that your appointment has been cancelled. Reason ${appointment.cancellationReason}`
    }
    `;
    await sendSMSNotification(userId, smsMessage);
    revalidatePath("./admin");
    return parseStringify(updateAppointment);
  } catch (error) {}
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
