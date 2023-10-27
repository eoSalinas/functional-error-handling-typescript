import { PhotosRepository } from '../repositories/photos-repository'

interface DeletePhotoUseCaseRequest {
  photoId: string
  authorId: string
}

interface DeletePhotoUseCaseResponse {}

export class DeletePhotoUseCase {
  constructor(private photosRepository: PhotosRepository) {}

  async execute({
    photoId,
    authorId,
  }: DeletePhotoUseCaseRequest): Promise<DeletePhotoUseCaseResponse> {
    const photo = await this.photosRepository.findById(photoId)

    if (!photo) {
      throw new Error('Photo not found.')
    }

    if (authorId !== photo.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.photosRepository.delete(photo)

    return {}
  }
}
