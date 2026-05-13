import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CleanPro – Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background">
      <div className="flex w-full h-full overflow-hidden">
        {/* ── LEFT PANEL – shared across all auth pages ── */}
        <div
          className="hidden md:flex relative w-1/2 bg-cover bg-center flex-col justify-end p-8"
          style={{ backgroundImage: "url('/cleaning-team.jpg')" }}
        >
          {/* Gradient overlay (also works without an image) */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-400 via-blue-600 to-blue-900 opacity-90" />

          {/* Glass badge */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-white text-center">
            <h2 className="font-semibold text-xl mb-1">CleanPro Services</h2>
            <p className="text-sm text-white/70 font-light">
              Professional cleaning, trusted by thousands
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL – title + form injected per page ── */}
        <div className="w-full md:w-2/3 bg-background flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
