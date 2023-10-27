export interface PhotosRepository {
  findById(id: string): Promise<any>
  delete(photo: any): Promise<void>
}