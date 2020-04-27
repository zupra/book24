<template lang="pug">
#page
  pre {{ $data }}

  form

    ValidationProvider(
      rules="email" 
      v-slot="{ errors }"
    )
      .field
        .field__title Электронная почта
        input(
          name="email"
          v-model="EMAIL"
          :class="{ 'is-invalid': errors.length }"
        )
        .errors {{ errors[0] }}
    .field
      .field__title ФИО

      .INPUT
        //- ValidationProvider(
        //-   rules="required|alpha" 
        //-   v-slot="{ errors }"
        //- )
        //-   .errors {{ errors[0] }}
        Contenteditable(
          v-model="FIO.LAST_NAME"
          placeholder="Фамилия"
        )
        | &nbsp;
        Contenteditable(
          v-model="FIO.NAME"
          placeholder="Имя"
        )
        | &nbsp;
        Contenteditable(
          v-model="FIO.SECOND_NAME"
          placeholder="Отчество"
        )
      .errors(
        v-if="!(FIO.LAST_NAME && FIO.NAME)"
      ) Нужно указать фамилию и имя

    
    ValidationProvider(
      rules="digits:11" 
      v-slot="{ errors }"
    )
      .field
        .field__title Номер телефона
        input(
          name="phone"
          v-model="PERSONAL_PHONE"
          :class="{ 'is-invalid': errors.length }"
        )
        .errors {{ errors[0] }}
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import Contenteditable from '~/components/Contenteditable.vue'

export default {
  components: {
    ValidationProvider,
    Contenteditable
  },
  data() {
    return {
      FIO: {
        LAST_NAME: '',
        NAME: '',
        SECOND_NAME: ''
      },
      EMAIL: '',
      PERSONAL_PHONE: ''
    }
  },

  methods: {
    async getUserSession() {
      try {
        const { data } = await this.$axios.$get('/user-session/', {
          params: {
            SESSID: '330d207892855dbd5abd5147ea562094',
            TYPE_PLATFORM: 'desktop'
          }
        })
        console.log(data)
      } catch ({ response }) {
        console.log(response.data)
      }
    },

    async postUserSession() {
      try {
        const { data } = await this.$axios.$post('/user-session/', {
          // EMAIL: latyshev1234@book24.ru
          // NAME: Василий
          // LAST_NAME: Латышев
          // SECOND_NAME: Павлович
          // PERSONAL_PHONE: 89168205898
          // AUTHORIZE: Y
        })
        console.log(data)
      } catch ({ response }) {
        console.log(response.data)
      }
    },

    async postUser() {
      try {
        const { data } = await this.$axios.$post('/user/', {
          // LOGIN - логин пользователя
          // PASSWORD - пароль
          // REMEMBER:string (N, Y) - запоминать ли авторизацию.
        })
        console.log(data)
      } catch ({ response }) {
        console.log(response.data)
      }
    },

    async checkEmailAvailability() {
      try {
        const { data } = await this.$axios.$post(
          '/user/check-email-availability/',
          {
            EMAIL: 'latyshev1234@book24.ru123'
          }
        )
        console.log(data)
      } catch ({ response }) {
        console.log(response.data)
      }
    },
    async passwordRecovery() {
      try {
        const { data } = await this.$axios.$post(' /user/password-recovery/', {
          // SESSID: 44673cb5c786ee709b9f3e76923bc6e9
          // TYPE_PLATFORM: desktop
          // LOGIN: vaslatyshev@gmail.com
        })
        console.log(data)
      } catch ({ response }) {
        console.log(response.data)
      }
    }
  }
}
</script>

<style lang="stylus">
$focus = violet;
$text = #8aa4bb;

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
  border: 1px solid $text;
  padding: 0.5em;
  color: $header;

  &:focus {
    border-color: $focus;
  }
}

.is-invalid {
  border-color: red !important;
}

.INPUT {
  color: #000;
  display: flex;
}

form {
  width: 300px;
  margin: auto;
}

.field {
  margin: 1em;
  margin-bottom: 2em;

  &__title {
    font-weight: bold;
  }
}
</style>
