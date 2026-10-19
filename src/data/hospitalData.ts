import { Department, Doctor, Testimonial, HospitalStat, FAQItem, HealthArticle } from '../types';

export const HOSPITAL_STATS: HospitalStat[] = [
  { label: 'Specialized Beds', value: '350+', subtext: 'Including 80 Intensive Care Units' },
  { label: 'Expert Doctors', value: '65+', subtext: 'Board-Certified Specialists' },
  { label: 'Successful Surgeries', value: '18,500+', subtext: 'Minimally Invasive & Advanced' },
  { label: 'Patient Satisfaction', value: '99.2%', subtext: 'Based on 25,000+ Reviews' },
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Center',
    iconName: 'HeartPulse',
    tagline: 'Leading heart care with advanced cath labs and robotic cardiac surgery.',
    shortDescription: 'Comprehensive cardiovascular care ranging from preventive heart checkups to complex valve replacements and angioplasty.',
    fullDescription: 'Our Cardiology & Vascular Institute is a state-of-the-art facility equipped with 24/7 Primary PCI Cath Labs, advanced 3D Echocardiography, and Hybrid Operating Theatres. We specialize in interventional cardiology, electrophysiology, heart failure management, and pediatric cardiac surgeries with outstanding surgical outcomes.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Alexander Vance',
    headDoctorId: 'doc-cardio-1',
    services: [
      '24/7 Emergency Angioplasty (Primary PCI)',
      'Robotic Bypass Surgery (CABG)',
      'Pacemaker & ICD Implantation',
      'Structural Heart Disease (TAVR / MitraClip)',
      'Pediatric Heart Defect Repairs',
      'Preventive Heart Health Screenings'
    ],
    keyFeatures: [
      '2 Dedicated Biplane Cardiac Cath Labs',
      '24/7 Cardiac Care Unit (CCU)',
      'Advanced Electrophysiology Mapping',
      'Non-Invasive Cardiac Imaging Suite'
    ],
    bedsCount: 60,
    opdHours: 'Mon - Sat: 08:00 AM - 08:00 PM (Emergency 24/7)',
    phoneExtension: 'Ext. 401 / 402'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    iconName: 'Brain',
    tagline: 'Precision brain, spine, and nerve treatments powered by 3T MRI technology.',
    shortDescription: 'Expert management for strokes, brain tumors, epilepsy, spinal disorders, and neuro-degenerative conditions.',
    fullDescription: 'The WeCare Neurosciences Institute brings together top neurosurgeons, stroke neurologists, and spine specialists. Utilizing intraoperative MRI, neuro-navigation systems, and robotic spine platforms, we provide gentle, highly effective neurosurgical care and neuro-rehabilitation.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Sophia Chen',
    headDoctorId: 'doc-neuro-1',
    services: [
      'Acute Stroke Thrombolysis & Thrombectomy',
      'Minimally Invasive Spine & Disc Surgery',
      'Brain Tumor Resection (Neuronavigation)',
      'Epilepsy Monitoring & Neurosurgery',
      'Parkinsons & Deep Brain Stimulation (DBS)',
      'Neuro-Rehabilitation & Physical Therapy'
    ],
    keyFeatures: [
      'Dedicated Comprehensive Stroke Center',
      '3.0 Tesla Intraoperative MRI',
      'Neuro-ICU with Continuous EEG Monitoring',
      'Robotic Spine Surgery Suite'
    ],
    bedsCount: 45,
    opdHours: 'Mon - Sat: 08:30 AM - 07:00 PM',
    phoneExtension: 'Ext. 501 / 502'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Health',
    iconName: 'Baby',
    tagline: 'Child-friendly, compassionate healthcare from newborn neonates to young adults.',
    shortDescription: 'Comprehensive pediatric care including Level III NICU, pediatric surgery, vaccinations, and growth development tracking.',
    fullDescription: 'Our Pediatric Center offers a warm, comforting environment for children and parents. Led by experienced pediatricians and pediatric sub-specialists, we manage general pediatric ailments, neonatal critical care, congenital anomalies, and pediatric intensive care (PICU).',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Sarah Jenkins',
    headDoctorId: 'doc-peds-1',
    services: [
      'Level III Neonatal Intensive Care Unit (NICU)',
      'Pediatric Intensive Care Unit (PICU)',
      'Childhood Immunization & Health Checkups',
      'Pediatric Asthma & Allergy Management',
      'Growth & Developmental Milestone Assessment',
      'Pediatric Surgery & Urology'
    ],
    keyFeatures: [
      'Parent-Stay Friendly NICU & PICU Pods',
      'Playful Pediatric Emergency Wing',
      'Dedicated Child Psychology Counselor',
      '24/7 On-Duty Neonatologist'
    ],
    bedsCount: 40,
    opdHours: 'Mon - Sun: 08:00 AM - 08:00 PM',
    phoneExtension: 'Ext. 301 / 302'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    iconName: 'Bone',
    tagline: 'Restoring mobility with robotic joint replacements and sports medicine.',
    shortDescription: 'Advanced orthopedic care for knee/hip joint replacements, sports injuries, fracture trauma, and spinal corrections.',
    fullDescription: 'The Department of Orthopedics & Trauma Surgery at WeCare is renowned for computer-assisted and robotic joint replacement procedures that minimize pain and speed up recovery. From professional athlete sports rehab to complex joint reconstructions, our team restores active lifestyles.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Robert Miller',
    headDoctorId: 'doc-ortho-1',
    services: [
      'Robotic Total Knee & Hip Replacement',
      'Arthroscopic ACL/MCL Knee Surgery',
      'Rotator Cuff & Shoulder Surgery',
      'Complex Fracture & Trauma Reconstruction',
      'Spine Decompression & Fusion',
      'Sports Injury Rehabilitation'
    ],
    keyFeatures: [
      'Mako Robotic Joint Replacement System',
      'Laminar Airflow Orthopedic OTs',
      'Advanced Motion Analysis Lab',
      'Dedicated Inpatient Physiotherapy Center'
    ],
    bedsCount: 50,
    opdHours: 'Mon - Sat: 09:00 AM - 07:30 PM',
    phoneExtension: 'Ext. 601 / 602'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Center',
    iconName: 'Activity',
    tagline: 'Holistic cancer care combining immunotherapy, targeted radiation, and surgical oncology.',
    shortDescription: 'Multi-disciplinary tumor boards, targeted chemotherapy, precision radiation, and surgical oncology with emotional wellness support.',
    fullDescription: 'WeCare Comprehensive Cancer Center delivers evidence-based cancer treatments. Our multi-specialty tumor board reviews each patient case to craft individualized care plans combining surgical precision, chemotherapy, targeted immunotherapy, and TrueBeam linear accelerator radiation therapy.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Jonathan Hayes',
    headDoctorId: 'doc-onco-1',
    services: [
      'Precision Radiation Therapy (IMRT / IGRT)',
      'Chemotherapy & Targeted Immunotherapy Daycare',
      'Minimally Invasive Cancer Surgery',
      'Bone Marrow & Stem Cell Transplant Unit',
      'Cancer Screening & Genetic Counseling',
      'Palliative & Pain Management Care'
    ],
    keyFeatures: [
      'TrueBeam STx Radiation System',
      'Dedicated Daycare Infusion Suite with Recliners',
      'In-House Molecular Pathology Lab',
      'Integrative Psycho-Oncology Support'
    ],
    bedsCount: 45,
    opdHours: 'Mon - Fri: 08:00 AM - 06:00 PM',
    phoneExtension: 'Ext. 701 / 702'
  },
  {
    id: 'obgyn',
    name: 'Obstetrics & Gynecology',
    iconName: 'Users',
    tagline: 'Empowered women’s health, high-risk pregnancy care, and painless deliveries.',
    shortDescription: 'End-to-end maternity care, laparoscopic gynecological surgeries, fertility consultations, and menopause care.',
    fullDescription: 'Our Women’s Health Center is dedicated to supporting women at every stage of life. From routine prenatal visits and comfortable birthing suites to laparoscopic hysterectomies and adolescent gynecology, we offer gentle, respectful, and advanced clinical care.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Victoria Hayes',
    headDoctorId: 'doc-obgyn-1',
    services: [
      'Painless Birthing Suites & LDR Rooms',
      'High-Risk Pregnancy Management',
      'Laparoscopic & Robotic Gynecologic Surgery',
      'Infertility & Reproductive Medicine',
      'PCOS & Hormonal Disorder Clinic',
      'Routine Mammography & Pap Smears'
    ],
    keyFeatures: [
      'Private Labour-Delivery-Recovery (LDR) Suites',
      '4D Fetal Ultrasound Suite',
      'Continuous Fetal Heart Monitoring',
      'Lactation & Postnatal Care Specialists'
    ],
    bedsCount: 35,
    opdHours: 'Mon - Sat: 08:30 AM - 07:00 PM',
    phoneExtension: 'Ext. 201 / 202'
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetic Care',
    iconName: 'Sparkles',
    tagline: 'Expert dermatological treatments for skin, hair, nails, and aesthetic skin therapy.',
    shortDescription: 'Advanced skin condition therapies, laser procedures, acne scar treatments, and cosmetic skin rejuvenation.',
    fullDescription: 'Our Dermatology & Cosmetic Institute offers medical dermatology for complex skin ailments like psoriasis, eczema, and skin cancers alongside state-of-the-art aesthetic procedures performed by board-certified dermatologists.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    headDoctorName: 'Dr. Benjamin Cole',
    headDoctorId: 'doc-derm-1',
    services: [
      'Medical Treatment for Eczema & Psoriasis',
      'Laser Hair Removal & Skin Resurfacing',
      'Acne Scar Revision & Chemical Peels',
      'Hair Loss Treatment & PRP Therapy',
      'Skin Cancer Screening & Biopsy',
      'Anti-Aging Rejuvenation & Fillers'
    ],
    keyFeatures: [
      'US-FDA Approved Cutera Laser Platform',
      'Skin Pathology & Microscopic Analysis',
      'Private Cosmetic Treatment Suites'
    ],
    bedsCount: 15,
    opdHours: 'Mon - Sat: 10:00 AM - 06:30 PM',
    phoneExtension: 'Ext. 101 / 102'
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology Doctors
  {
    id: 'doc-cardio-1',
    name: 'Dr. Alexander Vance',
    title: 'Chief of Cardiology & Cardiac Surgery',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Center',
    specialty: 'Interventional Cardiology & TAVR',
    qualification: 'MD, DM (Cardiology), FACC (USA)',
    experienceYears: 21,
    rating: 4.9,
    reviewCount: 382,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Alexander Vance is a world-renowned interventional cardiologist with over two decades of clinical experience in complex angioplasties, transcatheter aortic valve replacements (TAVR), and heart failure therapies. He has published over 40 research papers on cardiovascular innovation.',
    languages: ['English', 'Spanish'],
    consultationFee: 140,
    roomNumber: 'Block A, Suite 301',
    scheduleDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: {
      morning: ['09:00 AM', '09:30 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
      evening: ['05:00 PM', '05:45 PM', '06:30 PM']
    },
    education: [
      'MD in Internal Medicine - Harvard Medical School',
      'DM in Cardiology - Johns Hopkins University',
      'Fellowship in Interventional Cardiology - Cleveland Clinic'
    ],
    awards: [
      'National Healthcare Leadership Award (2023)',
      'Excellence in Heart Care Award - American Heart Association'
    ]
  },
  {
    id: 'doc-cardio-2',
    name: 'Dr. Elena Rostova',
    title: 'Senior Interventional Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Center',
    specialty: 'Coronary Angioplasty & Vascular Care',
    qualification: 'MD, FESC (Europe)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0d826a7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Elena Rostova specializes in radial artery coronary interventions, acute myocardial infarction management, and preventive cardiology. She is deeply passionate about empowering patients with lifestyle heart health education.',
    languages: ['English', 'Russian', 'German'],
    consultationFee: 120,
    roomNumber: 'Block A, Suite 304',
    scheduleDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    availableSlots: {
      morning: ['09:30 AM', '10:15 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '02:15 PM', '03:45 PM'],
      evening: ['04:30 PM', '05:15 PM']
    },
    education: [
      'MD - Heidelberg University Faculty of Medicine',
      'Cardiology Fellowship - Imperial College London'
    ],
    awards: [
      'Young Cardiologist Research Grant Winner',
      'Compassionate Caregiver Honor (2024)'
    ]
  },
  {
    id: 'doc-cardio-3',
    name: 'Dr. Marcus Brody',
    title: 'Cardiac Electrophysiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Center',
    specialty: 'Arrhythmia & Pacemaker Implantation',
    qualification: 'MD, FHRS',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 188,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Marcus Brody is an expert in heart rhythm disorders, catheter ablations for atrial fibrillation, and implantable defibrillator (ICD) therapies.',
    languages: ['English'],
    consultationFee: 130,
    roomNumber: 'Block A, Suite 308',
    scheduleDays: ['Tue', 'Wed', 'Fri'],
    availableSlots: {
      morning: ['10:00 AM', '11:30 AM'],
      afternoon: ['02:00 PM', '03:15 PM'],
      evening: ['05:00 PM', '06:00 PM']
    },
    education: [
      'MD - Stanford University School of Medicine',
      'Electrophysiology Fellowship - Mayo Clinic'
    ],
    awards: ['Pioneer in AFib Ablation Technology Award']
  },

  // Neurology Doctors
  {
    id: 'doc-neuro-1',
    name: 'Dr. Sophia Chen',
    title: 'Director of Neurosurgery & Brain Health',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    specialty: 'Minimally Invasive Brain & Spine Surgery',
    qualification: 'MD, PhD, FACS',
    experienceYears: 19,
    rating: 5.0,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sophia Chen is a pioneer in endoscopic keyhole neurosurgery and computer-guided brain tumor removals. She leads the Neuro-Oncology Tumor Board at WeCare.',
    languages: ['English', 'Mandarin'],
    consultationFee: 160,
    roomNumber: 'Block B, Suite 201',
    scheduleDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    availableSlots: {
      morning: ['09:00 AM', '10:00 AM', '11:30 AM'],
      afternoon: ['02:00 PM', '03:00 PM'],
      evening: ['04:45 PM', '05:30 PM']
    },
    education: [
      'MD, PhD in Neuroscience - Yale School of Medicine',
      'Neurosurgery Residency - Massachusetts General Hospital'
    ],
    awards: ['Top Neurosurgeon in the Nation (2023, 2024)', 'International Spine Surgery Innovation Medal']
  },
  {
    id: 'doc-neuro-2',
    name: 'Dr. David K. Sterling',
    title: 'Senior Stroke & Epilepsy Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    specialty: 'Acute Stroke & Cognitive Disorders',
    qualification: 'MD, FAAN',
    experienceYears: 16,
    rating: 4.8,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. David Sterling specializes in rapid acute stroke thrombolysis, memory clinics, Parkinsonism care, and complex migraine management.',
    languages: ['English', 'French'],
    consultationFee: 130,
    roomNumber: 'Block B, Suite 205',
    scheduleDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: {
      morning: ['08:30 AM', '09:45 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '02:45 PM'],
      evening: ['04:30 PM', '05:45 PM']
    },
    education: [
      'MD - Columbia University Vagelos College of Physicians',
      'Neurology Residency - NewYork-Presbyterian Hospital'
    ],
    awards: ['Stroke Care Hero Award', 'Outstanding Medical Educator']
  },

  // Pediatrics Doctors
  {
    id: 'doc-peds-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Head of Pediatric Medicine & NICU',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Child Health',
    specialty: 'General Pediatrics & Neonatology',
    qualification: 'MD, FAAP (USA)',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0d826a7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sarah Jenkins is loved by young patients for her playful, empathetic demeanor. She oversees newborn care, child vaccinations, and emergency pediatric interventions.',
    languages: ['English', 'Spanish'],
    consultationFee: 110,
    roomNumber: 'Block C, Suite 101',
    scheduleDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableSlots: {
      morning: ['08:30 AM', '09:15 AM', '10:00 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '02:30 PM', '03:30 PM'],
      evening: ['04:30 PM', '05:30 PM']
    },
    education: [
      'MD - Perelman School of Medicine, UPenn',
      'Pediatric Fellowship - Children Hospital of Philadelphia (CHOP)'
    ],
    awards: ['Best Pediatrician Reader Choice Award', 'Golden Stethoscope Honor']
  },
  {
    id: 'doc-peds-2',
    name: 'Dr. Liam O\'Connor',
    title: 'Pediatric Pulmonology & Allergy Specialist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Child Health',
    specialty: 'Childhood Asthma, Allergies & Sleep Medicine',
    qualification: 'MD, M.Sc (Pediatrics)',
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Liam O\'Connor focuses on managing recurrent respiratory infections, childhood asthma, food allergies, and pediatric sleep disturbances.',
    languages: ['English'],
    consultationFee: 105,
    roomNumber: 'Block C, Suite 105',
    scheduleDays: ['Tue', 'Thu', 'Sat'],
    availableSlots: {
      morning: ['09:00 AM', '10:30 AM'],
      afternoon: ['02:00 PM', '03:15 PM'],
      evening: ['04:30 PM', '05:45 PM']
    },
    education: [
      'MD - Trinity College Dublin',
      'Pediatric Pulmonology Fellowship - Boston Children\'s Hospital'
    ],
    awards: ['Pediatric Asthma Research Excellence Award']
  },
  {
    id: 'doc-peds-3',
    name: 'Dr. Maya Lin',
    title: 'Neonatologist & Pediatric Critical Care',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Child Health',
    specialty: 'Premature Infant Care & NICU Management',
    qualification: 'MD, DM (Neonatology)',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 175,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Maya Lin is dedicated to nurturing premature and critically ill newborns in our Level III NICU, working closely with families through every milestone.',
    languages: ['English', 'Mandarin'],
    consultationFee: 120,
    roomNumber: 'Block C, Suite 108',
    scheduleDays: ['Mon', 'Wed', 'Fri'],
    availableSlots: {
      morning: ['09:30 AM', '11:00 AM'],
      afternoon: ['01:45 PM', '03:00 PM'],
      evening: ['05:00 PM']
    },
    education: [
      'MD - UCSF School of Medicine',
      'Neonatal-Perinatal Medicine Fellowship - UCLA Mattel Children\'s Hospital'
    ],
    awards: ['Preemie Guardian Angel Award']
  },

  // Orthopedics Doctors
  {
    id: 'doc-ortho-1',
    name: 'Dr. Robert Miller',
    title: 'Director of Orthopedics & Joint Reconstruction',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    specialty: 'Robotic Knee & Hip Joint Replacement',
    qualification: 'MS (Orthopedics), M.Ch (UK), FRCS',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 480,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Robert Miller has performed over 5,000 successful joint replacement procedures using robotic navigation. He specializes in rapid-recovery joint replacements.',
    languages: ['English'],
    consultationFee: 140,
    roomNumber: 'Block D, Suite 401',
    scheduleDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: {
      morning: ['09:00 AM', '10:00 AM', '11:15 AM'],
      afternoon: ['02:00 PM', '03:30 PM'],
      evening: ['05:15 PM', '06:00 PM']
    },
    education: [
      'MS Orthopedics - University of Edinburgh',
      'Robotic Arthroplasty Fellowship - Hospital for Special Surgery (HSS NY)'
    ],
    awards: ['Master Surgeon in Joint Replacement (2022)', 'Global Orthopedic Innovator']
  },
  {
    id: 'doc-ortho-2',
    name: 'Dr. Anita Roy',
    title: 'Senior Sports Medicine & Arthroscopy Specialist',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    specialty: 'ACL Knee Reconstruction & Shoulder Arthroscopy',
    qualification: 'MD, Dip. Sports Med (IOC)',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0d826a7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Anita Roy works with professional athletes and active individuals to restore peak joint function following ligament tears and cartilage injuries.',
    languages: ['English', 'Hindi'],
    consultationFee: 125,
    roomNumber: 'Block D, Suite 406',
    scheduleDays: ['Tue', 'Fri', 'Sat'],
    availableSlots: {
      morning: ['09:30 AM', '10:45 AM'],
      afternoon: ['01:30 PM', '02:45 PM'],
      evening: ['04:30 PM', '05:30 PM']
    },
    education: [
      'MD - All India Institute of Medical Sciences (AIIMS)',
      'Sports Medicine Fellowship - University of Pittsburgh Medical Center'
    ],
    awards: ['Official Medical Consultant for Olympic Athletes']
  },

  // Oncology Doctors
  {
    id: 'doc-onco-1',
    name: 'Dr. Jonathan Hayes',
    title: 'Director of Medical Oncology & Clinical Research',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Center',
    specialty: 'Targeted Immunotherapy & Precision Oncology',
    qualification: 'MD, DM (Oncology), FACP',
    experienceYears: 20,
    rating: 5.0,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Jonathan Hayes is a leader in precision cancer medicine, matching tumor genetic profiling with cutting-edge targeted immunotherapies.',
    languages: ['English'],
    consultationFee: 150,
    roomNumber: 'Block E, Suite 102',
    scheduleDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    availableSlots: {
      morning: ['09:00 AM', '10:30 AM'],
      afternoon: ['02:00 PM', '03:15 PM'],
      evening: ['04:30 PM', '05:30 PM']
    },
    education: [
      'MD - Duke University School of Medicine',
      'Oncology Fellowship - MD Anderson Cancer Center'
    ],
    awards: ['Distinguished Oncology Clinical Research Award']
  },
  {
    id: 'doc-onco-2',
    name: 'Dr. Miriam Al-Hassan',
    title: 'Senior Radiation Oncologist',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Center',
    specialty: 'Stereotactic Radiosurgery (SRS) & IMRT',
    qualification: 'MD, FASTRO',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 205,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Miriam Al-Hassan specializes in highly localized radiation therapies that maximize tumor destruction while protecting surrounding healthy tissue.',
    languages: ['English', 'Arabic'],
    consultationFee: 135,
    roomNumber: 'Block E, Suite 106',
    scheduleDays: ['Mon', 'Thu', 'Fri'],
    availableSlots: {
      morning: ['09:30 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '03:00 PM'],
      evening: ['05:00 PM']
    },
    education: [
      'MD - Georgetown University School of Medicine',
      'Radiation Oncology Residency - Memorial Sloan Kettering Cancer Center'
    ],
    awards: ['Humanitarian Care in Radiation Oncology Award']
  },

  // OBGYN Doctors
  {
    id: 'doc-obgyn-1',
    name: 'Dr. Victoria Hayes',
    title: 'Chief of Obstetrics & Women’s Health',
    departmentId: 'obgyn',
    departmentName: 'Obstetrics & Gynecology',
    specialty: 'High-Risk Obstetrics & Painless Delivery',
    qualification: 'MD, FACOG',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 460,
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0d826a7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Victoria Hayes has safely welcomed over 4,000 babies into the world. She specializes in managing high-risk pregnancies, gestational diabetes, and painless birthing techniques.',
    languages: ['English', 'French'],
    consultationFee: 130,
    roomNumber: 'Block F, Suite 202',
    scheduleDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: {
      morning: ['08:30 AM', '09:30 AM', '10:45 AM'],
      afternoon: ['01:30 PM', '02:45 PM'],
      evening: ['04:30 PM', '05:30 PM']
    },
    education: [
      'MD - Northwestern University Feinberg School of Medicine',
      'Obstetrics & Gynecology Residency - Prentice Women\'s Hospital'
    ],
    awards: ['Women Health Champion Award', 'Gentle Birthing Excellence Honor']
  },
  {
    id: 'doc-obgyn-2',
    name: 'Dr. Rachel Adams',
    title: 'Gynecological Laparoscopic Surgeon',
    departmentId: 'obgyn',
    departmentName: 'Obstetrics & Gynecology',
    specialty: 'Keyhole Gynecological Surgery & Endometriosis Care',
    qualification: 'MD, FICS',
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Rachel Adams is an expert in minimally invasive laparoscopic treatments for fibroids, ovarian cysts, severe endometriosis, and uterine conditions.',
    languages: ['English', 'Spanish'],
    consultationFee: 120,
    roomNumber: 'Block F, Suite 208',
    scheduleDays: ['Tue', 'Fri', 'Sat'],
    availableSlots: {
      morning: ['09:00 AM', '10:15 AM'],
      afternoon: ['02:00 PM', '03:15 PM'],
      evening: ['05:00 PM', '06:00 PM']
    },
    education: [
      'MD - Baylor College of Medicine',
      'Minimally Invasive Gynecologic Surgery Fellowship - Mayo Clinic'
    ],
    awards: ['Excellence in Laparoscopic Surgery Award']
  },

  // Dermatology Doctors
  {
    id: 'doc-derm-1',
    name: 'Dr. Benjamin Cole',
    title: 'Consultant Dermatologist & Cosmetologist',
    departmentId: 'dermatology',
    departmentName: 'Dermatology & Cosmetic Care',
    specialty: 'Clinical Dermatology & Aesthetic Laser Therapy',
    qualification: 'MD (Dermatology), FAAD',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Benjamin Cole provides comprehensive care for skin diseases alongside customized laser skin treatments, anti-aging therapies, and hair restoration.',
    languages: ['English'],
    consultationFee: 115,
    roomNumber: 'Block G, Suite 101',
    scheduleDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    availableSlots: {
      morning: ['10:00 AM', '11:00 AM'],
      afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['05:15 PM', '06:00 PM']
    },
    education: [
      'MD - NY Grossman School of Medicine',
      'Dermatology Residency - NYU Langone Health'
    ],
    awards: ['Top Aesthetic Dermatologist Award']
  },
  {
    id: 'doc-derm-2',
    name: 'Dr. Hannah Meyer',
    title: 'Dermatopathologist & Cutaneous Oncology Specialist',
    departmentId: 'dermatology',
    departmentName: 'Dermatology & Cosmetic Care',
    specialty: 'Skin Cancer Screening & Mohs Micrographic Surgery',
    qualification: 'MD, FCAP',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0d826a7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Hannah Meyer is dedicated to early detection and precision surgical removal of skin lesions, melanoma, and non-melanoma skin cancers.',
    languages: ['English', 'German'],
    consultationFee: 120,
    roomNumber: 'Block G, Suite 105',
    scheduleDays: ['Wed', 'Fri'],
    availableSlots: {
      morning: ['09:30 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '03:00 PM'],
      evening: ['04:30 PM']
    },
    education: [
      'MD - Charité Universitätsmedizin Berlin',
      'Dermatopathology Fellowship - Harvard Medical School'
    ],
    awards: ['Skin Health Preservation Pioneer Medal']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Marcus Sterling',
    patientAge: 52,
    department: 'Cardiology & Heart Center',
    doctorName: 'Dr. Alexander Vance',
    rating: 5,
    quote: 'The emergency angioplasty team at WeCare saved my life within 40 minutes of my arrival.',
    story: 'I experienced sudden severe chest pressure at 2 AM. The ambulance brought me straight to WeCare Hospitals. Dr. Vance and his team performed a primary PCI immediately. The care, warmth, and post-op rehabilitation were nothing short of exemplary.',
    date: 'July 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    patientName: 'Claire & Baby Noah',
    patientAge: 31,
    department: 'Pediatrics & NICU Care',
    doctorName: 'Dr. Sarah Jenkins & Dr. Maya Lin',
    rating: 5,
    quote: 'When Noah was born prematurely at 30 weeks, WeCare NICU was our sanctuary of hope.',
    story: 'The NICU staff not only cared for our fragile baby with world-class technology but also guided us as new parents with immense empathy. Today, Noah is a healthy, laughing 1-year-old!',
    date: 'June 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-3',
    patientName: 'Eleanor Vance',
    patientAge: 68,
    department: 'Orthopedics & Joint Replacement',
    doctorName: 'Dr. Robert Miller',
    rating: 5,
    quote: 'I am back to walking 5 kilometers every morning pain-free after my robotic knee surgery.',
    story: 'Severe osteoarthritis made every step painful for years. Dr. Miller performed robotic total knee replacement. I stood up on day 1 post-op, and within 3 weeks I was back to my favorite daily walks.',
    date: 'May 19, 2026',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-4',
    patientName: 'David Thompson',
    patientAge: 44,
    department: 'Neurology & Neurosurgery',
    doctorName: 'Dr. Sophia Chen',
    rating: 5,
    quote: 'Keyhole brain surgery sounded terrifying, but Dr. Chen made me feel entirely confident.',
    story: 'Dr. Chen successfully removed a pituitary tumor endoscopically through my nasal passage. Zero facial incisions, rapid recovery, and my eyesight was completely restored!',
    date: 'August 02, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'Appointment',
    question: 'How do I schedule or reschedule an online appointment?',
    answer: 'You can book directly on our website using the "Book Appointment" feature. Select your desired department, choose a specialist, and pick an available date and time slot. You can also reschedule or cancel using your Appointment Reference Code in "My Appointments".'
  },
  {
    category: 'Emergency',
    question: 'What emergency facilities are available 24/7 at WeCare?',
    answer: 'WeCare Emergency & Trauma Center operates 24/7 with a dedicated biplane Cath Lab, Level I Trauma Surgeons, 24/7 Blood Bank, Advanced Cardiac Ambulances, and emergency ICU beds.'
  },
  {
    category: 'Insurance',
    question: 'Which health insurance providers and TPA partners are accepted?',
    answer: 'WeCare Hospitals partners with all major international and national health insurance networks, including BlueCross, Aetna, Cigna, UnitedHealthcare, Medicare, Allianz, and Bupa. Cashless approval desks are open 24/7 in the main lobby.'
  },
  {
    category: 'General',
    question: 'What are the visiting hours for inpatient wards and ICUs?',
    answer: 'General Ward visiting hours are 04:00 PM – 07:00 PM daily. ICU visiting hours are strictly restricted to 11:00 AM – 12:00 PM and 05:00 PM – 06:00 PM for one nominated family member at a time.'
  },
  {
    category: 'Appointment',
    question: 'What should I bring for my first consultation?',
    answer: 'Please bring a valid photo ID, your insurance card, list of current medications, and any prior medical records, X-rays, lab reports, or discharge summaries related to your visit.'
  }
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    title: '5 Warning Signs of Cardiovascular Risk You Should Never Ignore',
    category: 'Heart Health',
    readTime: '4 min read',
    date: 'August 01, 2026',
    summary: 'Chest tightness, unexplained breathlessness, cold sweats, and jaw discomfort can signal underlying heart distress. Learn early preventive actions.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Alexander Vance'
  },
  {
    id: 'art-2',
    title: 'Post-Robotic Joint Surgery: Tips for a Faster Recovery',
    category: 'Orthopedics',
    readTime: '5 min read',
    date: 'July 24, 2026',
    summary: 'How robotic guidance minimizes tissue trauma, allowing patients to walk sooner and regain full joint mobility safely.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Robert Miller'
  },
  {
    id: 'art-3',
    title: 'Nurturing Infant Immunity during Seasonal Flu Shifts',
    category: 'Pediatrics',
    readTime: '3 min read',
    date: 'July 15, 2026',
    summary: 'Essential guidance for parents on childhood vaccinations, hydration, indoor air filtration, and fever management.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Sarah Jenkins'
  }
];

export const SYMPTOM_HELPERS = [
  { symptom: 'Chest Pain, Breathlessness or Palpitations', departmentId: 'cardiology', name: 'Cardiology' },
  { symptom: 'Frequent Headaches, Dizziness or Memory Loss', departmentId: 'neurology', name: 'Neurology' },
  { symptom: 'Joint Pain, Back Ache or Mobility Stiffness', departmentId: 'orthopedics', name: 'Orthopedics' },
  { symptom: 'Child Fever, Cough or Growth Concerns', departmentId: 'pediatrics', name: 'Pediatrics' },
  { symptom: 'Pregnancy Care, Period Irregularity or Pelvic Pain', departmentId: 'obgyn', name: 'Obstetrics & Gynecology' },
  { symptom: 'Skin Rash, Acne, Hair Loss or Moles', departmentId: 'dermatology', name: 'Dermatology' },
  { symptom: 'Unexplained Weight Loss or Lump Formation', departmentId: 'oncology', name: 'Oncology' },
];
