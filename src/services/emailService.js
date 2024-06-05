import emailjs from '@emailjs/browser';
const serviceId = 'service_4kmc8om';
const publicKey = '9FdzILaY3D4sV34Xi';
const templateId =  'template_5w8igf2';
function sendEmail(data) {
  console.log(data);
  let templateParams = {
    message: JSON.stringify(data)
  };
  emailjs.send(serviceId, templateId, templateParams, {publicKey: publicKey}).then(res => {
    console.log(res);
  }).catch((err)=> {
    console.log(err);
  });
}
export default {
  sendEmail: sendEmail
}