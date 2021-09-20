import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storagePrefix;
  constructor() {
    this.storagePrefix = 'daisochem_';
  }

  setObject(key: string, value: object) {
    localStorage.setItem(this.storagePrefix + key, JSON.stringify(value));
  }

  setValue(key: string, value: string) {
    localStorage.setItem(this.storagePrefix + key, value);
  }

  getObject(key: string): object {
    return JSON.parse(localStorage.getItem(this.storagePrefix + key));
  }

  getValue(key: string): string {
    return localStorage.getItem(this.storagePrefix + key);
  }
}
