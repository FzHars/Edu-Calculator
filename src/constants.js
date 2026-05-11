export const INITIAL_LEVELS = [
  { 
    id: 'sd', 
    name: 'Sekolah Dasar (SD)', 
    defaultYears: 6, 
    years: 6, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 'smp', 
    name: 'SMP', 
    defaultYears: 3, 
    years: 3, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 'sma', 
    name: 'SMA', 
    defaultYears: 3, 
    years: 3, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 's1', 
    name: 'Kuliah (S1)', 
    defaultYears: 4, 
    years: 4, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  }
];

export const LEVEL_PROGRESSION = {
  sd: 0,
  smp: 6,
  sma: 9,
  s1: 12
};

export const ONBOARDING_STEPS = [
  {
    title: 'Selamat Datang',
    description: 'Prediksi biaya pendidikan masa depan buah hati Anda dengan EduCost Predictor.',
    icon: 'GraduationCap',
  },
  { 
    title: 'Isi Data Biaya',
    description: 'Masukkan perkiraan biaya sekolah sekarang untuk jenjang SD, SMP, SMA, hingga Kuliah.',
    icon: 'Calculator',
  },
  {
    title: 'Gunakan Inflasi',
    description: 'Aktifkan fitur inflasi untuk melihat nilai biaya di masa depan sesuai asumsi kenaikan tahunan.',
    icon: 'TrendingUp',
  }
];
