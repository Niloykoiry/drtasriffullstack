import { CalendarDays, Clock3, Mail, Phone } from "lucide-react";
import { db } from "@/lib/db";
import AppointmentStatusSelect from "@/components/admin/AppointmentStatusSelect";

function getDhakaToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return new Date(`${values.year}-${values.month}-${values.day}T00:00:00.000Z`);
}

function formatAppointmentDate(date: Date) {
  return new Intl.DateTimeFormat("en-BD", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
  }).format(date);
}

export default async function AdminAppointmentsPage() {
  const appointments = await db.appointmentBooking.findMany({
    where: {
      appointmentDate: { gte: getDhakaToday() },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    orderBy: [{ appointmentDate: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-teal-700">Patient requests</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Upcoming appointments
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Appointment requests from the website, ordered by requested date.
          </p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-800">
          {appointments.length} upcoming
        </span>
      </div>

      {appointments.length ? (
        <div className="mt-7 space-y-4">
          {appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {appointment.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {appointment.reason || "Reason not provided"}
                  </p>
                </div>
                <AppointmentStatusSelect
                  appointmentId={appointment.id}
                  initialStatus={
                    appointment.status === "CONFIRMED" ? "CONFIRMED" : "PENDING"
                  }
                />
              </div>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-teal-700" aria-hidden="true" />
                  {formatAppointmentDate(appointment.appointmentDate)}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-teal-700" aria-hidden="true" />
                  <a className="hover:text-teal-800" href={`tel:${appointment.phone}`}>
                    {appointment.phone}
                  </a>
                </p>
                {appointment.email && (
                  <p className="flex items-center gap-2 sm:col-span-2">
                    <Mail className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    <a
                      className="break-all hover:text-teal-800"
                      href={`mailto:${appointment.email}`}
                    >
                      {appointment.email}
                    </a>
                  </p>
                )}
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                Requested {appointment.createdAt.toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <CalendarDays className="mx-auto h-8 w-8 text-slate-300" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-semibold text-slate-800">
            No upcoming appointment requests
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            New website requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
