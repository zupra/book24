<template lang="pug">
#page

  //- pre {{ $data }}

  .Form

    ValidationProvider(
      rules="email" 
      v-slot="{ errors }"
    )
      .field
        .field__title Электронная почта
        
        input(
          name="email"
          v-model="EMAIL"
          :class="[{ 'is-invalid': errors.length }, { 'is-valid': EMAIL && !errors.length }]"
          @change="!errors.length && checkEmail()"
          v-on:dblclick="!errors.length && checkEmail()"
        )
        .errors {{ errors[0] }}


    div(
      v-show="emailAvailable"
    )
      .field
        .field__title ФИО

        .INPUT(
          :class="{ 'is-valid': FIO.LAST_NAME && FIO.NAME }"
        )
          ValidationProvider(
            rules="required|alpha" 
            v-slot="{ errors }"
          )
            Contenteditable(
              name="last_name"
              v-model="FIO.LAST_NAME"
              placeholder="Фамилия"
            )
          | &nbsp;
          Contenteditable(
            name="name"
            v-model="FIO.NAME"
            placeholder="Имя"
          )
          | &nbsp;
          Contenteditable(
            name="second_name"
            v-model="FIO.SECOND_NAME"
            placeholder="Отчество"
          )
        .errors(
          v-if="!(FIO.LAST_NAME && FIO.NAME)"
        ) Нужно указать фамилию и имя

      .field
        .field__title Номер телефона
        TheMask(
          name="phone"
          v-model="PERSONAL_PHONE",
          mask="# (###) ### ## ##",
          placeholder="# (###) ### ## ##"
          :class="{ 'is-valid': PERSONAL_PHONE.length === 11 }"
        )
      
      .btn(
        :disabled="!(FIO.LAST_NAME && FIO.NAME && PERSONAL_PHONE)"
        @click="postUser()"
      ) Зарегистрироваться

  #footer Сначала показываем одно поле email, пользователь вводит Email, мы проверяем его. Если Email доступен для регистрации, то пользователю показываются оставшиеся поля... 
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { TheMask } from 'vue-the-mask'
import Contenteditable from '~/components/Contenteditable.vue'

export default {
  components: {
    ValidationProvider,
    Contenteditable,
    TheMask
  },
  data() {
    return {
      FIO: {
        LAST_NAME: '',
        NAME: '',
        SECOND_NAME: ''
      },
      EMAIL: '',
      PERSONAL_PHONE: '',
      emailAvailable: false
    }
  },

  watch: {
    EMAIL() {
      this.emailAvailable = false
      this.$toast.clear(this.$toast)
      // console.dir(this.$toast.clear(this.$toast))
    }
  },

  methods: {
    async postUser() {
      try {
        const { DATA } = await this.$axios.$post('/user/', {
          ...this.FIO,
          EMAIL: this.EMAIL,
          PERSONAL_PHONE: this.PERSONAL_PHONE,
          AUTHORIZE: 'Y'
        })
        this.$toast.success(
          `Зарегистрирован новый пользователь с ID = ${DATA.USER_ID}`,
          { duration: 3000 }
        )
      } catch ({ response }) {
        this.$toast.error('Ошибка', { duration: 3000 })
      }
    },

    async checkEmail() {
      try {
        await this.$axios.$post('/user/check-email-availability/', {
          EMAIL: this.EMAIL
        })
        this.$toast.success(`EMAIL ${this.EMAIL} доступен для регистрации`, {
          duration: 3000
        })

        this.emailAvailable = true
      } catch ({ response }) {
        this.$toast.error(response.data.errors[0].message)
      }
    }

    /*
    async getUserSession() {
      try {
        await this.$axios.$get('/user-session/', {
          params: {
            SESSID: '330d207892855dbd5abd5147ea562094',
            TYPE_PLATFORM: 'desktop'
          }
        })
        this.$toast.success('Успешно')
      } catch ({ response }) {
        this.$toast.error('Ошибка')
      }
    },
    async postUserSession() {
      try {
        await this.$axios.$post('/user-session/', {
          // LOGIN - логин пользователя
          // PASSWORD - пароль
          // REMEMBER:string (N, Y) - запоминать ли авторизацию.
        })
        this.$toast.success('Успешно')
      } catch ({ response }) {
        this.$toast.error('Ошибка')
      }
    },
    async passwordRecovery() {
      try {
        await this.$axios.$post(' /user/password-recovery/', {
          // SESSID: 44673cb5c786ee709b9f3e76923bc6e9
          // TYPE_PLATFORM: desktop
          // LOGIN: vaslatyshev@gmail.com
        })
        this.$toast.success('Успешно')
      } catch ({ response }) {
        this.$toast.error('Ошибка')
      }
    }
    */
  }
}
</script>

<style lang="stylus">
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #222;
  color: #FFF;
  padding: 1em;
  font-size: 0.8rem;
}

#page {
  height: 100vh;
  user-select: none;
  display: flex;
}

.Form {
  width: 300px;
  margin: auto;
}

$clr_1 = #9555af;
$clr_2 = #8aa4bb;

[contenteditable=true] {
  outline: 0;
}

input, .INPUT {
  width: 100%;
  // RESET
  line-height: 1;
  outline: 0;
  box-shadow: none;
  font: inherit;
  appearance: none;
  // 
  border-radius: 3px;
  border: 1px solid $clr_2;
  padding: 0.6em 1em;
  color: $header;

  &:focus {
    border-color: $clr_1;
  }
}

.is-invalid {
  border-color: red !important;
}

.is-valid {
  border-color: green !important;
}

.INPUT {
  color: #000;
  display: flex;
  overflow: hidden;
}

.field {
  margin: 1em 0;
  margin-bottom: 2em;

  &__title {
    font-weight: bold;
  }
}

.errors {
  font-size: 0.8rem;
  color: red;
}

// BUTTON
$reset() {
  /* сброс стилей */
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  /* небольшие вертикальные отступы */
  /* сброс браузерных стилей для фокуса */
  outline: none;
  user-select: none;
}

/* сброс браузерных стилей для фокуса */
.btn::-moz-focus-inner {
  border: none;
}

.btn {
  $reset();
  /* переопределение стилей для ссылок */
  text-align: center;
  text-decoration: none;
  /* невидимая рамка */
  border: solid 1px transparent;
  border-radius: 4px;
  /* для установки размеров используем паддинги */
  padding: 0.6em 1em;
  /* контрастные цвета */
  color: #ffffff;
  background-color: $clr_1;

  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }

  // .btn:focus
  &:hover {
    color: $clr_1;
    border-color: currentColor;
    background-color: white;
    // background-color #2b2b2b
  }
}

[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
