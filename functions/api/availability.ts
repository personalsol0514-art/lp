type Env = {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_ID?: string;
};

const TIME_ZONE = "Asia/Tokyo";
const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;

function toJstIso(date: string, hour: number) {
  return `${date}T${String(hour).padStart(2, "0")}:00:00+09:00`;
}

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && startB < endA;
}

function getCalendarId(env: Env) {
  return env.GOOGLE_CALENDAR_ID || "personal.sol0514@gmail.com";
}

async function getGoogleAccessToken(env: Env) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      "Google連携設定が不足しています。GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN を設定してください。",
    );
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google token取得失敗: ${response.status} ${detail}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google token取得結果にaccess_tokenがありません。");
  }

  return data.access_token;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}) {
  console.log("availability API called");
  console.log("GOOGLE_CLIENT_ID exists:", !!context.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET exists:", !!context.env.GOOGLE_CLIENT_SECRET);
  console.log("GOOGLE_REFRESH_TOKEN exists:", !!context.env.GOOGLE_REFRESH_TOKEN);
  console.log("GOOGLE_CALENDAR_ID:", context.env.GOOGLE_CALENDAR_ID);

  const { searchParams } = new URL(context.request.url);
  const date = searchParams.get("date");

  if (!date) {
    console.log("availability API response:", { message: "date は必須です。", status: 400 });
    return Response.json({ message: "date は必須です。" }, { status: 400 });
  }

  try {
    const accessToken = await getGoogleAccessToken(context.env);
    const calendarId = getCalendarId(context.env);
    const dayStart = toJstIso(date, OPEN_HOUR);
    const dayEnd = toJstIso(date, CLOSE_HOUR);

    const freebusyResponse = await fetch(
      "https://www.googleapis.com/calendar/v3/freeBusy",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: dayStart,
          timeMax: dayEnd,
          timeZone: TIME_ZONE,
          items: [{ id: calendarId }],
        }),
      },
    );

    if (!freebusyResponse.ok) {
      const detail = await freebusyResponse.text();
      throw new Error(`Google freeBusy失敗: ${freebusyResponse.status} ${detail}`);
    }

    const freebusyData = (await freebusyResponse.json()) as {
      calendars?: Record<string, { busy?: Array<{ start?: string; end?: string }> }>;
    };
    const busyItems = freebusyData.calendars?.[calendarId]?.busy ?? [];
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

    console.log("availability API response:", { status: 200, slotCount: slots.length });
    return Response.json({ slots });
  } catch (error) {
    console.error("availability API error:", error);
    const message =
      error instanceof Error ? error.message : "空き時間の取得に失敗しました。";
    console.log("availability API response:", { message, status: 500 });
    return Response.json({ message }, { status: 500 });
  }
}
