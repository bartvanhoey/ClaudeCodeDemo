"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeNames: Record<string, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    router.replace({ pathname, params }, { locale: nextLocale });
  };

  return (
    <select
      aria-label="Language switcher"
      value={locale}
      onChange={handleChange}
      className="cursor-pointer rounded-md border border-stroke bg-white px-3 py-1.5 text-regular font-medium text-black duration-300 ease-in-out hover:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
