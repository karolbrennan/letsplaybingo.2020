let getLanguageText = (text) => {
  switch (text) {
    case 'ar-SA':
      return 'Arabic (Saudi Arabia)';
    case 'cs-CZ':
      return 'Czech (Czech Republic)';
    case 'da-DK':
      return 'Danish (Denmark)';
    case 'de-DE':
      return 'German';
    case 'el-GR':
      return 'Greek (Greece)';
    case 'en':
      return 'English';
    case 'en-AU':
      return 'English (Australia)';
    case 'en-GB':
      return 'UK English';
    case 'en-IE':
      return 'English (Ireland)';
    case 'en-IN':
      return 'English (India)';
    case 'en-US':
      return 'US English';
    case 'en-ZA':
      return 'English (South Africa)';
    case 'es-AR':
      return 'Spanish (Argentina)';
    case 'es-ES':
      return 'Spanish (Spain)';
    case 'es-MX':
      return 'Spanish (Mexico)';
    case 'es-US':
      return 'Spanish (United States)';
    case 'fi-FI':
      return 'Finnish (Finland)';
    case 'fr-CA':
      return 'French (Canada)';
    case 'fr-FR':
      return 'French (France)';
    case 'he-IL':
      return 'Hebrew';
    case 'hi-IN':
      return 'Hindi (India)';
    case 'hu-HU':
      return 'Hungarian (Hungary)';
    case 'id-ID':
      return 'Indonesian';
    case 'it-IT':
      return 'Italian';
    case 'ja-JP':
      return 'Japanese';
    case 'ko-KR':
      return 'Korean (Korea)';
    case 'nb-NO':
      return 'Norwegian (Bokm?l) (Norway)';
    case 'nl-BE':
      return 'Dutch (Belgium)';
    case 'nl-NL':
      return 'Dutch (Netherlands)';
    case 'pl-PL':
      return 'Polish (Poland)';
    case 'pt-PT':
      return 'Portuguese (Portugal)';
    case 'pt-BR':
      return 'Portuguese (Brazil)';
    case 'ro-RO':
      return 'Romanian (Romania)';
    case 'ru-RU':
      return 'Russian (Russia)';
    case 'sk-SK':
      return 'Slovak (Slovakia)';
    case 'sv-SE':
      return 'Swedish';
    case 'th-TH':
      return 'Thai (Thailand)';
    case 'tr-TR':
      return 'Turkish (Turkey)';
    case 'zh-CN':
      return 'Chinese (S)';
    case 'zh-HK':
      return 'Chinese (Hong Kong)';
    case 'zh-TW':
      return 'Chinese (T)';
    default:
      return text;
  }
};



export {
  getLanguageText
};