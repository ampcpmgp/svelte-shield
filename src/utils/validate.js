import * as Validation from '../const/Validation'
import * as MaxSize from '../const/MaxSize'

export class ValidationError extends Error {
  constructor({ message, type }) {
    super(message)

    this.type = type
  }
}

export function content(content) {
  if (content.length > MaxSize.CONTENT) {
    throw new ValidationError({
      message: `最大文字数は${MaxSize.CONTENT}です。`,
      type: Validation.SIZE_OVER,
    })
  }
}
