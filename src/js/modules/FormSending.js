import { body } from '../helpers/elementsNodeList';
import toggleBodyLock from '../helpers/toggleBodyLock';

class FormSending {
  errorCount = 0;

  constructor(selector, options = {}) {
    const defaultOptions = {
      timeToDelete: 3000,
      emailRegex: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/,
      actionEndpoint: './../files/php/sendTelegram.php',
      errorMessages: {
        missingFormFields: 'Ошибка: отсутствует форма или обязательные поля',
        emptyRequiredFields: 'Заполните обязательные поля',
        genericError: 'Произошла какая-то ошибка',
      },
    };

    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.form = document.querySelector(selector);
    this.email = this.form.querySelector('._email');
    this.mandatoryInputs = Array.from(this.form.querySelectorAll('._req'));
    this.inputsToValidate = this.mandatoryInputs
      .concat(this.email)
      .filter((input) => input !== null);

    this.init();
    this.events();
  }

  init() {
    // Проверка наличия формы и обязательных полей
    if (!this.form || !this.inputsToValidate[0]) {
      console.log(this.options.errorMessages.missingFormFields);
      //this.showModal(this.options.errorMessages.missingFormFields);
      return;
    }

    // Дополнительные действия или настройки, если требуется

    // Установка обработчика события отправки формы
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  events() {
    /** Кастомные ивенты, если нужны.. */
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    try {
      this.errorCount = this.validateForm(this.form);
      const formData = new FormData(this.form);
      const jsonObject = this.parseFormDataToJson(formData);

      if (!this.errorCount) {
        this.form.classList.add('_sending');
        const response = await this.sendPostRequest({
          url: this.options.actionEndpoint,
          jsonObject,
        });

        if (response.status === 200) {
          this.form.classList.remove('_sending');
          //this.showModal(null, false);
        } else {
          console.log('Что-то пошло не так');
          this.form.classList.remove('_sending');
          //this.showModal(this.options.errorMessages.genericError);
        }
      } else {
        console.log('Поля не заполнены, есть ошибки', this.errorCount);
        //this.showModal(this.options.errorMessages.emptyRequiredFields);
      }
    } catch (error) {
      console.log('Запрос не ушел, ошибка: ', error);
      this.form.classList.remove('_sending');
      //this.showModal(this.options.errorMessages.genericError);
    } finally {
      if (!this.errorCount) {
        this.form.reset();
      }
    }
  }
  parseFormDataToJson(formData) {
    const jsonObject = {};

    for (const [key, value] of formData.entries()) {
      const isKitKey =
        key === 'client_grow' || key === 'client_size' || key === 'kit_count';

      if (isKitKey) {
        if (!jsonObject.kits) jsonObject.kits = [];

        const lastIndex = jsonObject.kits.length - 1;
        if (jsonObject.kits[lastIndex] && !jsonObject.kits[lastIndex][key]) {
          jsonObject.kits[lastIndex][key] = value;
        } else {
          jsonObject.kits.push({ [key]: value });
        }
      } else {
        jsonObject[key] = value;
      }
    }

    return jsonObject;
  }

  validateForm() {
    let counterError = 0;

    this.inputsToValidate.forEach((input) => {
      this.removeClassError(input);

      const isEmail = input.classList.contains('_email');
      const isEmpty = input.value === '';

      if (isEmail) {
        if (!isEmpty && !this.validateEmail(input)) {
          this.addClassError(input);
          counterError++;
        }
      } else {
        if (isEmpty) {
          this.addClassError(input);
          counterError++;
        }
      }
    });

    return counterError;
  }

  addClassError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  removeClassError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  validateEmail(input) {
    return this.options.emailRegex.test(input.value);
  }

  async sendPostRequest({ url, data }) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await response.json();
  }

  showModal(message, isError = true) {
    const modal = document.createElement('div');

    body.append(modal);
    toggleBodyLock(true);

    if (modal) {
      setTimeout(() => {
        modal.remove();
        toggleBodyLock(false);
      }, this.options.timeToDelete);
    }
  }
}

export default FormSending;