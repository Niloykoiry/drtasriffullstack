"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

const appointmentStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);

const appointmentSchema = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(7).max(30),
  email: z.union([z.string().trim().email().max(320), z.literal("")]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().trim().max(500),
});

function dhakaDateString(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function submitAppointment(input: unknown) {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please enter your name, a valid phone number, and an appointment date.",
    };
  }

  const { date, ...details } = parsed.data;
  const appointmentDate = new Date(`${date}T00:00:00.000Z`);
  if (
    Number.isNaN(appointmentDate.getTime()) ||
    appointmentDate.toISOString().slice(0, 10) !== date ||
    date < dhakaDateString(new Date())
  ) {
    return { success: false, error: "Choose today or a future appointment date." };
  }

  await db.appointmentBooking.create({
    data: {
      ...details,
      email: details.email || null,
      appointmentDate,
    },
  });

  revalidatePath("/admin/appointments");
  return { success: true };
}

export async function setAppointmentStatus(id: string, status: unknown) {
  await requireAdmin();
  const parsedId = z.string().trim().min(1).max(100).safeParse(id);
  const parsedStatus = appointmentStatusSchema.safeParse(status);
  if (!parsedId.success || !parsedStatus.success) {
    return { success: false, error: "Choose a valid appointment status." };
  }

  const appointment = await db.appointmentBooking.findUnique({
    where: { id: parsedId.data },
    select: { id: true },
  });
  if (!appointment) {
    return { success: false, error: "Appointment not found." };
  }

  await db.appointmentBooking.update({
    where: { id: parsedId.data },
    data: { status: parsedStatus.data },
  });

  revalidatePath("/admin/appointments");
  return { success: true };
}
