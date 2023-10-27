import { Either, left, right } from '../core/either'
import { PhotosRepository } from '../repositories/photos-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeletePhotoUseCaseRequest {
  photoId: string
  authorId: string
}

type DeletePhotoUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeletePhotoUseCase {
  constructor(private photosRepository: PhotosRepository) {}

  async execute({
    photoId,
    authorId,
  }: DeletePhotoUseCaseRequest): Promise<DeletePhotoUseCaseResponse> {
    const photo = await this.photosRepository.findById(photoId)

    if (!photo) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== photo.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.photosRepository.delete(photo)

    return right({})
  }
}
