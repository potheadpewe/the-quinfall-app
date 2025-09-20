import { Component, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from './assets/material-imports';
import { Language, Item, Profession, Material, Prop } from './assets/models';
import { ItemService } from '../services';
import { forkJoin } from 'rxjs';
import { ProfessionNamePipe } from './assets/pipe/profession.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...MATERIAL_IMPORTS, ProfessionNamePipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit {
  items: Item[] = [];
  props: Prop[] = [];
  materials: Material[] = [];
  languages: Language[] = [];
  professions: Profession[] = [];

  isLoading = true;
  hasError = false;
  errorMessage: string | null = null;

  selectedLanguage = 'English';
  placeholderIcon = 'assets/default-icon.png';

  itemSearchText: string = '';
  propSearchText: string = '';
  materialSearchText: string = '';

  constructor(private itemService: ItemService) {}
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';
  ngOnInit(): void {
    this.isLoading = true;
    this.hasError = false;
    forkJoin({
      items: this.itemService.loadAllChunks<Item>('items'),
      props: this.itemService.loadAllChunks<Prop>('props'),
      materials: this.itemService.loadAllChunks<Material>('materials'),
      languages: this.itemService.loadAllChunks<Language>('languages'),
      professions: this.itemService.loadAllChunks<Profession>('professions'),
    }).subscribe({
      next: ({ items, props, materials, languages, professions }) => {
        this.items = items;
        this.props = props;
        this.materials = materials;
        this.languages = languages;
        this.professions = professions;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load data';
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  getIcon(entry: any): string {
    if (!entry || !entry.icons) {
      return this.placeholderIcon;
    }
    return entry.icons.icon2 || entry.icons.icon1 || this.placeholderIcon;
  }

  get filteredItems() {
    if (!this.itemSearchText || this.itemSearchText.trim() === '') 
      return this.items;
    return this.items.filter(item => {
      const name = item['baslik_loc_' + this.selectedLanguage] || item.baslik_loc_English || '';
      return name.toLowerCase().includes(this.itemSearchText.toLowerCase());
    });
  }

  get filteredProps() {
    if (!this.propSearchText || this.propSearchText.trim() === '') 
      return this.props;
    return this.props.filter(pro => {
      const name = pro['baslik_loc_' + this.selectedLanguage] || pro.baslik_loc_English || '';
      return name.toLowerCase().includes(this.propSearchText.toLowerCase());
    });
  }

  get filteredMaterials() {
    if (!this.materialSearchText || this.materialSearchText.trim() === '')
      return this.materials;
    return this.materials.filter(material => {
      const name = material['baslik_loc_' + this.selectedLanguage] || material.baslik_loc_English || '';
      return name.toLowerCase().includes(this.materialSearchText.toLowerCase());
    });
  }

  onMaterialSearchChange(searchValue: string) {
    this.materialSearchText = searchValue;
  }
}
