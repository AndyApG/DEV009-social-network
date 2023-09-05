import register from '../src/components/register';
import { registerUser } from '../src/lib/credentials';

jest.mock('../src/lib/credentials', () => ({
  registerUser: jest.fn(() => Promise.resolve({})),
}));
const navigateTo = jest.fn();
describe('Funcion Registro', () => {
  document.body.append(register(navigateTo));
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#Email');
  const inputPassword = document.querySelector('#Password');
  const confirmPassword = document.querySelector('#ConfirmPassword');
  const inputLastName = document.querySelector('#LastName');
  const inputUserNickName = document.querySelector('#User');
  it('Se renderiza correctamente login, existe los inputs y botones necesarios', () => {
    expect([inputEmail, inputPassword, inputLastName, inputName,
      inputUserNickName, confirmPassword])
      .toEqual(expect.not.arrayContaining([null]));
  });
  it('Debería recibir los valores de nombre, email, contrasena, apellido, y usuario', () => {
    const ev = new KeyboardEvent('keyup', {});
    inputEmail.value = 'emailTest@gmail.com';
    inputPassword.value = 'aa..12';
    confirmPassword.value = 'aa..12';
    inputName.value = 'UserTest';
    inputLastName.value = 'lastNameTest';
    inputUserNickName.value = 'UserNickNameTest';
    inputEmail.dispatchEvent(ev);
    inputPassword.dispatchEvent(ev);
    confirmPassword.dispatchEvent(ev);
    inputName.dispatchEvent(ev);
    inputLastName.dispatchEvent(ev);
    inputUserNickName.dispatchEvent(ev);
    const buttonRegister = document.querySelector('.formulario__btn');
    buttonRegister.click();
    expect(registerUser).toHaveBeenCalledWith('emailTest@gmail.com', 'aa..12', 'UserTest', 'lastNameTest', 'UserNickNameTest');
  });
  it('Debería dirigir a la pagina de Home al dar click en el botón regresar', () => {
    document.body.append(register(navigateTo));
    const buttonHome = document.querySelector('.iconHome');
    buttonHome.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
});
