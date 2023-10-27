// Classe de Erro
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// Classe de Sucesso
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

// Função para criar uma instância de Left
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

// Função para criar uma instância de Right
export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}