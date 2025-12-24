"use client";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { saveAuthData } from '@/utils/auth'
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
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
      router.replace("/auth/singup");
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

  useEffect(() => {
    if (otp.every((d) => d !== "") && !autoSubmitRef.current) {
      autoSubmitRef.current = true;
      handleSubmit();
    }
  }, [otp]);

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
      toast.error("اطلاعات نشست پیدا نشد");
      autoSubmitRef.current = false;
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("https://api.iranifarsh.neofy.ir/users/register/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        saveAuthData(data.sajy, data.user);
        toast.success("تایید شد");

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
          router.replace("/");
        }, otp.length * 120 + 400);
      } else {
        toast.error("کد تایید اشتباه است");
        setError(true);
        setTimeout(() => {
          setError(false);
          autoSubmitRef.current = false;
        }, 700);
      }
    } catch (err) {
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
    if (!sessionId) return;

    setResendLoading(true);
    try {
      await fetch("https://api.iranifarsh.neofy.ir/users/register/resend", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      toast.success("کد تایید دوباره ارسال شد ✨");
      setResendTimer(120);
    } catch {
      toast.error("خطا در ارسال مجدد");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-[108px] mt-5">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="self-end text-2xl sm:text-3xl border border-primary px-2 rounded-lg hover:bg-red-50"
      >
        ←
      </button>

      <div className="mt-12 sm:mt-16 w-full max-w-md">
        <h2 className="text-2xl sm:text-4xl font-bold text-primary">کد تایید</h2>
        <p className="text-gray-500 text-sm sm:text-xl mt-2">
          کد تایید به آدرس ایمیل شما ارسال شد
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 space-y-8">
          <div dir="ltr" className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => {
              const isSuccess = successIndexes[index];
              const isError = error;

              const cls = `
                lg:w-14 lg:h-14 sm:w-11 sm:h-11
                rounded-xl text-lg lg:text-2xl sm:text-xl font-bold text-center
                border-2 outline-none transition-all
                ${isSuccess ? "border-green-500 scale-105 -translate-y-1" : ""}
                ${isError ? "border-red-500 animate-otp-shake" : ""}
                ${!isSuccess && !isError && digit !== "" ? "border-blue-400" : ""}
                ${digit === "" ? "border-gray-300" : ""}
              `;

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
                  className={cls}
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 sm:h-14 rounded-2xl bg-primary text-white font-semibold text-base sm:text-lg hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "در حال بررسی..." : "تایید"}
          </button>

          {resendTimer > 0 ? (
            <div className="text-primary text-sm">{formatTimer(resendTimer)}</div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-primary text-sm"
            >
              {resendLoading ? "در حال ارسال..." : "ارسال مجدد"}
            </button>
          )}
        </form>
      </div>

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
