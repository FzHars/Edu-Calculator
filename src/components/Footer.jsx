import { GraduationCap, AlertCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-8 border-t border-slate-200">
      <div className="flex flex-col gap-8 text-center px-2">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <AlertCircle size={14} />
            <p className="text-xs font-bold uppercase tracking-widest">Disclaimer Penting</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[320px] mx-auto font-medium">
            Hasil perhitungan ini adalah simulasi dan estimasi. Biaya riil bergantung pada kebijakan
            masing-masing instansi pendidikan serta fluktuasi ekonomi di masa depan.
          </p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center grayscale opacity-50">
            <GraduationCap size={25} className="text-slate-900" />
          </div>
          <p className="text-xs text-slate-400 font-black tracking-[0.3em] uppercase">
            Edu-Calc
          </p>
          <p className="text-xs text-slate-400">
            ©2026 Built with <span className="grayscale">❤️</span> & Developed by{" "}
            <a
                href="https://web-portofolio-kamu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 hover:underline transition-all"
              >
                {/* hehe name here*/}
              </a>
          </p> 
        </div>
      </div>
    </footer>
  );
}
