import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from 'locales/en'
import fr from 'locales/fr'
import { GLOBAL_VARIABLES } from 'config/constants/globalVariables'

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: GLOBAL_VARIABLES.LANGUAGES.SHORT.EN,
  fallbackLng: GLOBAL_VARIABLES.LANGUAGES.SHORT.EN,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
