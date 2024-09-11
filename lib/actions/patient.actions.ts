"use server";
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone, // Replace with actual password
      user.name
      // If you don't have a required field, remove this or pass the correct value
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    throw new Error(error.message || "User creation failed"); // Add error handling for other cases
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    console.log(user);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

// Register Patient
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument instanceof FormData) {
      const blobFile = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      if (blobFile && fileName) {
        console.log("Blob File:", blobFile);
        console.log("File Name:", fileName);

        const inputFile = InputFile.fromBuffer(blobFile, fileName);
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

        console.log("File created:", file);
      } else {
        console.error(
          "FormData did not contain the expected fields 'blobFile' and 'fileName'."
        );
      }
    } else {
      console.error("identificationDocument is not an instance of FormData.");
    }

    if (file) {
      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId: file?.$id || null,
          identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient,
        }
      );

      console.log("New patient document created:", newPatient);
      return parseStringify(newPatient);
    } else {
      console.error("File creation failed or no file provided.");
      return undefined;
    }
  } catch (error) {
    console.log("Error in registerPatient:", error);
    return undefined;
  }
};
