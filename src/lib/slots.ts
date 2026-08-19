export type MeetingSlot = {
  start: string;
  end: string;
  label: string;
  period: "manhã" | "tarde";
};

const HOURS = [10, 14, 16] as const;
const DURATION_MIN = 30;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function todayYmd(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(now);
}

function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + days));
  return `${utc.getUTCFullYear()}-${pad(utc.getUTCMonth() + 1)}-${pad(utc.getUTCDate())}`;
}

function formatSlot(start: Date): string {
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(start);
  const [, month, day] = ymd.split("-").map(Number);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "numeric",
      hour12: false,
    }).format(start),
  );
  const dow = new Date(`${ymd}T12:00:00-03:00`).getDay();
  const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${weekdays[dow]} ${day} ${months[month - 1]} · ${hour}h`;
}

export function proposeSlots(now = new Date(), count = 3): MeetingSlot[] {
  const slots: MeetingSlot[] = [];
  let ymd = todayYmd(now);

  for (let i = 0; i < 21 && slots.length < count; i += 1) {
    const noon = new Date(`${ymd}T12:00:00-03:00`);
    const dow = noon.getDay();
    if (dow !== 0 && dow !== 6) {
      for (const hour of HOURS) {
        const start = new Date(`${ymd}T${pad(hour)}:00:00-03:00`);
        if (start.getTime() <= now.getTime() + 20 * 60 * 1000) continue;
        const end = new Date(start.getTime() + DURATION_MIN * 60 * 1000);
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          label: formatSlot(start),
          period: hour < 12 ? "manhã" : "tarde",
        });
        if (slots.length >= count) return slots;
      }
    }
    ymd = addDays(ymd, 1);
  }

  return slots;
}

export function formatSlotLabel(iso: string): string {
  return formatSlot(new Date(iso));
}

export function periodOf(iso: string): "manhã" | "tarde" {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "numeric",
      hour12: false,
    }).format(new Date(iso)),
  );
  return hour < 12 ? "manhã" : "tarde";
}

export function isOfferedSlot(iso: string, now = new Date()): boolean {
  const target = new Date(iso).toISOString();
  return proposeSlots(now, 12).some((slot) => slot.start === target);
}
