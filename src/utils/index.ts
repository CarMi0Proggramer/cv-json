import type { CV } from "@/cv";

export type Lang = "es" | "pt-br" | "en";

const languages: Lang[] = ["es", "pt-br", "en"];
const defaultLang: Lang = "es";

const headers = {
  es: {
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    education: "Educación",
    certificates: "Certificados",
    about: "Sobre mí",
  },
  "pt-br": {
    experience: "Experiência",
    skills: "Habilidades",
    projects: "Projetos",
    education: "Educação",
    certificates: "Certificações",
    about: "Sobre mim",
  },
  en: {
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    certificates: "Certificates",
    about: "About me",
  },
};

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (languages.includes(lang as Lang)) return lang as Lang;

  return defaultLang;
}

export async function useCV(lang: Lang): Promise<CV> {
  if (!languages.includes(lang)) {
    throw new Error(`CV not found for lang: ${lang}`);
  }

  const cv = await import(`../data/cv/${lang}.json`);
  return cv;
}

export function useHeadersTranslations(lang: Lang) {
  return headers[lang];
}
