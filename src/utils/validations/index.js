import {ShowMessage} from '../../components';

export const emailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordFormat = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,24}$/;
export const phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const signUpValidations = (data, isEmailLogin) => {
  if (isEmailLogin && !data.email) ShowMessage('Email is required');
  else if (isEmailLogin && !emailFormat.test(data.email)) ShowMessage('Email is invalid');
  else if (!isEmailLogin && !data.phone) ShowMessage('Phone is required');
  else if (!data.password) ShowMessage('Password is required');
  else if (data.password.length < 8) ShowMessage('Password must be 8 character long');
  else if (data.password !== data.confirmPassword) ShowMessage('Password and Confirm Password not matched');
  else if (!data.isAcceptTP) ShowMessage('Please accept the Friendsloc Terms of Use and Privacy Policy');
  else return true;
};

export const signInValidations = (data, isEmailLogin) => {
  if (isEmailLogin && !data.email) ShowMessage('Email is required');
  else if (isEmailLogin && !emailFormat.test(data.email)) ShowMessage('Email is invalid');
  else if (!isEmailLogin && !data.phone) ShowMessage('Phone is required');
  else if (!data.password) ShowMessage('Password is required');
  else return true;
};
export const newPasswordValidations = data => {
  if (!data.password) ShowMessage('Password is required');
  else if (data.password.length < 8) ShowMessage('Password must be 8 character long');
  else if (data.password !== data.confirmPassword) ShowMessage('Password and Confirm Password not matched');
  else return true;
};

export const forgotPasswordValidation = (data, isEmailLogin) => {
  if (isEmailLogin && !data.email) ShowMessage('Email is required');
  else if (isEmailLogin && !emailFormat.test(data.email)) ShowMessage('Email is invalid');
  else if (!isEmailLogin && !data.phone) ShowMessage('Phone is required');
  else return true;
};

export const changePasswordValidations = data => {
  if (!data.oldPassword) ShowMessage('Old Password is required');
  else if (!data.newPassword) ShowMessage('New Password is required');
  else if (data.newPassword.length < 8) ShowMessage('Password must be 8 character long');
  else if (data.newPassword !== data.confirmPassword) ShowMessage('Password and Confirm Password not matched');
  else return true;
};
