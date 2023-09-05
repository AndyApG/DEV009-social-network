import login from '../src/components/login.js';
import { startSession, signInWithGoogle } from '../src/lib/credentials.js';

window.alert = jest.fn();
const navigateTo = jest.fn();
const component = login(navigateTo);
// const signInWithEmailAndPassword = jest.fn();
// console.log(component.innerHTML);

jest.mock('../src/lib/credentials.js', () => ({
  startSession: jest.fn((email, password) => {
    if (email === 'ejemplo@correo.com' && password === 'abc123.') {
      return Promise.resolve('Sesion iniciada');
    } return Promise.reject(new Error('error'));
  }),
  signInWithGoogle: jest.fn(() => Promise.resolve()),
}));

document.body.append(component);
const inputPassword = document.querySelector('.inputPassword');
const inputEmail = document.querySelector('.inputEmail');
const startSessionBtn = document.querySelector('.startSession');
const createAccount = document.querySelector('.createAccount');
const signInWithGoogleBtn = document.querySelector('.signInGoogle');

describe('login', () => {
  it('Se renderiza correctamente login, existe los inputs y botones necesarios', () => {
    expect([inputPassword, inputEmail, startSessionBtn,
      createAccount, signInWithGoogleBtn]).toEqual(expect.not.arrayContaining([null]));
  });
  it('El boton crear cuenta redirige correctamente a register', () => {
    createAccount.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
  it('El boton ingresar con Google redirige correctamente ', () => {
    signInWithGoogleBtn.click();
    expect(signInWithGoogle).toHaveBeenCalled();
  });
  it('El boton iniciar sesion funciona correctamente ', async () => {
    inputEmail.value = 'ejemplo@correo.com';
    inputPassword.value = 'abc123.';
    startSessionBtn.click();
    await expect(startSession('ejemplo@correo.com', 'abc123.')).resolves.toBe('Sesion iniciada');
    await expect(startSession('ejemp@correo.com', 'abc123.')).rejects.toThrow('error');
  });
  it('Correo Incorrecto', async () => {
    inputEmail.value = 'ejemplo@correo.com';
    inputPassword.value = 'abc123.';
    startSessionBtn.click();
    console.log(await Promise.resolve());
  });
});
