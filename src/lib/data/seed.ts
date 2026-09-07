// ─── Seed Data — mirroring DB schema for Phase 2 development ───

export const servicesSeed = [
  {
    id: 1,
    titleId: "Root Canal Treatment",
    titleEn: "Root Canal Treatment",
    descId:
      "Perawatan saluran akar gigi untuk mengatasi infeksi dan menyelamatkan gigi yang rusak parah. Prosedur dilakukan oleh spesialis endodonsi berpengalaman dengan teknik modern dan minim rasa sakit.",
    descEn:
      "Root canal treatment to address infection and save severely damaged teeth. Performed by experienced endodontic specialists using modern, minimally painful techniques.",
    price: 1500000,
    duration: 90,
    category: "Endodonsi",
    slug: "root-canal-treatment",
    isActive: true,
  },
  {
    id: 2,
    titleId: "Odontektomi (Bedah Gigi Bungsu)",
    titleEn: "Odontectomy (Wisdom Tooth Surgery)",
    descId:
      "Operasi pengangkatan gigi bungsu yang tumbuh tidak normal atau impaksi. Dilakukan oleh spesialis bedah mulut dengan teknik minimally invasive untuk pemulihan lebih cepat.",
    descEn:
      "Surgical removal of abnormally growing or impacted wisdom teeth. Performed by oral surgery specialists using minimally invasive techniques for faster recovery.",
    price: 3000000,
    duration: 120,
    category: "Bedah",
    slug: "odontektomi",
    isActive: true,
  },
  {
    id: 3,
    titleId: "Behel Gigi / Orthodontic Treatment",
    titleEn: "Dental Braces / Orthodontic Treatment",
    descId:
      "Perawatan behel untuk merapikan susunan gigi dan memperbaiki fungsi gigitan. Tersedia berbagai jenis behel: metal, keramik, dan self-ligating.",
    descEn:
      "Braces treatment to align teeth and improve bite function. Available in various types: metal, ceramic, and self-ligating braces.",
    price: 8500000,
    duration: 60,
    category: "Orthodonsi",
    slug: "behel-gigi",
    isActive: true,
  },
  {
    id: 4,
    titleId: "Pindah Perawatan Behel",
    titleEn: "Braces Transfer Treatment",
    descId:
      "Layanan pindah perawatan behel dari klinik lain ke Wafi Dental Care. Konsultasi awal gratis untuk evaluasi kondisi dan rencana perawatan selanjutnya.",
    descEn:
      "Transfer your ongoing braces treatment from another clinic to Wafi Dental Care. Free initial consultation for condition evaluation and treatment planning.",
    price: 500000,
    duration: 45,
    category: "Orthodonsi",
    slug: "pindah-perawatan-behel",
    isActive: true,
  },
  {
    id: 5,
    titleId: "Cabut Gigi Anak",
    titleEn: "Pediatric Tooth Extraction",
    descId:
      "Pencabutan gigi susu atau gigi permanen pada anak dengan pendekatan yang lembut dan ramah anak. Tim kami berpengalaman menangani pasien anak-anak.",
    descEn:
      "Gentle and child-friendly extraction of baby teeth or permanent teeth in children. Our team is experienced in treating young patients.",
    price: 200000,
    duration: 30,
    category: "Bedah",
    slug: "cabut-gigi-anak",
    isActive: true,
  },
  {
    id: 6,
    titleId: "Cabut Gigi Dewasa",
    titleEn: "Adult Tooth Extraction",
    descId:
      "Pencabutan gigi dewasa dengan prosedur aman dan minim rasa sakit. Termasuk pencabutan gigi berlubang, gigi goyang, dan gigi yang tidak bisa ditambal.",
    descEn:
      "Safe and minimally painful adult tooth extraction. Includes removal of decayed, loose, and unrestorable teeth.",
    price: 350000,
    duration: 30,
    category: "Bedah",
    slug: "cabut-gigi-dewasa",
    isActive: true,
  },
  {
    id: 7,
    titleId: "Tambal Gigi Anak",
    titleEn: "Pediatric Dental Filling",
    descId:
      "Penambalan gigi berlubang pada anak dengan material aman dan teknik yang nyaman. Pencegahan kerusakan lebih lanjut dan menjaga kesehatan gigi anak.",
    descEn:
      "Filling cavities in children's teeth using safe materials and comfortable techniques. Prevents further damage and maintains pediatric dental health.",
    price: 250000,
    duration: 30,
    category: "Umum",
    slug: "tambal-gigi-anak",
    isActive: true,
  },
  {
    id: 8,
    titleId: "Tambal Gigi Dewasa",
    titleEn: "Adult Dental Filling",
    descId:
      "Penambalan gigi berlubang dengan material composite berkualitas tinggi yang estetik dan tahan lama. Warna dapat disesuaikan dengan gigi asli.",
    descEn:
      "Filling cavities with high-quality, aesthetic, and durable composite material. Color can be matched to your natural teeth.",
    price: 300000,
    duration: 30,
    category: "Umum",
    slug: "tambal-gigi-dewasa",
    isActive: true,
  },
  {
    id: 9,
    titleId: "Scaling / Pembersihan Karang Gigi",
    titleEn: "Scaling / Dental Cleaning",
    descId:
      "Pembersihan karang gigi dan plak menggunakan alat ultrasonik modern. Mencegah penyakit gusi, gigi berlubang, dan menjaga kesegaran napas.",
    descEn:
      "Professional removal of tartar and plaque using modern ultrasonic equipment. Prevents gum disease, cavities, and maintains fresh breath.",
    price: 350000,
    duration: 45,
    category: "Umum",
    slug: "scaling",
    isActive: true,
  },
  {
    id: 10,
    titleId: "Clear Aligner (Behel Transparan)",
    titleEn: "Clear Aligner Treatment",
    descId:
      "Perawatan merapikan gigi dengan aligner transparan yang nyaman dan hampir tidak terlihat. Solusi estetik untuk senyum ideal tanpa behel metal.",
    descEn:
      "Teeth straightening treatment using comfortable, nearly invisible clear aligners. An aesthetic solution for the ideal smile without metal braces.",
    price: 15000000,
    duration: 45,
    category: "Orthodonsi",
    slug: "clear-aligner",
    isActive: true,
  },
  {
    id: 11,
    titleId: "Clear Retainer (Pasca Behel)",
    titleEn: "Clear Retainer (Post Braces)",
    descId:
      "Pembuatan retainer transparan untuk menjaga posisi gigi setelah perawatan behel. Mencegah gigi kembali ke posisi semula.",
    descEn:
      "Custom clear retainers to maintain teeth position after braces treatment. Prevents teeth from shifting back to their original position.",
    price: 2000000,
    duration: 30,
    category: "Orthodonsi",
    slug: "clear-retainer",
    isActive: true,
  },
  {
    id: 12,
    titleId: "Mouth Guard",
    titleEn: "Mouth Guard",
    descId:
      "Pembuatan mouth guard custom untuk melindungi gigi saat berolahraga atau mencegah gigi gemeretak (bruxism) saat tidur.",
    descEn:
      "Custom-made mouth guards to protect teeth during sports or prevent teeth grinding (bruxism) during sleep.",
    price: 1500000,
    duration: 30,
    category: "Umum",
    slug: "mouth-guard",
    isActive: true,
  },
  {
    id: 13,
    titleId: "Veneer Gigi",
    titleEn: "Dental Veneer",
    descId:
      "Pelapisan permukaan gigi dengan material porselen atau composite untuk memperbaiki warna, bentuk, dan estetika senyum Anda.",
    descEn:
      "Tooth surface coating with porcelain or composite material to improve the color, shape, and aesthetics of your smile.",
    price: 2500000,
    duration: 60,
    category: "Estetik",
    slug: "veneer-gigi",
    isActive: true,
  },
  {
    id: 14,
    titleId: "Mahkota Gigi (Crown)",
    titleEn: "Dental Crown",
    descId:
      "Pembuatan mahkota gigi (crown) untuk melindungi dan memperkuat gigi yang rusak parah atau setelah root canal treatment.",
    descEn:
      "Custom dental crowns to protect and strengthen severely damaged teeth or after root canal treatment.",
    price: 3500000,
    duration: 90,
    category: "Estetik",
    slug: "mahkota-gigi",
    isActive: true,
  },
  {
    id: 15,
    titleId: "Fissure Sealant",
    titleEn: "Fissure Sealant",
    descId:
      "Aplikasi lapisan pelindung pada celah gigi untuk mencegah gigi berlubang, terutama pada gigi geraham anak-anak.",
    descEn:
      "Application of protective coating on tooth fissures to prevent cavities, especially on children's molars.",
    price: 250000,
    duration: 15,
    category: "Umum",
    slug: "fissure-sealant",
    isActive: true,
  },
  {
    id: 16,
    titleId: "Implan Gigi",
    titleEn: "Dental Implant",
    descId:
      "Pemasangan implan gigi titanium sebagai pengganti akar gigi yang hilang, dilanjutkan dengan mahkota gigi. Solusi permanen untuk gigi tanggal.",
    descEn:
      "Placement of titanium dental implants as replacement for missing tooth roots, followed by a dental crown. A permanent solution for missing teeth.",
    price: 12000000,
    duration: 120,
    category: "Bedah",
    slug: "implan-gigi",
    isActive: true,
  },
  {
    id: 17,
    titleId: "Bleaching / Pemutihan Gigi",
    titleEn: "Teeth Whitening / Bleaching",
    descId:
      "Prosedur pemutihan gigi profesional menggunakan bahan berkualitas tinggi untuk senyum lebih cerah dan percaya diri.",
    descEn:
      "Professional teeth whitening procedure using high-quality materials for a brighter, more confident smile.",
    price: 1200000,
    duration: 60,
    category: "Estetik",
    slug: "bleaching",
    isActive: true,
  },
];

export const doctorsSeed = [
  {
    id: 1,
    name: "drg. Siti Nuraini, Sp.KG",
    titleId: "Spesialis Konservasi Gigi (Endodonsi)",
    titleEn: "Conservative Dentistry Specialist (Endodontics)",
    bioId:
      "Lulusan FKG Universitas Gadjah Mada dengan pengalaman lebih dari 8 tahun di bidang perawatan saluran akar gigi. Telah menangani ratusan kasus root canal dengan tingkat keberhasilan tinggi. Aktif mengikuti seminar dan pelatihan endodonsi terkini.",
    bioEn:
      "Graduate of Universitas Gadjah Mada Faculty of Dentistry with over 8 years of experience in root canal treatment. Has handled hundreds of root canal cases with high success rates. Actively participates in the latest endodontic seminars and training.",
    photo: "/images/doctors/dr1.svg",
    schedules: [
      { dayOfWeek: 1, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 2, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 3, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 4, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 5, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 6, startTime: "08:00", endTime: "14:00" },
    ],
    isActive: true,
  },
  {
    id: 2,
    name: "drg. Ahmad Fauzi, Sp.Ort",
    titleId: "Spesialis Orthodonsi",
    titleEn: "Orthodontics Specialist",
    bioId:
      "Berpengalaman lebih dari 6 tahun menangani berbagai kasus behel dan aligner dengan pendekatan yang nyaman dan estetik. Lulusan FKG Universitas Indonesia dengan sertifikasi clear aligner internasional.",
    bioEn:
      "Over 6 years of experience handling various braces and aligner cases with a comfortable and aesthetic approach. Graduate of Universitas Indonesia Faculty of Dentistry with international clear aligner certification.",
    photo: "/images/doctors/dr2.svg",
    schedules: [
      { dayOfWeek: 1, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 2, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 3, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 4, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 5, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 6, startTime: "08:00", endTime: "14:00" },
    ],
    isActive: true,
  },
  {
    id: 3,
    name: "drg. Ratna Dewi",
    titleId: "Dokter Gigi Umum",
    titleEn: "General Dentist",
    bioId:
      "Fokus pada perawatan gigi preventif dan estetik dengan sentuhan yang lembut dan ramah untuk semua usia. Lulusan FKG Universitas Airlangga dengan passion di bidang estetik gigi dan perawatan anak.",
    bioEn:
      "Focuses on preventive and aesthetic dental care with a gentle, friendly touch for all ages. Graduate of Universitas Airlangga Faculty of Dentistry with a passion for dental aesthetics and pediatric care.",
    photo: "/images/doctors/dr3.svg",
    schedules: [
      { dayOfWeek: 1, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 2, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 3, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 4, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 5, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 6, startTime: "08:00", endTime: "14:00" },
    ],
    isActive: true,
  },
  {
    id: 4,
    name: "drg. Budi Santoso, Sp.BM",
    titleId: "Spesialis Bedah Mulut",
    titleEn: "Oral Surgery Specialist",
    bioId:
      "Ahli dalam prosedur odontektomi dan implan gigi dengan teknik minimal invasif untuk pemulihan cepat. Berpengalaman lebih dari 10 tahun di bidang bedah mulut dan implantologi.",
    bioEn:
      "Expert in odontectomy and dental implant procedures using minimally invasive techniques for fast recovery. Over 10 years of experience in oral surgery and implantology.",
    photo: "/images/doctors/dr4.svg",
    schedules: [
      { dayOfWeek: 1, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 3, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 4, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 5, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 6, startTime: "10:00", endTime: "18:00" },
    ],
    isActive: true,
  },
  {
    id: 5,
    name: "drg. Maya Puspita",
    titleId: "Dokter Gigi Umum",
    titleEn: "General Dentist",
    bioId:
      "Dokter gigi muda yang energik dengan keahlian di bidang perawatan estetik dan pemutihan gigi. Lulusan terbaik FKG Universitas Gadjah Mada dengan sertifikasi bleaching profesional.",
    bioEn:
      "Energetic young dentist with expertise in aesthetic treatment and teeth whitening. Top graduate of Universitas Gadjah Mada Faculty of Dentistry with professional bleaching certification.",
    photo: "/images/doctors/dr5.svg",
    schedules: [
      { dayOfWeek: 2, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 3, startTime: "13:00", endTime: "21:00" },
      { dayOfWeek: 4, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 5, startTime: "08:00", endTime: "16:00" },
      { dayOfWeek: 6, startTime: "08:00", endTime: "14:00" },
      { dayOfWeek: 0, startTime: "08:00", endTime: "14:00" },
    ],
    isActive: true,
  },
];

export const testimonialsSeed = [
  {
    id: 1,
    patientName: "Dewi Anggraini",
    rating: 5,
    contentId:
      "Pelayanan sangat profesional dan ramah! Dokternya telaten menjelaskan setiap tahap perawatan. Scaling gigi saya hasilnya bersih banget, napas jadi lebih segar. Recommended banget buat yang cari klinik gigi di Jogja!",
    contentEn:
      "Very professional and friendly service! The doctor patiently explained every stage of treatment. My teeth scaling results were super clean, breath feels fresher. Highly recommended for anyone looking for a dental clinic in Jogja!",
    isActive: true,
    createdAt: "2024-11-15T10:30:00Z",
  },
  {
    id: 2,
    patientName: "Rizki Pratama",
    rating: 5,
    contentId:
      "Awalnya takut banget cabut gigi, tapi ternyata prosesnya cepat dan hampir ga kerasa sakit. Dokternya keren banget, selalu kasih tau apa yang dilakukan. Tempatnya juga bersih dan nyaman. Gak nyesel pilih Wafi!",
    contentEn:
      "I was really scared about tooth extraction at first, but the process was quick and almost painless. The doctor was amazing, always explaining what they were doing. The place is also clean and comfortable. No regrets choosing Wafi!",
    isActive: true,
    createdAt: "2024-10-22T14:00:00Z",
  },
  {
    id: 3,
    patientName: "Sarah Wijaya",
    rating: 5,
    contentId:
      "Pasang behel di Wafi Dental Care, hasilnya memuaskan banget! Dokternya detail dan selalu ingetin jadwal kontrol. Harga juga transparan, ga ada biaya tersembunyi. Sekarang udah 1 tahun dan gigi udah rapi banget!",
    contentEn:
      "Got braces at Wafi Dental Care, very satisfying results! The doctor was detailed and always reminded me of check-up schedules. Transparent pricing too, no hidden costs. It's been 1 year now and my teeth are so neat!",
    isActive: true,
    createdAt: "2024-10-08T09:15:00Z",
  },
  {
    id: 4,
    patientName: "Bapak Haryono",
    rating: 5,
    contentId:
      "Saya pasien senior yang biasanya takut ke dokter gigi. Tapi tim Wafi sangat sabar dan pengertian. Dokternya pelan-pelan jelasin semuanya sampai saya tenang. Sekarang rajin kontrol 6 bulan sekali. Terima kasih Wafi!",
    contentEn:
      "I'm a senior patient who used to be afraid of going to the dentist. But the Wafi team was very patient and understanding. The doctor carefully explained everything until I felt calm. Now I regularly come for check-ups every 6 months. Thank you Wafi!",
    isActive: true,
    createdAt: "2024-09-18T11:00:00Z",
  },
  {
    id: 5,
    patientName: "Anisa Putri",
    rating: 5,
    contentId:
      "Root canal treatment di Wafi ternyata gak seseram yang dibayangkan. Dokternya spesialis endodonsi, pengerjaannya teliti banget. 3 kali kunjungan selesai dan sekarang gigi saya terselamatkan. Harganya juga reasonable!",
    contentEn:
      "Root canal treatment at Wafi wasn't as scary as I imagined. The doctor is an endodontic specialist, very meticulous work. Done in 3 visits and now my tooth is saved. The price is also reasonable!",
    isActive: true,
    createdAt: "2024-08-30T15:45:00Z",
  },
  {
    id: 6,
    patientName: "Aditya Nugroho",
    rating: 5,
    contentId:
      "Bawa anak umur 6 tahun cabut gigi susu, anak saya awalnya nangis tapi dokternya jago banget ngalihin perhatian. Akhirnya anak saya malah ketawa pas prosesnya. Amazing! Sekarang tiap ditanya mau ke dokter gigi, dia malah semangat.",
    contentEn:
      "Brought my 6-year-old for baby tooth extraction, my child was crying at first but the doctor was great at distracting them. In the end my child was laughing during the procedure. Amazing! Now whenever asked about going to the dentist, they're excited.",
    isActive: true,
    createdAt: "2024-08-15T10:00:00Z",
  },
  {
    id: 7,
    patientName: "Linda Kusuma",
    rating: 5,
    contentId:
      "Veneer gigi di Wafi hasilnya natural banget! Warna dan bentuknya disesuaikan dengan baik. Prosesnya juga nyaman, dokternya perfeksionis. Sekarang senyum jadi lebih pede. Thank you tim Wafi!",
    contentEn:
      "My dental veneers at Wafi look very natural! The color and shape were well matched. The process was comfortable too, the doctor is a perfectionist. Now I smile with more confidence. Thank you Wafi team!",
    isActive: true,
    createdAt: "2024-07-28T13:30:00Z",
  },
  {
    id: 8,
    patientName: "Bapak Sutrisno",
    rating: 4,
    contentId:
      "Pelayanan bagus, adminnya ramah bantu booking. Dokternya jelas jelasin kondisi gigi dan pilihan perawatannya. Saya cuma scaling dan tambal, hasilnya rapi. Tempat parkirnya agak terbatas tapi overall puas!",
    contentEn:
      "Good service, friendly admin who helped with booking. The doctor clearly explained my dental condition and treatment options. I only did scaling and filling, neat results. Parking is a bit limited but overall satisfied!",
    isActive: true,
    createdAt: "2024-07-10T16:00:00Z",
  },
];

export const blogSeed = [
  {
    id: 1,
    titleId: "Kenapa Gigi Berlubang Bisa Menyebabkan Sakit Kepala?",
    titleEn: "Why Can Cavities Cause Headaches?",
    contentId: `Gigi berlubang adalah masalah gigi yang paling umum terjadi di Indonesia. Namun, tahukah Anda bahwa gigi berlubang yang tidak segera ditangani bisa menyebabkan sakit kepala?

## Hubungan Gigi dan Sakit Kepala

Gigi berlubang yang sudah mencapai lapisan dentin atau bahkan pulpa (saraf gigi) dapat menyebabkan infeksi. Infeksi ini bisa menyebar ke jaringan sekitar gigi dan menyebabkan peradangan yang menjalar ke kepala.

Saraf trigeminal adalah saraf utama yang menghubungkan gigi, rahang, dan wajah ke otak. Ketika ada masalah pada gigi, saraf ini bisa mengirimkan sinyal nyeri yang dirasakan sebagai sakit kepala.

## Gejala yang Perlu Diwaspadai

* Sakit kepala yang terasa berdenyut di satu sisi
* Nyeri saat menggigit atau mengunyah
* Sensitivitas terhadap makanan/minuman panas atau dingin
* Pembengkakan di area pipi atau gusi

## Cara Mencegah

1. Sikat gigi minimal 2x sehari dengan pasta gigi berfluoride
2. Gunakan benang gigi setiap hari
3. Rutin kontrol ke dokter gigi setiap 6 bulan
4. Kurangi makanan dan minuman manis

## Kapan Harus ke Dokter Gigi?

Jika Anda mengalami sakit kepala yang tidak jelas penyebabnya dan disertai gejala gigi, segera konsultasikan ke dokter gigi. Di Wafi Dental Care, tim dokter kami siap membantu mendiagnosis dan menangani masalah gigi Anda.

Jangan tunggu sampai sakit semakin parah! Booking appointment Anda sekarang.`,
    contentEn: `Cavities are the most common dental problem in Indonesia. But did you know that untreated cavities can cause headaches?

## The Connection Between Teeth and Headaches

Cavities that have reached the dentin layer or even the pulp (tooth nerve) can cause infection. This infection can spread to surrounding tissues and cause inflammation that radiates to the head.

The trigeminal nerve is the main nerve connecting teeth, jaw, and face to the brain. When there's a dental problem, this nerve can send pain signals perceived as headaches.

## Symptoms to Watch For

* Throbbing headache on one side
* Pain when biting or chewing
* Sensitivity to hot or cold food/drinks
* Swelling in the cheek or gum area

## Prevention

1. Brush teeth at least 2x daily with fluoride toothpaste
2. Floss daily
3. Regular dental check-ups every 6 months
4. Reduce sugary foods and drinks

## When to See a Dentist?

If you experience unexplained headaches accompanied by dental symptoms, consult a dentist immediately. At Wafi Dental Care, our team is ready to help diagnose and treat your dental problems.

Don't wait until the pain gets worse! Book your appointment now.`,
    excerptId:
      "Tahukah Anda bahwa gigi berlubang yang tidak ditangani bisa menyebabkan sakit kepala? Simak penjelasan lengkapnya di sini.",
    excerptEn:
      "Did you know that untreated cavities can cause headaches? Read the full explanation here.",
    slug: "gigi-berlubang-sakit-kepala",
    image: "/images/blog/cavity-headache.svg",
    categoryId: "Kesehatan Gigi",
    categoryEn: "Dental Health",
    author: "drg. Siti Nuraini, Sp.KG",
    publishedAt: "2024-10-01T08:00:00Z",
    isPublished: true,
  },
  {
    id: 2,
    titleId: "Panduan Lengkap: Scaling Gigi — Apakah Perlu dan Aman?",
    titleEn: "Complete Guide: Dental Scaling — Is It Necessary and Safe?",
    contentId: `Banyak pasien bertanya: "Apakah scaling gigi itu perlu?" atau "Apakah scaling bisa merusak enamel gigi?" Mari kita bahas tuntas!

## Apa Itu Scaling Gigi?

Scaling adalah prosedur pembersihan karang gigi (calculus) dan plak yang menumpuk pada permukaan gigi. Prosedur ini menggunakan alat ultrasonik (scaler) yang bergetar dengan frekuensi tinggi untuk memecah karang gigi, diikuti dengan pembersihan manual.`,
    contentEn: `Many patients ask: "Is dental scaling necessary?" or "Can scaling damage tooth enamel?" Let's discuss this thoroughly!

## What Is Dental Scaling?

Scaling is a procedure to clean tartar (calculus) and plaque that accumulates on tooth surfaces. This procedure uses an ultrasonic scaler that vibrates at high frequencies to break down tartar, followed by manual cleaning.`,
    excerptId: "Scaling gigi — banyak yang takut, tapi apakah benar scaling bisa merusak gigi? Baca panduan lengkapnya.",
    excerptEn: "Dental scaling — many are afraid, but can scaling really damage teeth? Read the complete guide.",
    slug: "panduan-scaling-gigi",
    image: "/images/blog/scaling-guide.svg",
    categoryId: "Perawatan Gigi",
    categoryEn: "Dental Care",
    author: "drg. Maya Puspita",
    publishedAt: "2024-08-20T08:00:00Z",
    isPublished: true,
  },
  {
    id: 3,
    titleId: "Behel vs Clear Aligner: Mana yang Cocok untuk Anda?",
    titleEn: "Braces vs Clear Aligners: Which One Suits You?",
    contentId: `Ingin merapikan gigi tapi bingung pilih behel atau clear aligner? Keduanya memiliki kelebihan dan kekurangan masing-masing. Yuk kita bandingkan!

## Behel Gigi (Braces)

Behel menggunakan bracket yang ditempel pada gigi dan dihubungkan dengan kawat. Kawat ini akan disesuaikan secara berkala untuk menggerakkan gigi ke posisi yang diinginkan.

**Kelebihan:**
* Cocok untuk kasus kompleks (gigi berjejal parah, masalah gigitan)
* Harga lebih terjangkau
* Tidak perlu dilepas-pasang
* Hasil terjamin untuk berbagai kasus

**Kekurangan:**
* Kurang estetik (terlihat saat tersenyum)
* Bisa menyebabkan iritasi di pipi dan bibir
* Ada pantangan makanan tertentu
* Lebih sulit dibersihkan

## Clear Aligner

Aligner adalah tray transparan yang dibuat khusus untuk gigi Anda. Setiap beberapa minggu, Anda mengganti aligner dengan yang baru untuk menggerakkan gigi secara bertahap.

**Kelebihan:**
* Hampir tidak terlihat
* Bisa dilepas saat makan dan sikat gigi
* Lebih nyaman, tidak mengiritasi
* Tidak ada pantangan makanan

**Kekurangan:**
* Harga lebih mahal
* Harus disiplin pakai 20-22 jam/hari
* Tidak cocok untuk kasus yang sangat kompleks

## Kesimpulan

Pilihan antara behel dan clear aligner tergantung pada kondisi gigi, budget, dan gaya hidup Anda. Konsultasikan dengan dokter gigi untuk mendapatkan rekomendasi terbaik.

Di Wafi Dental Care, kami menyediakan konsultasi gratis untuk membantu Anda memilih perawatan orthodonsi yang tepat!`,
    contentEn: `Want to straighten your teeth but confused between braces and clear aligners? Both have their pros and cons. Let's compare!

## Dental Braces

Braces use brackets attached to teeth connected by wires. These wires are periodically adjusted to move teeth to the desired position.

**Pros:**
* Suitable for complex cases (severe crowding, bite problems)
* More affordable
* No need to remove and reinsert
* Guaranteed results for various cases

**Cons:**
* Less aesthetic (visible when smiling)
* May cause irritation to cheeks and lips
* Certain food restrictions
* Harder to clean

## Clear Aligners

Aligner is a custom-made transparent tray for your teeth. Every few weeks, you switch to a new aligner to gradually move teeth.

**Pros:**
* Nearly invisible
* Removable for eating and brushing
* More comfortable, no irritation
* No food restrictions

**Cons:**
* Higher cost
* Must be disciplined wearing 20-22 hours/day
* Not suitable for very complex cases

## Conclusion

The choice between braces and clear aligners depends on your dental condition, budget, and lifestyle. Consult your dentist for the best recommendation.

At Wafi Dental Care, we provide free consultation to help you choose the right orthodontic treatment!`,
    excerptId:
      "Bingung pilih behel atau clear aligner? Simak perbandingan lengkapnya beserta kelebihan dan kekurangan masing-masing.",
    excerptEn:
      "Confused between braces and clear aligners? Read the complete comparison with pros and cons of each.",
    slug: "behel-vs-clear-aligner",
    image: "/images/blog/braces-vs-aligner.svg",
    categoryId: "Perawatan Gigi",
    categoryEn: "Dental Care",
    author: "drg. Ahmad Fauzi, Sp.Ort",
    publishedAt: "2024-07-10T08:00:00Z",
    isPublished: true,
  },
  {
    id: 4,
    titleId: "5 Tips Merawat Gigi Saat Puasa Agar Tetap Sehat dan Segar",
    titleEn: "5 Tips for Dental Care During Fasting to Keep Healthy and Fresh",
    contentId: `Selama berpuasa, produksi air liur berkurang sehingga mulut menjadi lebih kering. Kondisi ini bisa meningkatkan risiko gigi berlubang dan bau mulut.

## Tips 1: Sikat Gigi Setelah Sahur dan Sebelum Tidur

Pastikan Anda menyikat gigi setelah makan sahur — ini pembersihan terakhir sebelum berpuasa seharian. Gunakan pasta gigi berfluoride dan sikat selama minimal 2 menit.

## Tips 2: Gunakan Benang Gigi

Sisa makanan yang terselip di antara gigi bisa menjadi sumber bakteri penyebab bau mulut. Gunakan dental floss setidaknya sekali sehari, idealnya sebelum tidur.`,
    contentEn: `During fasting, saliva production decreases making the mouth drier. This condition can increase the risk of cavities and bad breath.

## Tip 1: Brush Teeth After Suhoor and Before Bed

Make sure to brush your teeth after suhoor — this is your last cleaning before fasting all day. Use fluoride toothpaste and brush for at least 2 minutes.

## Tip 2: Use Dental Floss

Food debris stuck between teeth can become a source of bacteria causing bad breath. Use dental floss at least once daily, ideally before bed.`,
    excerptId: "Berpuasa bukan alasan untuk mengabaikan kesehatan gigi. Ikuti 5 tips perawatan gigi saat puasa ini!",
    excerptEn: "Fasting is not an excuse to neglect dental health. Follow these 5 dental care tips during fasting!",
    slug: "tips-merawat-gigi-puasa",
    image: "/images/blog/fasting-dental-care.svg",
    categoryId: "Tips & Tricks",
    categoryEn: "Tips & Tricks",
    author: "drg. Ratna Dewi",
    publishedAt: "2024-03-01T08:00:00Z",
    isPublished: true,
  },
];
