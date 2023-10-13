export interface IRepository {
  isLogged(): Promise<boolean>
}
