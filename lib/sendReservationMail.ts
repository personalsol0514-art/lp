import { Resend } from "resend";

type ReservationMailParams = {
  name: string;
  email: string;
  date: string;
  time: string;
};

export function formatReservationMailDateTime(
  selectedDate: string,
  slotStartIso: string,
  slotEndIso: string,
): { date: string; time: string } {
  const parts = selectedDate.split("-").map((p) => parseInt(p, 10));
  const [y, m, d] = parts;
  if (
    parts.length !== 3 ||
    Number.isNaN(y) ||
    Number.isNaN(m) ||
    Number.isNaN(d)
  ) {
    return {
      date: selectedDate,
      time: `${slotStartIso} - ${slotEndIso}`,
    };
  }

  const date = `${y}年${m}月${d}日`;
  const start = new Date(slotStartIso);
  const end = new Date(slotEndIso);
  const tf = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  });
  const time = `${tf.format(start)}〜${tf.format(end)}`;
  return { date, time };
}

export async function sendReservationMail({
  name,
  email,
  date,
  time,
}: ReservationMailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }

  if (!process.env.RESERVE_FROM_EMAIL) {
    throw new Error("RESERVE_FROM_EMAIL is not set");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject =
    "【予約完了】ご予約ありがとうございます｜THE natural fitness";

  const text = `${name}様

この度は「THE natural fitness」へのご予約ありがとうございます。
以下の内容でご予約を承りました。

――――――――――――――――
■ ご予約内容

・日時：${date} ${time}
・お名前：${name}

――――――――――――――――

■ 店舗情報
https://share.google/hpcGLzlxCvXok9nZE

■ 駐車場
https://share.google/mGZNxrMdQfTS8wx2b

■ 持ち物
・室内シューズ
・動きやすい服装

当日はお時間の5分前を目安にお越しください。

※ご予約の変更・キャンセルは事前にご連絡ください。
※お問い合わせ先：090-1819-5050

それではお会いできることを楽しみにしております。

――――――――――――――――
THE natural fitness`;

  const html = `
    <div style="font-family: sans-serif; line-height: 1.8; color: #222;">
      <p>${escapeHtml(name)}様</p>

      <p>
        この度は「THE natural fitness」へのご予約ありがとうございます。<br />
        以下の内容でご予約を承りました。
      </p>

      <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px;"><strong>■ ご予約内容</strong></p>
        <p style="margin: 0;">・日時：${escapeHtml(date)} ${escapeHtml(time)}</p>
        <p style="margin: 0;">・お名前：${escapeHtml(name)}</p>
      </div>

      <p><strong>■ 店舗情報</strong><br />
      <a href="https://share.google/hpcGLzlxCvXok9nZE">店舗はこちら</a></p>

      <p><strong>■ 駐車場</strong><br />
      <a href="https://share.google/mGZNxrMdQfTS8wx2b">駐車場はこちら</a></p>

      <p><strong>■ 持ち物</strong><br />
      ・室内シューズ<br />
      ・動きやすい服装
      </p>

      <p>
        当日はお時間の5分前を目安にお越しください。<br />
        ※ご予約の変更・キャンセルは事前にご連絡ください。<br />
        ※お問い合わせ先：<a href="tel:09018195050">090-1819-5050</a>
      </p>

      <p>それではお会いできることを楽しみにしております。</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p>THE natural fitness</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: process.env.RESERVE_FROM_EMAIL,
    to: email,
    subject,
    text,
    html,
  });

  return result;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
