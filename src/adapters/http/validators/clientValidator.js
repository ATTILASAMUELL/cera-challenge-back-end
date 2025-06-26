import { body, param, validationResult } from 'express-validator'
import { validateCPF, normalizeCPF } from '../../../utils/cpf.js'
import mongoose from 'mongoose'

const idParam = param('id')
  .custom(id => mongoose.Types.ObjectId.isValid(id))
  .withMessage('ID inválido')

export const createClientRules = [
  body('nome').isString().notEmpty(),
  body('cpf')
    .custom(validateCPF)
    .withMessage('CPF inválido')
    .bail()
    .customSanitizer(normalizeCPF),
  body('contato.email').isEmail(),
  body('endereco.cep').matches(/^\d{5}-\d{3}$/),
  (req, res, next) => {
    const errors = validationResult(req)
    return errors.isEmpty()
      ? next()
      : res.status(400).json({ errors: errors.array() })
  }
]

export const updateClientRules = [
  idParam,
  body('cpf')
    .optional()
    .custom(validateCPF)
    .withMessage('CPF inválido')
    .bail()
    .customSanitizer(normalizeCPF),
  body('contato.email').optional().isEmail(),
  body('endereco.cep').optional().matches(/^\d{5}-\d{3}$/),
  (req, res, next) => {
    const errors = validationResult(req)
    return errors.isEmpty()
      ? next()
      : res.status(400).json({ errors: errors.array() })
  }
]
