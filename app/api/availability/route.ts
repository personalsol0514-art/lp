import { getDayAvailability } from "../../../lib/googleCalendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return Response.json({ message: "date は必須です。" }, { status: 400 });
  }

  try {
    const slots = await getDayAvailability(date);
    return Response.json({ slots });
  } catch (error) {
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
