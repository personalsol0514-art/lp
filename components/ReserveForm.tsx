"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ReserveStatus = "idle" | "submitting" | "success" | "error";
type Slot = {
  label: string;
  startIso: string;
  endIso: string;
  available: boolean;
};

type DayAvailability = {
  date: string;
  slots: Slot[];
};
type ReserveApiResponse = {
  success?: boolean;
  message?: string;
};

function formatDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatMonthDay(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatWeekday(date: Date) {
  return ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
}

export function ReserveForm() {
  const [status, setStatus] = useState<ReserveStatus>("idle");
  const [message, setMessage] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayAvailabilities, setDayAvailabilities] = useState<DayAvailability[]>([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotStart, setSelectedSlotStart] = useState("");
  const [selectedSlotEnd, setSelectedSlotEnd] = useState("");
  const [activeDateKey, setActiveDateKey] = useState("");

  const baseDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() + weekOffset * 7 + index);
      return day;
    });
  }, [baseDate, weekOffset]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlotsByWeek() {
      setSlotLoading(true);
      setMessage("");
      try {
        const responses = await Promise.all(
          weekDates.map(async (dateObj) => {
            const dateKey = formatDateKey(dateObj);
            const response = await fetch(
              `/api/availability?date=${encodeURIComponent(dateKey)}`,
            );
            const data = (await response.json()) as {
              slots?: Slot[];
              message?: string;
            };
            if (!response.ok) {
              throw new Error(data.message ?? "空き時間の取得に失敗しました。");
            }
            return { date: dateKey, slots: data.slots ?? [] };
          }),
        );

        if (!cancelled) {
          setDayAvailabilities(responses);
          const stillValid = responses.some((day) =>
            day.slots.some((slot) => slot.startIso === selectedSlotStart && slot.available),
          );
          if (!stillValid) {
            setSelectedDate("");
            setSelectedSlotStart("");
            setSelectedSlotEnd("");
          }
          // 表示中の日付を初期化：空きのある最初の日、なければ先頭日
          const firstWithOpen = responses.find((day) =>
            day.slots.some((slot) => slot.available),
          );
          setActiveDateKey(
            (firstWithOpen ?? responses[0])?.date ?? "",
          );
        }
      } catch (error) {
        if (!cancelled) {
          setDayAvailabilities([]);
          setSelectedSlotStart("");
          setSelectedSlotEnd("");
          setMessage(
            error instanceof Error
              ? error.message
              : "空き時間の取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) {
          setSlotLoading(false);
        }
      }
    }

    void loadSlotsByWeek();
    return () => {
      cancelled = true;
    };
  }, [weekDates, selectedSlotStart]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      selectedDate: String(formData.get("selectedDate") ?? ""),
      slotStartIso: String(formData.get("slotStartIso") ?? ""),
      slotEndIso: String(formData.get("slotEndIso") ?? ""),
      note: String(formData.get("note") ?? ""),
    };

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const rawBody = await response.text();
      console.log("reserve API status:", response.status);
      console.log("reserve API body:", rawBody);

      let data: ReserveApiResponse | null = null;
      try {
        data = JSON.parse(rawBody) as ReserveApiResponse;
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ??
            "送信に失敗しました。サーバーから不正なレスポンスが返されました。",
        );
      }

      if (!data || data.success !== true) {
        throw new Error(
          data?.message ?? "予約処理が完了していないため送信を中止しました。",
        );
      }

      setStatus("success");
      setSelectedDate("");
      setSelectedSlotStart("");
      setSelectedSlotEnd("");
      window.location.assign(`${window.location.origin}/thanks`);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-[#EADCCF] bg-[#FFFDF8] p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <p className="text-base font-black text-[#3A342F]">ご希望の日時</p>
          <span className="rounded-full bg-[#E86F23] px-2 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        </div>

        {/* 週ナビゲーション */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
            disabled={weekOffset === 0}
            className="inline-flex h-9 items-center gap-1 rounded-full border border-[#EADCCF] bg-white px-3 text-sm font-black text-[#B86E3C] transition hover:bg-[#FFF4EA] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden>‹</span>
            <span className="hidden sm:inline">前の週</span>
          </button>
          <p className="text-sm font-black text-[#3A342F]">
            {formatMonthDay(weekDates[0])} 〜 {formatMonthDay(weekDates[6])}
          </p>
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="inline-flex h-9 items-center gap-1 rounded-full border border-[#EADCCF] bg-white px-3 text-sm font-black text-[#B86E3C] transition hover:bg-[#FFF4EA]"
          >
            <span className="hidden sm:inline">次の週</span>
            <span aria-hidden>›</span>
          </button>
        </div>

        {slotLoading ? (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#EADCCF] bg-white py-10 text-sm font-bold text-[#8B8178]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#EADCCF] border-t-[#E86F23]" />
            空き状況を読み込み中...
          </div>
        ) : (
          <>
            {/* 日付選択（横スクロール可能なチップ） */}
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
              {weekDates.map((dateObj) => {
                const dateKey = formatDateKey(dateObj);
                const dayLabel = formatWeekday(dateObj);
                const day = dayAvailabilities.find((item) => item.date === dateKey);
                const openCount = day?.slots.filter((slot) => slot.available).length ?? 0;
                const isActive = activeDateKey === dateKey;
                const weekdayColor =
                  dayLabel === "土"
                    ? "text-sky-600"
                    : dayLabel === "日"
                      ? "text-rose-600"
                      : "text-[#6D6258]";
                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setActiveDateKey(dateKey)}
                    className={`flex min-w-[3.6rem] flex-shrink-0 flex-col items-center rounded-xl border px-2 py-2 transition ${
                      isActive
                        ? "border-[#E86F23] bg-[#E86F23] text-white shadow-[0_8px_18px_rgba(232,111,35,0.25)]"
                        : "border-[#EADCCF] bg-white hover:border-[#E86F23]/50"
                    }`}
                  >
                    <span
                      className={`text-[0.7rem] font-bold ${
                        isActive ? "text-white/85" : weekdayColor
                      }`}
                    >
                      {dayLabel}
                    </span>
                    <span
                      className={`text-base font-black leading-tight ${
                        isActive ? "text-white" : "text-[#3A342F]"
                      }`}
                    >
                      {formatMonthDay(dateObj)}
                    </span>
                    <span
                      className={`mt-0.5 text-[0.6rem] font-bold ${
                        isActive
                          ? "text-white/85"
                          : openCount > 0
                            ? "text-[#7B9257]"
                            : "text-[#C4BBB1]"
                      }`}
                    >
                      {openCount > 0 ? `空き${openCount}` : "満"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 選択した日の時間枠 */}
            {(() => {
              const day = dayAvailabilities.find((item) => item.date === activeDateKey);
              const slots = day?.slots ?? [];
              const hasOpen = slots.some((slot) => slot.available);
              return (
                <div className="mt-3 rounded-xl border border-[#EADCCF] bg-white p-3 sm:p-4">
                  {slots.length === 0 ? (
                    <p className="py-6 text-center text-sm font-bold text-[#8B8178]">
                      この日は予約枠がありません。
                    </p>
                  ) : !hasOpen ? (
                    <p className="py-6 text-center text-sm font-bold text-[#8B8178]">
                      この日は満員です。別の日をお選びください。
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map((slot) => {
                        const selected = selectedSlotStart === slot.startIso;
                        return (
                          <button
                            key={slot.startIso}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => {
                              setSelectedDate(activeDateKey);
                              setSelectedSlotStart(slot.startIso);
                              setSelectedSlotEnd(slot.endIso);
                            }}
                            className={`flex min-h-[3rem] flex-col items-center justify-center rounded-xl border text-sm font-black transition ${
                              !slot.available
                                ? "cursor-not-allowed border-[#EEE7DE] bg-[#F6F2EC] text-[#C4BBB1] line-through"
                                : selected
                                  ? "border-[#E86F23] bg-[#E86F23] text-white shadow-[0_8px_18px_rgba(232,111,35,0.25)]"
                                  : "border-[#EADCCF] bg-white text-[#3A342F] hover:border-[#E86F23] hover:bg-[#FFF4EA]"
                            }`}
                          >
                            {slot.label}
                            <span
                              className={`mt-0.5 text-[0.6rem] font-bold ${
                                !slot.available
                                  ? "text-[#C4BBB1]"
                                  : selected
                                    ? "text-white/85"
                                    : "text-[#7B9257]"
                              }`}
                            >
                              {slot.available ? "空き" : "×"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </>
        )}

        <p className="mt-3 text-xs font-bold text-[#8B8178]">
          営業時間: 11:00〜20:00（60分枠）
        </p>
        <input type="hidden" name="slotStartIso" value={selectedSlotStart} required />
        <input type="hidden" name="slotEndIso" value={selectedSlotEnd} required />
        <input type="hidden" name="selectedDate" value={selectedDate} required />
      </section>

      <div>
        <label htmlFor="name" className="text-body-sm font-semibold text-slate-700">
          お名前 <span className="text-[#E07A3A]">必須</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-xl border border-[#E9D8C9] bg-white px-4 py-3 text-body text-slate-900 outline-none transition focus:border-[#E07A3A] focus:ring-2 focus:ring-[#E07A3A]/25"
          placeholder="山田 花子"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-body-sm font-semibold text-slate-700">
            メールアドレス <span className="text-[#E07A3A]">必須</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-xl border border-[#E9D8C9] bg-white px-4 py-3 text-body text-slate-900 outline-none transition focus:border-[#E07A3A] focus:ring-2 focus:ring-[#E07A3A]/25"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-body-sm font-semibold text-slate-700">
            電話番号 <span className="text-[#E07A3A]">必須</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1.5 w-full rounded-xl border border-[#E9D8C9] bg-white px-4 py-3 text-body text-slate-900 outline-none transition focus:border-[#E07A3A] focus:ring-2 focus:ring-[#E07A3A]/25"
            placeholder="090-1234-5678"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="text-body-sm font-semibold text-slate-700">
          ご相談内容
        </label>
        <textarea
          id="note"
          name="note"
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-[#E9D8C9] bg-white px-4 py-3 text-body text-slate-900 outline-none transition focus:border-[#E07A3A] focus:ring-2 focus:ring-[#E07A3A]/25"
          placeholder="運動経験、目的、お悩みなど"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || !selectedSlotStart}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#E07A3A] px-6 py-3 text-body font-semibold text-white shadow-md shadow-[#E07A3A]/35 transition hover:bg-[#cf6d34] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "送信中..." : "予約内容を送信する"}
      </button>

      {message ? (
        <p
          className={`text-body-sm font-medium ${
            status === "success" ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
