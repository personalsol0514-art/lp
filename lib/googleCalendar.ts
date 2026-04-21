import { google } from "googleapis";

const TIME_ZONE = "Asia/Tokyo";
const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Google連携設定が不足しています。GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN を設定してください。",
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || "personal.sol0514@gmail.com";
}

function toJstIso(date: string, hour: number) {
  return `${date}T${String(hour).padStart(2, "0")}:00:00+09:00`;
}

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && startB < endA;
}

export async function getDayAvailability(date: string) {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const dayStart = toJstIso(date, OPEN_HOUR);
  const dayEnd = toJstIso(date, CLOSE_HOUR);

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart,
      timeMax: dayEnd,
      timeZone: TIME_ZONE,
      items: [{ id: getCalendarId() }],
    },
  });

  const busyItems = freebusy.data.calendars?.[getCalendarId()]?.busy ?? [];
  const busyRanges = busyItems.map((item) => ({
    start: new Date(item.start || dayStart),
    end: new Date(item.end || dayEnd),
  }));

  const slots = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, index) => {
    const hour = OPEN_HOUR + index;
    const startIso = toJstIso(date, hour);
    const endIso = toJstIso(date, hour + 1);
    const slotStart = new Date(startIso);
    const slotEnd = new Date(endIso);

    const isBusy = busyRanges.some((busy) =>
      overlaps(slotStart, slotEnd, busy.start, busy.end),
    );

    return {
      label: `${String(hour).padStart(2, "0")}:00`,
      startIso,
      endIso,
      available: !isBusy,
    };
  });

  return slots;
}

export async function createCalendarReservation(params: {
  name: string;
  email?: string;
  phone?: string;
  note?: string;
  slotStartIso: string;
  slotEndIso: string;
}) {
  console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
  console.log(
    "GOOGLE_CLIENT_SECRET exists:",
    !!process.env.GOOGLE_CLIENT_SECRET,
  );
  console.log(
    "GOOGLE_REFRESH_TOKEN exists:",
    !!process.env.GOOGLE_REFRESH_TOKEN,
  );
  console.log("GOOGLE_CALENDAR_ID:", process.env.GOOGLE_CALENDAR_ID);

  try {
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

    await calendar.events.insert({
      calendarId: getCalendarId(),
      requestBody: {
        summary: `【体験予約】${params.name}`,
        description: `メール: ${params.email || "未入力"}\n電話番号: ${
          params.phone || "未入力"
        }\n相談内容: ${params.note || "未入力"}`,
        start: { dateTime: params.slotStartIso, timeZone: TIME_ZONE },
        end: { dateTime: params.slotEndIso, timeZone: TIME_ZONE },
      },
    });
  } catch (error) {
    console.error("Google calendar error:", error);
    throw error;
  }
}
