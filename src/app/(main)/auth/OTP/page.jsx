"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successIndexes, setSuccessIndexes] = useState([false, false, false, false, false, false]);
  const [resendTimer, setResendTimer] = useState(0);
  const inputs = useRef([]);
  const autoSubmitRef = useRef(false);
  const sessionId = typeof window !== "undefined" ? localStorage.getItem("signupSessionId") : null;

  useEffect(() => {
    const session = localStorage.getItem("signupSessionId");
    if (!session) {
      window.location.href = "/auth/register";
    }
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const formatTimer = (s) => {
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      if (value !== "" && index < newOtp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
      return newOtp;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("کد ۶ رقمی را کامل وارد کنید");
      autoSubmitRef.current = false;
      return;
    }
    if (!sessionId) {
      toast.error("اطلاعات نشست پیدا نشد — دوباره ثبت‌نام کنید");
      autoSubmitRef.current = false;
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://backend.sajlab.ir/api/users/register/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        toast.success("✔ تایید شد");
        for (let i = 0; i < otp.length; i++) {
          setTimeout(() => {
            setSuccessIndexes((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            });
          }, i * 120);
        }
        setTimeout(() => {
          autoSubmitRef.current = false;
          window.location.href = "/dashboard";
        }, otp.length * 120 + 400);
      } else {
        toast.error("کد تایید اشتباه است ❌");
        setError(true);
        setTimeout(() => {
          setError(false);
          autoSubmitRef.current = false;
        }, 700);
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارتباط با سرور");
      setError(true);
      setTimeout(() => {
        setError(false);
        autoSubmitRef.current = false;
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!sessionId) {
      return;
    }
    setResendLoading(true);
    try {
      const res = await fetch("https://backend.sajlab.ir/api/users/register/resend", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      toast.success("کد تایید دوباره ارسال شد ✨");
      setResendTimer(120);
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارسال مجدد");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center flex-col lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-gray-500 text-3xl self-end"
      >
        ←
      </button>
      <div>
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-primary">کد تایید</h2>
          <p className="text-gray-500 text-xl mt-2">
            کد تایید به آدرس ایمیل شما ارسال شد
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-10 space-y-10"
        >
          <div dir="ltr" className="flex justify-center gap-4">
            {otp.map((digit, index) => {
              const baseCls = `
                w-14 h-14 rounded-xl text-2xl font-bold text-center 
                border-2 transition-all outline-none
                focus:ring-2
              `;
              const isSuccess = successIndexes[index];
              const isError = error;

              const extraCls = isSuccess
                ? "border-green-500 transform -translate-y-1 scale-105"
                : isError
                  ? "border-red-500 animate-otp-shake"
                  : digit !== ""
                    ? "border-blue-400 text-gray-800"
                    : "border-gray-300";

              return (
                <input
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`${baseCls} ${extraCls}`}
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full h-14 rounded-2xl text-white font-semibold text-lg
              bg-primary cursor-pointer
              hover:opacity-90 active:scale-95 transition
              ${loading ? "opacity-60 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "در حال بررسی" : "تایید"}
          </button>
          {resendTimer > 0 ? (
            <div className="text-primary text-sm">
              {formatTimer(resendTimer)}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-primary hover: transition text-sm cursor-pointer"
            >
              {resendLoading ? "...در حال ارسال" : "ارسال مجدد"}
            </button>
          )}
        </form>
      </div>

      {/* انیمیشن‌های CSS محلی */}
      <style jsx>{`
        @keyframes otp-shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        .animate-otp-shake {
          animation: otp-shake 0.6s ease;
        }
      `}</style>
    </div>
  );
}
