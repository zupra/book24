import { extend } from 'vee-validate'
import { required, alpha } from 'vee-validate/dist/rules'

// extend('required', {
//   ...required,
//   message: 'Обязательно'
// })

// extend('alpha', {
//   ...alpha,
//   message: 'Только буквы' // 'This field must only contain alphabetic characters'
// })

import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

// with typescript
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

// import { localize } from 'vee-validate'
// import ru from 'vee-validate/dist/locale/ru.json'
// localize('ru', ru)
// localize('ru')
