export interface ICryptoService {
  encrypt(text: string): Promise<string>;
  decrypt(text: string): Promise<string>;
}
