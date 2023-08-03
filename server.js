const fastify = require('fastify')();
const path = require('path');
const questions = [{
  caption: 'Подія натискання на елемент називається click?',
  correctAnswer: true
},

];

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.get('/api/questions', (request, reply) => {
  reply.send(questions);
});

fastify.post('/api/check-answers', (request, reply) => {
  const userAnswers = request.body;
  let correctCount = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      correctCount++;
    }
  }

  reply.send({ correctCount, totalQuestions: questions.length });
});

fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is running on port 3000');
});
