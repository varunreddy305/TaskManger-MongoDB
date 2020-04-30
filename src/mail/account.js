const sgMail = require('@sendgrid/mail');

const sendgridApiKey = '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';

sgMail.setApiKey(sendgridApiKey);

sgMail.send({
	to: 'vreddy565@gmail.com',
	from: 'pullannagari.3@wright.edu',
	subject: 'Sending with Twilio SendGrid is Fun',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>'
});
