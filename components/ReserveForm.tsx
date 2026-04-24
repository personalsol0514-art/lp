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

const TIME_LABELS = Array.from({ length: 9 }, (_, index) => {
  const hour = 11 + index;
  return `${String(hour).padStart(2, "0")}:00`;
});

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

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "送信に失敗しました。");
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
      <section className="rounded-2xl border border-[#d9dde3] bg-[#f8fafc] p-3">
        <div className="mb-2 flex items-center gap-2">
          <p className="text-body-sm font-semibold text-slate-700">ご希望の日時</p>
          <span className="rounded bg-[#ef4444] px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#d9dde3] bg-white">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-[#f3f4f6] px-2 py-1.5">
            <button
              type="button"
              onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
              disabled={weekOffset === 0}
              className="rounded border border-[#d1d5db] bg-white px-2 py-0.5 text-xs text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              &lt;
            </button>
            <p className="text-xs font-semibold text-slate-700">
              {formatMonthDay(weekDates[0])} - {formatMonthDay(weekDates[6])}
            </p>
            <button
              type="button"
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="rounded border border-[#d1d5db] bg-white px-2 py-0.5 text-xs text-slate-600"
            >
              &gt;
            </button>
          </div>

          {slotLoading ? (
            <p className="p-3 text-xs text-slate-500">空き状況を読み込み中...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[620px] w-full border-collapse text-center text-xs">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="border-b border-r border-[#e5e7eb] px-1 py-1.5 text-slate-600">
                      時間
                    </th>
                    {weekDates.map((dateObj) => {
                      const dayLabel = formatWeekday(dateObj);
                      const dayClass =
                        dayLabel === "土"
                          ? "text-sky-600"
                          : dayLabel === "日"
                            ? "text-rose-600"
                            : "text-slate-700";
                      return (
                        <th
                          key={formatDateKey(dateObj)}
                          className={`border-b border-[#e5e7eb] px-1 py-1.5 font-semibold ${dayClass}`}
                        >
                          {formatMonthDay(dateObj)}
                          <br />({dayLabel})
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {TIME_LABELS.map((timeLabel, rowIdx) => (
                    <tr key={timeLabel}>
                      <td className="border-r border-[#eef2f7] px-1 py-1 text-[11px] text-slate-600">
                        {timeLabel}
                      </td>
                      {weekDates.map((dateObj) => {
                        const dateKey = formatDateKey(dateObj);
                        const day = dayAvailabilities.find((item) => item.date === dateKey);
                        const slot = day?.slots[rowIdx];
                        if (!slot) {
                          return (
                            <td
                              key={`${dateKey}-${timeLabel}`}
                              className="border-l border-[#eef2f7] px-1 py-1 text-slate-300"
                            >
                              -
                            </td>
                          );
                        }
                        const selected = selectedSlotStart === slot.startIso;
                        return (
                          <td
                            key={slot.startIso}
                            className="border-l border-[#eef2f7] px-0.5 py-0.5"
                          >
                            <button
                              type="button"
                              disabled={!slot.available}
                              onClick={() => {
                                setSelectedDate(dateKey);
                                setSelectedSlotStart(slot.startIso);
                                setSelectedSlotEnd(slot.endIso);
                              }}
                              className={`w-full rounded px-1 py-1 text-xs font-semibold ${
                                slot.available
                                  ? selected
                                    ? "bg-[#E07A3A] text-white"
                                    : "text-[#B86E3C] hover:bg-[#FFF2E8]"
                                  : "cursor-not-allowed text-slate-300"
                              }`}
                            >
                              {slot.available ? "●" : "×"}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">営業時間: 11:00〜20:00（60分枠）</p>
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
