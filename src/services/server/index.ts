import { ServerType } from '../../models/constants';
import { LocalStorageService } from '../local-storage';

export class ServerService {
  localStorageService: LocalStorageService;
  host = ServerType.Prism.hostValue;
  port = ServerType.Prism.portValue;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  async getHost() {
    const host = await this.localStorageService.fetch(ServerType.Keys.host);
    return host ?? ServerType.Prism.hostValue;
  }

  async setHost(host: string) {
    this.host = await this.localStorageService.persist(
      ServerType.Keys.host,
      host ?? ServerType.Prism.hostValue
    );
  }
}
