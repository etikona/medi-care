"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import icon from "@/public/assets/icons/user.svg";
import CustomeFormField from "../CustomeFormField";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there👋</h1>
          <p className="">Schedule your first appointment</p>
        </section>
        <CustomeFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="full name"
          placeholder="John Doe"
          iconSrc={icon}
          iconAlt="User icon"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
