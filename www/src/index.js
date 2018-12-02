const ur = require('./resource/UserResource');
const restify = require('restify');
const errs = require('restify-errors');
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});


const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'smarthousedb'
  }
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(8080, function () {
  console.log(ur.UserResource.nome)
  console.log('%s listening at %s', server.name, server.url);
});



/** 
 * CROUDS BASICOS
 *  *Utilização de Promisse
*/
server.get('/usuario', function (req, res, next) {
//Promisse
  knex('tb_user').then((data)=>{
    res.send(data);
  },next);
});

server.post('/usuario', function (req, res, next) {
  //Promisse
    knex('tb_user').insert(req.body).then((data)=>{
      res.send(data);
    },next);
  });

  server.get('/usuario/:id', function (req, res, next) {
    const { id } = req.params;

    //Promisse
      knex('tb_user').where('id',id).first().then((data)=>{

        if(!data) return res.send(new errs.BadRequestError('Não foi encontrado'));

        res.send(data);
      },next);
    });


    server.put('/usuario/:id', function (req, res, next) {
      const { id } = req.params;
  
      //Promisse
        knex('tb_user').where('id',id).update(req.body).then((data)=>{
  
          if(!data) return res.send(new errs.BadRequestError('Não foi encontrado'));
  
          res.send('Atualizado com sucesso');
        },next);
      });

      server.del('/usuario/:id', function (req, res, next) {
        const { id } = req.params;
    
        //Promisse
          knex('tb_user').where('id',id).delete().then((data)=>{
    
            if(!data) return res.send(new errs.BadRequestError('Não foi encontrado'));
    
            res.send('Deletado com sucesso');
          },next);
        });