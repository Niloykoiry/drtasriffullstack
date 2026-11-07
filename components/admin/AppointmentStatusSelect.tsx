"use client";

import { useState } from "react";
import { setAppointmentStatus } from "@/app/actions/appointments";

type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export default function AppointmentStatusSelect({
  appointmentId,
  initialStatus,
}: {
  appointmentId: string;
  initialStatus: AppointmentStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: AppointmentStatus) {
    setSaving(true);
    setMessage("");
    try {
      const result = await setAppointmentStatus(appointmentId, nextStatus);
      if (!result.success) {
        setMessage(result.error ?? "Could not update appointment status.");
        return;
      }
      setStatus(nextStatus);
      setMessage("Appointment status updated.");
    } catch {
      setMessage("Could not update the appointment status. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <label
        htmlFor={`appointment-status-${appointmentId}`}
        className="text-xs font-medium text-slate-500"
      >
        Confirmation
      </label>
      <select
        id={`appointment-status-${appointmentId}`}
        value={status}
        disabled={saving}
        onChange={(event) => {
          const nextStatus = event.target.value;
          if (
            nextStatus === "PENDING" ||
            nextStatus === "CONFIRMED" ||
            nextStatus === "CANCELLED" ||
            nextStatus === "COMPLETED"
          ) {
            void updateStatus(nextStatus);
          }
        }}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-wait disabled:opacity-60"
      >
        <option value="PENDING">Pending confirmation</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="CANCELLED">Cancel</option>
        <option value="COMPLETED">Visited</option>
      </select>
      {message && (
        <span role="status" className="text-xs text-slate-500">
          {message}
        </span>
      )}
    </div>
  );
}
