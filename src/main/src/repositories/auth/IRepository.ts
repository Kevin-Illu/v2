import { User } from '$globalTypes/models'

export interface IRepository {
  register(user: any): Promise<boolean>
  getUser(): Promise<User | null>
}
