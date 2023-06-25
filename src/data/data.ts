import {
  IoSchoolSharp,
  FaTelegram,
  AiFillInstagram,
  BsFacebook,
  FaUniversity,
} from "react-icons/all";
import { IoLogoWhatsapp } from "react-icons/io";
const studentColor: string = "#2dc1e4";
const masterColor: string = "#ffa852";
export type clinicType = {
  info: string;
  deg: string;
  icon: any;
  color: string;
  extra?: boolean;
  collections?: string;
  checked?: boolean;
};
export type social = {
  icon: any;
  address: string;
  color: string;
};
export const firstClinic: clinicType[] = [
  {
    info: "تقليح",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "تسوية",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "جراحة لثوية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "تصبغات لثوية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const secondClinic: clinicType[] = [
  {
    info: "تعويض جزئي بدون ضياع عضة",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "تعويض كامل فك واحد",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "تعويض كامل فكين",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "تعويض جزئي مع ضياع عضة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "تعويض متحرك فوق زرعات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const thirdClinic: clinicType[] = [
  {
    info: "دعامة مفردة",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "جسر خلفي",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "قلب و وتد",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "جسر أمامي",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "فينيرات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "تعويض ثابت فوق زرعات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "إعادة تأهيل فموي",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "وجوه تجميلية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const fourthClinic: clinicType[] = [
  {
    info: "سن حي",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "سن عفن",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "إعادة معالجة السن بقناة واحدة",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "إعادة معالجة السن بعدة أقنية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "أداة مكسورة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "انثقابات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "جراحة ذروية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const fifthClinic: clinicType[] = [
  {
    info: "صنف",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "fiber bost",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "واسعة تهدم",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "فينيرات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "وجوه تجميلية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "إزالة تصبغات الأسنان",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const viClinic: clinicType[] = [
  {
    info: "مداواة محافظة",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "بتر لب",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    collections: "رقم السن",
    checked: false,
  },
  {
    info: "حافظة مسافة",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "لبية لسن  مؤقت",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    checked: false,
  },
  {
    info: "طفل غير متعاون",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "لبية سن دائم غير مكتمل الذروة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "نخور معممة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const viiClinic: clinicType[] = [
  {
    info: "قلع",
    deg: "طالب",
    icon: IoSchoolSharp,
    color: studentColor,
    extra: true,
    checked: false,
    collections: "رقم السن",
  },
  {
    info: "قلع جراحي",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "أكياس",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "أورام",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "كسور فك",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "رفع قاع الجيب الفكي",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "زرعات",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const viiiClinic: clinicType[] = [
  {
    info: "اضطرابات المفصل الصغي",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "اضطرابات الغدد اللعابية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "اضطرابات الجيوب الفكية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "اضطرابات العضلات الماضغة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "آفات الأغشية المخاطية",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "آفات اللسان",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "آفات الألجمة",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
  {
    info: "التقويم",
    deg: "ماستر",
    icon: FaUniversity,
    color: masterColor,
    checked: false,
  },
];
export const toothOptions = [
  {
    name: "فك علوي أيمن",
    value: "1",
    options: [11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    name: "فك علوي أيسر",
    value: "2",
    options: [21, 22, 23, 24, 25, 26, 27, 28],
  },
  {
    name: "فك سفلي أيسر",
    value: "3",
    options: [31, 32, 33, 34, 35, 36, 37, 38],
  },
  {
    name: "فك سفلي أيمن",
    value: "4",
    options: [41, 42, 43, 44, 45, 46, 47, 48],
  },
];
export const social: social[] = [
  {
    icon: BsFacebook,
    address: "Facebook Account",
    color: "#4267B2",
  },
  {
    icon: AiFillInstagram,
    address: "Instagram Account",
    color: "#cd486b",
  },
  {
    icon: IoLogoWhatsapp,
    address: "+963967224804",
    color: "#25D366",
  },
  {
    icon: FaTelegram,
    address: "+963967224804",
    color: "#0088CC",
  },
];
export const clinicsNames = [
  "التشخيص",
  "لثة",
  "متحركة",
  "ثابتة",
  "لبية",
  "ترميمية",
  "أطفال",
  "تخدير و قلع",
  "طب الفم و التقويم",
];
