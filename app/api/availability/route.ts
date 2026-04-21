import { getDayAvailability } from "../../../lib/googleCalendar";

export async function GET(request: Request) {
  console.log("availability API called");
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

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    console.log("availability API response:", {
      message: "date は必須です。",
      status: 400,
    });
    return Response.json({ message: "date は必須です。" }, { status: 400 });
  }

  try {
    const slots = await getDayAvailability(date);
    console.log("availability API response:", { slots });
    return Response.json({ slots });
  } catch (error) {
    console.error("availability API error:", error);
    console.log("availability API response:", {
      message:
        error instanceof Error ? error.message : "空き時間の取得に失敗しました。",
      status: 500,
    });
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "空き時間の取得に失敗しました。",
      },
      { status: 500 },
    );
  }
}
