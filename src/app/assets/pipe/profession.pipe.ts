import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'professionName',
  standalone: true
})
export class ProfessionNamePipe implements PipeTransform {
  transform(
    professionNo: number,
    professions: any[],
    selectedLanguage: string = 'English'
  ): string {
    if (!professions || professionNo == null) return '';

    const profession = professions.find(p => p.id === professionNo);
    if (!profession) return `Unknown (${professionNo})`;

    const localizedKey = `baslik_loc_${selectedLanguage}`;
    const englishKey = `baslik_loc_English`;

    return profession[localizedKey] || profession[englishKey] || profession.name || `Unknown (${professionNo})`;
  }
}
