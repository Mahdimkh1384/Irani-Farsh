"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputs = useRef([]);

  const sessionId = typeof window !== "undefined" ? localStorage.getItem("signupSessionId") : null;

  // ارسال خودکار OTP وقتی صفحه لود می‌شود
  useEffect(() => {
    if (!sessionId) return;

    setResendLoading(true);
    fetch("https://backend.sajlab.ir/api/users/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message || "کد OTP ارسال شد");
      })
      .catch(err => {
        toast.error("خطا در ارسال OTP");
        console.error(err);
      })
      .finally(() => setResendLoading(false));
  }, [sessionId]);

  const handleChange = (value, index) => {
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionId) {
      toast.error("sessionId موجود نیست!");
      return;
    }

    const code = otp.join("");
    if (code.length < 5) {
      toast.error("لطفاً تمام ۵ رقم را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://backend.sajlab.ir/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, otp: code }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("✔ تایید شد");
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "❌ کد اشتباه است");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!sessionId) return;
    setResendLoading(true);

    try {
      const res = await fetch("https://backend.sajlab.ir/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      toast.success(data.message || "کد مجدداً ارسال شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارسال مجدد OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">تأیید کد</h2>
        <p className="text-gray-600 mb-6">کد ۵ رقمی ارسال شده به ایمیل خود را وارد کنید.</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "در حال بررسی..." : "تأیید"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className={`mt-2 text-blue-600 hover:text-blue-800 transition ${resendLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {resendLoading ? "ارسال مجدد..." : "ارسال مجدد کد"}
          </button>
        </form>
      </div>
    </div>
  );
}
