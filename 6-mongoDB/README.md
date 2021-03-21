# 🌿 Mongo Data Base

Mongo es la base de datos más utilizada a la hora de trabajar Backend con JavaScript, no es la única pero es la más utilizada para trabajr con JS.

Es una base de datos distribuída, basada en documentos, esta es la diferencia principal respecto a las base de datos *SQL*, es por esto que las base de datos estilo *Mongo* se les llama **No SQL**. Por que no son relacionales, estan orientadas a colecciones y dentro de ellas tendremos los documentos, veremos que los documentos tienen un formato parecido al JSON, aunque no es JSON. Estas bases de datos son bastantes más rápidas, por como guardan los datos, y su *esquema* es libre, esto quiere decir, que los datos que guiardamos en los documentos no son tan rígidos, esto puede ser un problema, para esto utilizaremos el framework **Mongoose**.

```
{
  "_id": "5cf0029caff5056591b0ce7d",
  "firstname": "Jane",
  "lastname": "Wu",
  "address": {
    "street": "1 Circle Rd",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90404"
  },
  "hobbies": ["surfing", "coding"]
}
```

Este es un modelo documental del que hablabamos anteriormente. Como se ve es una forma de documento de tipo JSON, aunque luego no termina siendo exactamente un JSON ya que cuando se guarda termina siendo un *BSON* (Binary JSON), esto quiere decir que el JSON se guardará con un formato binario. Lo interesante es que cuando nosotros nos comuniquemos con ella, será en formato JSON.

Con Mongo podremos hacer consultas de manera muy sencilla, por ej, `db.users.find({ "address.zip" : "90404" })`, *zip* es una propiedad dentro del objeto *address*, buscamos los usuarios que concidad con ese parámetro.

El que no sea relacional, no quiere decir que luego no podamos relacionar diferentes colecciones, podemos tener colecciones de usuarios con twitts y los podríamos relacionar, pero normalmente no lo solemos hacer. Lo que hacemos es duplicar datos de forma que el acceder a estos datos sea más rápido.

## 🍀 Mongoose

Mongoose nos creará toda la validación, lógica para evitarnos problemas, nos da la posibilidad de tener esquemas en nuestra aplicación, de forma, que cada vez que añadimos un documento a nuestra app tengamos un esquema y nos haga la validación de que tipo de dato debe tener cada propiedad, con esto vemos que normalmente **mongoose** es la mejor forma de trabajar con *MongoDB*.

Para trabajar con el debemos instalarlo con `npm install mongoose`, luego lo importamos en nuestro archivo `index.js`.

Una vez tengamos creada nuestra base de datos en mongo, copiaremos la conexión a la misma, debe ser un string como este `mongodb+srv://db_user_notes:<password>@cluster0.5v65t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, en dóde dice `password` debemos poner la password de la base y donde dice `myFirstDatabase` debemos poner es nombre que queramos a nuestra base, nos quedaría algo así `mongodb+srv://db_user_notes:123@cluster0.5v65t.mongodb.net/notes?retryWrites=true&w=majority`.

Ahora podemos pasar a conectar con nuestra base de datos, esto lo hacemos con `mongoose.connect(urlString)`, le pasamos el string que crewamos antes en una variable. Esto nos devolverá una promesa, así que podremos poner un `console.log`, para ver si está todo funcionando, y sino haremos un catch para capturar el error.

![Mongo Connection To](./img/mongo-connection-to.png)

Si ejecutamos ese archivo con `node mongo.js`, nos dirá que se conectó a nuestra base de datos pero también nos imprimirá un montçon de *deprecation warnings*, esto quiere decir que estamos utilizando cosas qe pronto se dejarán de utilizar en mongo. Para evitar estos warnings podemos pasarle, además del string para conectarnos a la base, un segúndo parámetro que será un objeto, dondé le pasamos diferentes propiedades con valores que le dirán que utilizar a la conexión.

![Mongo Connection Object](./img/mongo-connection-object.png)

Para destacar, tenemos la propiedad `useCreateIndex`, que nos ayuda a la hora de buscar documentos, ya que los guarda en memoria para luego encontrar estos docuemnentos en la colección de manera muy rápida.

Ahora, si ejecutamos nuevamente `node mongo.js`, nos dirá el mensaje que imprimimos por consola y no nos debería dar ningún warning.

## 📋 Creando un Schema y un Modelo en Mongoose

Una vez creada nuestra conexión a la base, lo primero que debemos hacer es definir el **esquema** que vamos a utilizar. En *SQL* los esquemas están en la base de datos, en las *No SQL* construimos un esquema (tengamos en cuenta que un esquema es como un contrato, donde decimos que tipo de propiedades tendrán nuestros documentos) en nuestra app, le llamaremos a la variable `noteSchema`.

```
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})
```

`Schema` lo extraemos de mongoose. Como vemos el `id` no se lo pasamos ya que lo creará solo. A `Schema` le pasamos los parámetros que tiene nuestro objeto de notas, le indicamos que el content será un `String` la fecha será un `Date` y el important que deberá ser un `Boolean`. Con esto tendríamos el Schema de la nota.

Una vez tenemos creado el schema es momento de crear nuestro **modelo**, es quiere decir, que utilizando el schema creamos una clase que nos permitirá crear instancias de las notas y poder grabarlas en la base de datos.

Crearemos un modela `Notes`, observar que se crea con el nombre en mayúsculas al principio, ya que es una clase que nos permitirá crear instancias a partir de él.

```
const Note = model('Note', noteSchema)
```

`model` lo extraemos de `mongoose`. Primer parámetro será el nombre del modelo, es una buena prática ponerlo en singular, porque lo que hacemos al definir el modelo es crear una nota. Como segundo parámetro le pasamos el schema que debe tener nuestro modelo.

A partir de esto que creamos es que mongoose creará nuestros documentos, como dijimos, en otras db esto está en la base de datos propiamiente, pero en el tipo de base que estamos trabajando, los schemas los tenemos en nuestra app.

Ahora podemos crear una instacia de nuestra clase para crear nuestra primer nota, lo hacemos con

```
const note = new Note({
  content: 'Test db',
  date: new Date(),
  important: true
})
```

Una vez que lo creamos, esta variable `note` tendrá un montón de metodos para ejecutar, uno de ellos es `save()` el cual le dice que la guarde en la db, esto nos devuelve una promesa, en la cual podemos decirle que nos imprime el resultado por consola y también capturamos el error por si algo inesperado ocurre.

![Mongo Create note on DataBase](./img/mongo-create-note-db.png)

Una buena prácica, cuando terminamos nuestras operaciones con el servidor, es cerrar la conexión con mongoose, es por esto que luego de guardar nuestro resultado hacemos `mongoose.connection.close()`.

Si ejecutamos `node mongo.js` y ha salido todo bien, nos imprimirá en consola el objeto que acabamos de crear. Ver el detalle de que el id lo crea con `_id` y si vemos el tipo de dato no es un string, si no un `Objetc Id`, este es un objeto específico que tiene diferente información. Nos devuelve un objeto como este

```
{
  _id: 604fee4f33dd722998d66c29,
  content: 'Test db',
  date: 2021-03-15T23:31:27.677Z,
  important: true,
  __v: 0 
}
```

Para ver si esto se ha creado correctamente, podemos hacerlo usando nuestro modelo, a travéz de su instancia `find()`, en el que le decimos que busque un elemento en particular, o como en este caso, que devuelva todos los elementos, esto lo podemos hacer con

```
Note.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
})
```

IMPORTANTE: cerrar conexiones con mongo.

Si ejecutamos nuestro script veremos que nos imprime la nota que creamos antes. Otro lugar, donde podemos ver nuestra colección es un el panel de mongo en la web.

## 🔗 Conectando nuestra Base de Datos con nuestro Backend

En primer lugar dividiremos nuestro mongo.js en varios módulos, para esto creamos una carpeta llamada `models` donde pondremos nuestro `Note.js`, en ese archivo dejaremos nuestro modelo y nuestro schema (exportamos solo el modelo).

Ahora importaremos nuestro archivo `mongo.js` en nuestro archivo `index.js`, haremos un `require(./mongo.js)` sin guardarlo en una variable así se ejecuta directamente y ocurre nuestra conexión con la base de datos. Importante primero crear la conexión y luego importar nuestro modelo con la nota.

Ahora que tenemos el modelo, podemos comenzar a cambiar nuestras peticiones de nuestro `index.js`, para devolver todas las notas podríamos hacer lo que hicimos antes con el `find()`

```
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

Si ejecutamos nuestro script `npm run dev` y vamos a `http://localhost:3001/api/notes` nos debería imprimir la nota que creamos anteriormente. Como vemos nos imprime el id con `_id` y además de las propiedades que si nos interesa, también nos trae una propiedad `__v` que no nos interesa para nada.

Como no podemos mapear el resultado, para transformar los valores y que nos imprima lo que queremos, debemos cambiar el funcionamiento que tiene el *toJSON* en el `schema`. Esto lo hacemos con

```
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

Con la función `transform` le indicamos el comportamiento que debe tener el toJSON a la hora de mostrar los datos de nuestro documento. Como vemos el objeto retonado le añadimos el `id` y la extraemos de `_id`. Luego con `delete` eliminamos las propiedades `_id` y `__v`. Normalmente `delete` no es una buena práctica pero en este caso no mutamos algo que luego nos pueda dar problemas, sino que cambiamos para adaptar nuestro schema a nuestras necesidades, lo único que mutamos es el objeto que devuelve, NO el de la base de datos ni nada por el estilo. Lo bueno es que ahora tendremos ese "contrato" de documento en todas nuestras peticiones y no solo cuando hacemos un `get()`.

## 🌐 Variables de entorno

Como ya vimos en nuestro `index.js` podemos pasar una variable de entorno para que tome como valor, en vez de un valor fijo. 

Para crear variables de entorno debemos crear en nuestro root un archivo `.env` en cual podremos crear nuestras variables, la primera que creamos es la del puerto `PORT=3001`, luego podemos crear la del connectionString, le llamamos `MONGO_DB_URI`, ahora debemos cambiar los valores que teníamos en las respectivas variables.

Esto nos facilita para, por ejemplo, levantar distintas bases de datos dependiendo del entorno en el que nos encontremos conectarnos a una u otra base.

Para poder utilizar nuestro archivo `.env` debemos instalar la dependencia dotenv con `npm i dotenv` para luego importar esta dependencia apenas inicia nuestra aplicación, esto va a hacer que lea nuestras variables de entorno y donde vea que las llamamos las ejecutará con el valor que esperamos.

IMPORTANTE: ignorar el archivo `.env` ya que tiene información privada que no debemos compartir.

## 🔐 Conectando el resto de nuestra app a la base de datos

Continuamos conectando nuestra app con el método `POST`, lo que haremos es instanciar nuestro modelo de `Note` para crear una nueva nota, como hicimos en el ejemplo de más arriba.

![Mongo Change Post Method](./img/mongo-change-post-method.png)

Ahora cambiamos nuestra petición para cuando queremos obtener una sola nota y lo hacemos de esta manera

![Mongo Change get Method](./img/mongo-change-get-method.png)

Como vemos utilizamos el método `findById` de nuestro modelo. También pasamos a manejar el error, cuando ocurra, con un middleware, como vimos, `next()` lo que hará es ir al siguiente middleware que haga match con lo que queremos.

En este caso utilizaremos un middleware al que entrará nuestra app cada vez que ocurra un error. Capturaremos el nombre del error que nos llega y en caso de que tenga cierto nombre imprimiremos un error u otro quedando nuestro middleware de esta manera

```
app.use((error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    response.status(400).json({
      error: 'Id used malformed'
    })
  } else {
    response.status(500).json({
      error: 'Server Error'
    })
  }
})
```

Lo bueno de esto es que cada vez que tengamos un lugar donde necesitemos que nos envíen un *id* le podremos pasar este middleware para manejar el error.

Crearemos ahora el último que nos queda que es el metodo deleted, nos quedará de esta manera

![Mongo Change Delete Method](./img/mongo-change-delete-method.png)

Utilizando el método `findByIdAndRemove()` de nuestro modelo podremos borrar el elemento de nuestra base de datos.

Otro que no habíamos creado aún es el método para actualizar el contenido de las notas y este es el método `put()`, lo hacemos de la siguiente manera

![Mongo Create put Method](./img/mongo-create-put-method.png)

A tener en cuenta, utilizamos el método `findByIdAndUpdate` que tiene nuestro modelo, como tercer parámetro le debemos pasar que como resultado queremos el nuevo documento, porque si no le pasamos, aunque en la base de datos actualizará, en la ui nos mostrará el documento viejo.

Un middleware que no debemos olvidar es el del error `404`, creamos uno para cuando ocurre este error

```
app.use((reques, response, next) => {
  response.status(404).json({
    error: 'Not Found'
  })
})
```

Es muy importante la ubicación de los path y de los middlewares de manejo de error dentro del código, primero debemos tener los path y luego los middlewares para manejo de errores. También es importante llevar a que los middlewares para manejo de error esten en un módulo a parte.

Importante saber también que el `next()` se debe usar siempre y cuando queramos que lo siguiente que utilice sea un middleware, si queremos que la respuesta termine allí no debemos pasarle el next sino la respuesta que queremos dar. Para el caso del error con el id le pasamos `next(err)` eso quiere decir que debe ir a un middleware donde el primer parámetro sea un error, es por esto que el que encuentra es el único que lo tiene, el que maneja nuestro error para cuando el id no es el correcto.

Al final nuestro código del `index.js` quedará de la siguiente manera

![Mongo index File](./img/mongo-index-file.png)
