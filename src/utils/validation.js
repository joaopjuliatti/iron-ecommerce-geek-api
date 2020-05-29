const joi = require('joi');

const nameRegex = /^[a-zA-z]/
const phoneRegex = /^\(\d{2,3}\)\d{4,5}-\d{4}$/;

const validation = (field, min, max, mask) => ({
  language: {
    any: {
      required: `${field} é Obrigatório`,
      empty: `${field} é Obrigatório`,
    },
    string: {
      min: `${field}: campo de no mínimo ${min} caracteres`,
      required: `${field} é Obrigatório`,
      max: `${field}: campo de no máximo ${max} caracteres`,
      email: 'Necessário um e-mail válido',
      base: `${field}: campo do tipo string`,
      regex: {
        base: mask ? `Necessário enviar o campo na máscara ${mask}` : '',
      },
    },
    number: {
      base: `${field}: Campo do tipo numérico`,
    },
  },
});

const name = joi.string()
  .required()
  .min(3)
  .max(100)
  .regex(nameRegex)
  .options(validation('Nome', 3, 100, 'Somente letras maiúsculas ou minúsculas'));

const email = joi.string()
  .required()
  .email()
  .options(validation('Email', undefined, undefined, 'example@example.com.br'));

const password = joi.string()
  .required()
  .min(5)
  .max(100)
  .options(validation('Senha', 5, 100));

const telephone = joi.string()
  .required()
  .regex(phoneRegex)
  .options(validation('Telefone', undefined, undefined, '(99)99999-9999'));

module.exports = {
  name,
  email,
  password,
  telephone,
}