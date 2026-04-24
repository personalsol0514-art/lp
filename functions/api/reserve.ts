type Env = {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_ID?: string;
  RESEND_API_KEY?: string;
  RESERVE_FROM_EMAIL?: string;
  RESERVE_TO_EMAIL?: string;
};

type ReservePayload = {
  name?: string;
  email?: string;
  phone?: string;
  selectedDate?: string;
  slotStartIso?: string;
  slotEndIso?: string;
  note?: string;
};

const TIME_ZONE = "Asia/Tokyo";

function isBlank(value: string | undefined) {
  return !value || value.trim().length === 0;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCalendarId(env: Env) {
  return env.GOOGLE_CALENDAR_ID || "personal.sol0514@gmail.com";
}

function formatReservationMailDateTime(
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
    timeZone: TIME_ZONE,
  });
  const time = `${tf.format(start)}〜${tf.format(end)}`;
  return { date, time };
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

async function createCalendarReservation(
  env: Env,
  params: {
    name: string;
    email: string;
    phone: string;
    note: string;
    slotStartIso: string;
    slotEndIso: string;
  },
) {
  console.log("GOOGLE_CLIENT_ID exists:", !!env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET exists:", !!env.GOOGLE_CLIENT_SECRET);
  console.log("GOOGLE_REFRESH_TOKEN exists:", !!env.GOOGLE_REFRESH_TOKEN);
  console.log("GOOGLE_CALENDAR_ID:", env.GOOGLE_CALENDAR_ID);

  const accessToken = await getGoogleAccessToken(env);
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(getCalendarId(env))}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: `【体験予約】${params.name}`,
        description: `メール: ${params.email}\n電話番号: ${params.phone}\n相談内容: ${params.note || "未入力"}`,
        start: { dateTime: params.slotStartIso, timeZone: TIME_ZONE },
        end: { dateTime: params.slotEndIso, timeZone: TIME_ZONE },
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google calendar登録失敗: ${response.status} ${detail}`);
  }
}

async function sendEmail(
  env: Env,
  params: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  },
) {
  if (!env.RESEND_API_KEY || !env.RESERVE_FROM_EMAIL) {
    throw new Error(
      "メール送信設定が未完了です。RESEND_API_KEY / RESERVE_FROM_EMAIL を設定してください。",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESERVE_FROM_EMAIL,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend送信失敗: ${response.status} ${detail}`);
  }
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}) {
  console.log("reserve function called");
  console.log("reserve API called");

  try {
    const body = (await context.request.json()) as ReservePayload;
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
      console.log("reserve API response:", { status: 400, message: "必須項目不足" });
      return Response.json(
        { success: false, message: "お名前・メールアドレス・電話番号・予約日時は必須です。" },
        { status: 400 },
      );
    }

    if (!context.env.RESERVE_TO_EMAIL) {
      throw new Error("RESERVE_TO_EMAIL が未設定です。");
    }

    await createCalendarReservation(context.env, {
      name,
      email,
      phone,
      note,
      slotStartIso,
      slotEndIso,
    });

    const adminTextBody = `体験予約フォームから新規送信がありました。

お名前: ${name}
メールアドレス: ${email}
電話番号: ${phone}
予約日: ${selectedDate}
予約時間: ${slotStartIso} - ${slotEndIso}

相談内容:
${note || "未入力"}
`;

    await sendEmail(context.env, {
      to: context.env.RESERVE_TO_EMAIL,
      subject: `【体験予約】${name}さんからのお問い合わせ`,
      text: adminTextBody,
    });

    const { date, time } = formatReservationMailDateTime(
      selectedDate,
      slotStartIso,
      slotEndIso,
    );
    const customerSubject =
      "【予約完了】ご予約ありがとうございます｜THE natural fitness";
    const customerText = `${name}様

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
    const customerHtml = `
      <div style="font-family: sans-serif; line-height: 1.8; color: #222;">
        <p>${escapeHtml(name)}様</p>
        <p>この度は「THE natural fitness」へのご予約ありがとうございます。<br />以下の内容でご予約を承りました。</p>
        <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0 0 8px;"><strong>■ ご予約内容</strong></p>
          <p style="margin: 0;">・日時：${escapeHtml(date)} ${escapeHtml(time)}</p>
          <p style="margin: 0;">・お名前：${escapeHtml(name)}</p>
        </div>
        <p><strong>■ 店舗情報</strong><br /><a href="https://share.google/hpcGLzlxCvXok9nZE">店舗はこちら</a></p>
        <p><strong>■ 駐車場</strong><br /><a href="https://share.google/mGZNxrMdQfTS8wx2b">駐車場はこちら</a></p>
        <p><strong>■ 持ち物</strong><br />・室内シューズ<br />・動きやすい服装</p>
        <p>当日はお時間の5分前を目安にお越しください。<br />※ご予約の変更・キャンセルは事前にご連絡ください。<br />※お問い合わせ先：<a href="tel:09018195050">090-1819-5050</a></p>
        <p>それではお会いできることを楽しみにしております。</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p>THE natural fitness</p>
      </div>
    `;

    try {
      await sendEmail(context.env, {
        to: email,
        subject: customerSubject,
        text: customerText,
        html: customerHtml,
      });
    } catch (customerMailError) {
      console.error("予約者への確認メール送信に失敗しました:", customerMailError);
    }

    console.log("reserve API response:", { status: 200, message: "送信に成功しました。" });
    return Response.json({ success: true, message: "送信に成功しました。" });
  } catch (error) {
    console.error("reserve API error:", error);
    const message =
      error instanceof Error ? `送信エラー: ${error.message}` : "送信に失敗しました。";
    console.log("reserve API response:", { status: 500, message });
    return Response.json({ success: false, message }, { status: 500 });
  }
}
