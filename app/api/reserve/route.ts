import { Resend } from "resend";
import { createCalendarReservation } from "../../../lib/googleCalendar";
import {
  formatReservationMailDateTime,
  sendReservationMail,
} from "../../../lib/sendReservationMail";

type ReservePayload = {
  name?: string;
  email?: string;
  phone?: string;
  selectedDate?: string;
  slotStartIso?: string;
  slotEndIso?: string;
  note?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const reserveFrom = process.env.RESERVE_FROM_EMAIL;
const reserveTo = process.env.RESERVE_TO_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isBlank(value: string | undefined) {
  return !value || value.trim().length === 0;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ReservePayload;

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const selectedDate = body.selectedDate?.trim() ?? "";
  const slotStartIso = body.slotStartIso?.trim() ?? "";
  const slotEndIso = body.slotEndIso?.trim() ?? "";
  const note = body.note?.trim() ?? "";

  if (
    isBlank(name) ||
    isBlank(email) ||
    isBlank(phone) ||
    isBlank(selectedDate) ||
    isBlank(slotStartIso) ||
    isBlank(slotEndIso)
  ) {
    return Response.json(
      { message: "お名前・メールアドレス・電話番号・予約日時は必須です。" },
      { status: 400 },
    );
  }

  if (!resend || !reserveFrom || !reserveTo) {
    return Response.json(
      {
        message:
          "メール送信設定が未完了です。RESEND_API_KEY / RESERVE_FROM_EMAIL / RESERVE_TO_EMAIL を設定してください。",
      },
      { status: 500 },
    );
  }

  const textBody = `体験予約フォームから新規送信がありました。

お名前: ${name}
メールアドレス: ${email || "未入力"}
電話番号: ${phone || "未入力"}
予約日: ${selectedDate}
予約時間: ${slotStartIso} - ${slotEndIso}

相談内容:
${note || "未入力"}
`;

  try {
    await createCalendarReservation({
      name,
      email,
      phone,
      note,
      slotStartIso,
      slotEndIso,
    });

    await resend.emails.send({
      from: reserveFrom,
      to: reserveTo,
      subject: `【体験予約】${name}さんからのお問い合わせ`,
      text: textBody,
    });

    if (email) {
      try {
        const { date, time } = formatReservationMailDateTime(
          selectedDate,
          slotStartIso,
          slotEndIso,
        );
        await sendReservationMail({ name, email, date, time });
      } catch (customerMailError) {
        console.error(
          "予約者への確認メール送信に失敗しました:",
          customerMailError,
        );
      }
    }

    return Response.json({ message: "送信に成功しました。" });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? `送信エラー: ${error.message}`
            : "送信に失敗しました。",
      },
      { status: 500 },
    );
  }
}
