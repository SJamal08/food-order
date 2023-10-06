export function firstLetterInUpper(chaine: string) {
    if (!chaine) {
      return chaine;
    }
  
    return chaine.charAt(0).toUpperCase() + chaine.slice(1);
  }

  export function getPropertiesNameFromObject(obj: object): string[] {
    if (obj && typeof obj === 'object') {
      return Object.keys(obj);
      }
    return [];
  }

  export function getValuesArrayFromObject(obj: object): string[] {
    if (obj && typeof obj === 'object') {
      return Object.values(obj);
      }
    return [];
  }