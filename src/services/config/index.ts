import { ConfigType } from '../../models/constants/config';
import { LocalStorageService } from '../local-storage';

export class ConfigService {
  localStorageService: LocalStorageService;
  isDemo = true;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  async setDemo(demoMode: boolean): Promise<void> {
    await this.localStorageService.persist(ConfigType.Keys.demo, String(demoMode));
    this.isDemo = demoMode;
  }

  async getDemo(): Promise<boolean> {
    const isDemo = await this.localStorageService.fetch(ConfigType.Keys.demo);
    this.isDemo = isDemo === "true";
    return isDemo === "true";
  }
}
