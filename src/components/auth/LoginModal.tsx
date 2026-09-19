"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on open/close
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          router.push("/workspace");
        }, 1500);
      } else {
        await signUp(email, password, fullName, company);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          router.push("/workspace");
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-card-foreground shadow-2xl ring-1 ring-black/10 transition-all transform animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Ambient top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-48 rounded-full bg-blue-600/15 blur-3xl"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Yopish"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Sparkles size={13} />
            <span>ExportYor.AI Platformasi</span>
          </div>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {isLogin ? "Tizimga kirish" : "Hisob yaratish"}
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            {isLogin
              ? "Bojxona tahlillari va eksport kabinetingizga kiring"
              : "3 ta bepul to'liq eksport tahliliga ega bo'ling"}
          </p>
        </div>

        {/* Success Banner */}
        {isSuccess ? (
          <div className="my-8 flex flex-col items-center justify-center space-y-3 rounded-2xl bg-emerald-500/10 p-6 text-center ring-1 ring-emerald-500/20">
            <div className="grid size-12 place-items-center rounded-full bg-emerald-500 text-white shadow-md animate-in zoom-in">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                {isLogin ? "Muvaffaqiyatli kirdingiz!" : "Ro'yxatdan muvaffaqiyatli o'tdingiz!"}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Kabinetga yo&apos;naltirilmoqda...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Google OAuth Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-secondary hover:border-blue-500/40 active:scale-[0.99] disabled:opacity-60 sm:text-sm"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google orqali davom etish</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div aria-hidden="true" className="w-full border-t border-border/80" />
              <span className="relative bg-card px-3 text-[11px] font-semibold text-muted-foreground">
                Yoki elektron pochta bilan
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Register-specific fields */}
              {!isLogin && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      F.I.Sh
                    </label>
                    <div className="relative flex items-center">
                      <User size={15} className="absolute left-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Aziz Karimov"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-xs text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Kompaniya nomi
                    </label>
                    <div className="relative flex items-center">
                      <Building2 size={15} className="absolute left-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Samarkand Agro Export MCHJ"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-xs text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 sm:text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email field */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">
                  Ishchi elektron pochta
                </label>
                <div className="relative flex items-center">
                  <Mail size={15} className="absolute left-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ism@kompaniya.uz"
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-xs text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Maxfiy parol</label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Parolni unutdingizmi?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock size={15} className="absolute left-3.5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-xs text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me (in login mode) */}
              {isLogin && (
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-3.5 rounded border-border accent-blue-600"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs text-muted-foreground select-none cursor-pointer"
                  >
                    Eslab qolish (30 kun)
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Tasdiqlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode Footer */}
            <div className="mt-5 text-center text-xs text-muted-foreground">
              {isLogin ? (
                <span>
                  Hisobingiz yo&apos;qmi?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Ro&apos;yxatdan o&apos;ting
                  </button>
                </span>
              ) : (
                <span>
                  Hisobingiz bormi?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Tizimga kiring
                  </button>
                </span>
              )}
            </div>

            {/* Security notice */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/80">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>256-bit SSL xavfsiz B2B autentifikatsiya</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
