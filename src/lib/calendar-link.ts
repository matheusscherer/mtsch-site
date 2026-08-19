import { brand } from "@/lib/site";

function gcalStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function googleCalendarUrl(opts: {
  title: string;
  start: Date | string;
  end?: Date | string;
  details: string;
  guests?: string[];
}): string {
  const start = new Date(opts.start);
  const end = opts.end ? new Date(opts.end) : new Date(start.getTime() + 30 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${gcalStamp(start)}/${gcalStamp(end)}`,
    details: opts.details,
    location: "Google Meet",
  });
  if (opts.guests?.length) params.set("add", opts.guests.join(","));
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function meetingCalendarUrl(input: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  start: Date | string;
  end?: Date | string;
}): string {
  const company = input.company?.trim();
  return googleCalendarUrl({
    title: `MTSCH · ${input.name}${company ? ` — ${company}` : ""}`,
    start: input.start,
    end: input.end,
    details: [
      `Recorte do processo · ${brand.lockup}`,
      `Lead: ${input.name} <${input.email}>`,
      company ? `Empresa: ${company}` : "",
      input.message ? `\n${input.message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    guests: [input.email, brand.email],
  });
}
