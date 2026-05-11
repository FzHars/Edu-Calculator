import { GraduationCap, AlertCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-8 border-t border-slate-200">
      <div className="flex flex-col gap-8 text-center px-2">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <AlertCircle size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">Disclaimer Penting</p>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-[320px] mx-auto font-medium">
            Hasil perhitungan ini adalah simulasi dan estimasi. Biaya riil bergantung pada kebijakan
            masing-masing instansi pendidikan serta fluktuasi ekonomi di masa depan.
          </p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center grayscale opacity-50">
            <GraduationCap size={20} className="text-slate-900" />
          </div>
          <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">
            Edu-Calc
          </p>
          <p className="text-[10px] text-slate-400">
            ©2026 EduCost Predictor | Simulasi Biaya Pendidikan
          </p>
          <div className="text-center pt-4 text-sm">
            <p>
              Built with ❤️ & Developed by{" "}
              <a
                href="https://web-portofolio-kamu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 hover:underline transition-all"
              >
                [Nama Kamu]
              </a>
            </p>
            <p className="text-[10px] mt-1 uppercase tracking-widest opacity-60">
              © 2025-2026 Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
