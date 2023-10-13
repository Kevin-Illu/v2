export interface IRepository {
  authenticate(user: any): Promise<boolean>
  isAuthenticated(): Promise<boolean>
}
