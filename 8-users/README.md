# 👨‍👩‍👧‍👧 Administración de Usuarios

Crearemos usuarios, utilizando nuestra api de notas, crearemos nuevos endpoints para usuarios, haremos la relación con nuestra colección de notas, además tendremos que hacer testing para asegurarnos que nuestro código funciona.

Debemos hacer administración de usuarios ya que nuestras notas, ahora mismo, están 'huérfanas', esto quiere decir que nuestras notas son anónimas, no tenemos un usuario al que están relacionadas. Lo que queremos es esto mismo, que las notas esten asociadas a un usuario y que cada nota solo sea de una persona a la vez, lo que si un usuario puede tener n notas asociadas a el, pero cada nota pertenece a un usuario.

## 🛐 Creando el modelo de usuarios

Al igual que lo hicimos con las notas debemos crear el modelo para los usuarios. Para crearlo nos basamos en el modelo de notas

![Users Model](./img/users-model.png)

Dentro de nuestra carpeta model, que creamos para el modelo de notas, creamos un archivo llamado `User.js`, este archivo tendrá nuestro modelo de usuarios.

El password lo ponemos como `String` por ahora pero luego lo transformaremos a hash, ya que NUNCA debemos guardar nuestras contraseñas como nos llegan, sino que la debemos guardar como hash.

En la key `notes`, guardamos todos los id's de las notas que creó el usuario, además de decirle el tipo de dato que vamos a guarda allí, debemos decirle que tiene una referencia al model `Note`, de esta forma, luego, podremos utilizar funcionalidades que tiene el modelo `Note`, dentro del modelo `User`.

Transformamos los datos que nos van a llegar a nuestra api, al igaul que en el modelo de notas transformamos algunas propiedades, pero para este caso, otra cosa que haremos es eliminar el password del objeto que nos devuelve, ya que no queremos que se nos filtre el hash del password del usuario.

Por último crearemos la instancia del modelo que llamaremos `User`.

Otra cosa que debemos cambiar es el modelo de notas, así tendremos relación de usuarios con nota tanto en el modelo de notas como en el de usuarios.

```
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
```

## 📍 Endpoints para usuarios

Como nuestro `index.js` empieza a quedar muy grande utilizaremos controladores para manejar nuestros endpoints, tanto para las notas como para los usuarios.

Utilizamos un middleware para indicarle que en la ruta `/api/users` utilice nuestro controlador de rutas, lo hacemos de esta manera

```
app.use('/api/users', usersRouter)
```

Ahora, en la carpeta `controllers` creamos un archivo `users.js` donde manejamos los endpoints de nuestros usuraios. Debemos importar el `Router()` de express y el modelo de usuario que creamos anteriormente.

Lo primero que creamos es el endpoint para crear un usuario, lo primero es indicar el método que utilizamos para crear un usuario, ese es el método `post`

```
usersRouter.post('/', async () { ... })
```

Importante, ponemos el path de esa manera ya que nuestro root lo indicamos en nuestro index, que la ruta era, `/api/users`, por lo tanto si ponemos `/` ya nos encontramos en esa dirección ya que es relativo, apartir de allí accedemos a la dirección que queramos.

![User Controller](./img/users-controller.png)

De esta manera queda creado nuestro endpoint para crear un usuario, si lo probamos nos debería devolver un objeto parecido a este

```
{
  "notes": [],
  "username": "YoelRib",
  "name": "Yoel",
  "id": "60625fcf3c35a41194c51652"
}
```

En `notes` nos crea un array vacío ya que este usuario no ha creado notas aún, nos devuelve también el `username`, `name`, `id`. Observar que no nos devuelve la contraseña ya que en el modelo indicamos que no la devuelva en el objeto que nos llega.

## 🔐 Encriptando contraseñas con bcrypy

Encriptaremos la contraseña que nos llega del usuario con **bcrypt** ya que no debemos guardar en la base de datos la contraseña como un `String` sino que debe ser guardada de manera encriptada. *Bcrypt* hashea nuestra contraseña de manera unidireccional.

Lo instalamos con `npm i bcrypt`.

Lo recomendado es utilizarlo de forma asíncrona, ya que este tipo de operación, hashear un password, suele ser bastante grande, entonces si bloqueamos la ejecución de node, puede pasar que comiencen a llegar peticiones, pero este se para porque detiene la ejecución mientras el hash sucede y por esto el servidor puede ir muy lento.

Creamos el hash para nuestra password en el controlador de usuraio

```
const saltRounds = 10
const passwordHash = await bcrypt.hash(password, saltRounds)
```

Utilizamos `await` para hacerlo de forma asíncrona, luego llamamos a `bcrypt`, que lo importamos anteriormente, y llamamos al metodo `hash()`, tendremos dos métodos para utilizar `hash()` (para usarlo de forma asíncrona) y `hashSync()` (para usarlo de forma síncrona). Este método recibe dos parámetros, el primero el elemento que queremos hashear, será nuestro password, y el segundo será la complejidad algorítmica en la que queremos se hasheee nuestro password, importante saber que, mientras más grande sea la complejidad, mejor será pero más tardará en generarse el hash.

Ahora si nos, si creamos un usuario, en la base de datos nos genererá algo como esto

```
{
  "_id":{"$oid":"60626561e469e507206261b9"},
  "notes":[],
  "username":"YoelRiDev",
  "name":"Yoel",
  "passwordHash":"$2b$10$4u59XX.XVuNMYYeHiflMk.m0OrVDAOETsC8hsKmi/1FIJ6tcYiZqi",
}
```

Vemos que la contraseña es creada en forma de hash.

## 🔎 Test para el endpoint post

Crearemos un test para comprobar que podemos crear usuarios correctamente, además veremos que lo que hicimos, hasta ahora, es crear el usuario pero no hicimos control de ningún tipo de error

![Users endpoint post Test](./img/users-endpoint-post-test.png)

Creamos un archivo `users.test.js`, importamos `bcrypt`, el modelo `User` y nuesta `api` para ejecutar nuestros endpoints.

Utilizamos el método `beforeEach()` para ejecutar código antes de que se ejecute antes de cada test. Dentro, lo primero que hacemos es borrar todos los usuarios existentes en nuestra base de datos, para luego crear un usuario. Recordar que la base de datos que manipulamos es la de test, y no la de desarrollo, mucho menos la de producción.

Algo que haremos, antes de seguir, es que cada vez que se ejecute nuestro test, lo haga desde un puerto distinto al de desarrollo, ya que podría traernos porblemas, para esto, en el script de test indicamos el puerto `"test": "cross-env NODE_ENV=test PORT=8081 jest --verbose --silent"`.

Nuestro primer test evaluará la creación de un usuario que no existe. Para esto, primero recuperamos las usuarios que hay en ese momento en la base de datos, luego recorremos esos usuarios y lo pasamos por el método `toJSON` así tenemos los datos de una manera amigable y con los datos que necesitamos para trabajar. Haremos un objeto que crea nuestro nuevo usuario `newUser`. Ahora desde nuestra `api` que importamos tenemos disponible el endpoint `post()` para guardar nuestro nuevo usuario y por ahora esperaremos un status code `200`, aunque luego lo cambiaremos. Para terminar, recuperamos nuevamente los usuarios de la base de datos y comprobamos que nuestro usuario fue creado correctamente, si es así la nueva colección debería tener un usuario más que la inicial y evaluamos si el `username` del nuevo usuario que creamos, existe en nuestra colección de usuarios.

Por último refactorizamos código y lo llevamos a nuestro helper para tener un código más limpio y menos repetitivo. Creamos una función `getUsers` que nos devuelve nuestros usuarios pasados por el método `toJSON()`

```
const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}
```

Importante tratar a los test como si fueren código de producción, esto quiere decir que, a pesar de que solo se ejecutan en desarrollo no significa que lo podamos hacer de cualquier manera, es importante tener un código prolijo, lintado, evitar repetición y mantener las mejores prácticas posibles.

## 🔬 Test Driven Development (TDD)

Es una forma de desarrollo en la que primero hacemos test y luego escribimos el código necesario para que el test funcione. Hecmos un test, con un caso de uso que queremos que tenga nuestra app, nos dará en rojo porque esa funcionalidad no se encuentra ahora mismo en nuestro código, conseguimos que nos de verde y a partir de ahí refactorizamos ya sea cambiando funcionalidad o también mejorando nuestro código.

Lo que conseguimos con esto, es que siempre tenemos un loop en donde nos apoyamos en el test primero y no en la funcionalidad.

Continuamos creando el test para evaluar que si un usuario ya existe no puede ser creado.

```
test('creation fails with proper statuscode and message if user is already taken', async () => {
  const usersAtStart = await getUsers()

  const newUser = {
    username: 'YoelRibero',
    name: 'Yoel',
    password: 'hol4'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  
  expect(result.body.error).toContain('`username` to be unique')
  
  const usersAtEnd = await getUsers()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
```

Es muy parecido al test creado anteriormente con la diferencia de que esperamos que no se cree y que nos de un error. Si lo ejecutamos va a fallar por lo que hablamos de *TDD*, ahora debemos hacer que ese test funcione.

Existe un librería de mongoose llamada **unique-validator**, este nos permite indicar, en nuestro modelo, que campos queremos que sean únicos, esto será de mucha utilidad porque nos resuelve un montón de cosas y es una comprobación que seguramente debamos hacer en mas de un lugar. La instalamos con `npm i mongoose-unique-validator -D`

En nuestro modelo importamos nuestra nueva librería y la key `username` pasará a ser un objeto donde le indicamos, el tipo de dato que va a contener y le agregamos la propiedad `unique` y se la seteamos como `true`. Por último debemos aplicar el pluin al schema.

Al agregar esta propiedad y realizar los cambios pertienentes en nuestro código del endpoint, se agrega `try and catch` para manejar el error, nuestro test asa a dar el código está ok.

Podríamos hacer más validaciones, por ej, que el largo del username no tenga más de n caracteres, etc. mongoose nos lo permite y ya lo trae preparado.

## 🤝 Relaciones entre colecciones

Haremos crecer nuestro controlador de users, continuamos con nuestro endpoint `get` para nuestra ruta de usuarios.

```
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})
```

Vemos que tanto nuestro endpoint para el `post()` como para el `get()` lo hacemos al mismo path, esto es porque estamos utilizando REST API en donde un mismo path nos sirve para diferentes funciones, dependiendo de la acción que utilizamos.

Recuperamos todos los usuarios y los retornamos como un json. Otra cosa que debemos agregar es el test para esta ruta.

Si observamos la respuesta, y hay usuarios creados nos devolverá esos usuarios pero si vemos el array de notas estará vacío.

Ahora, en el controlador de usuarios debemos validar que cuando un usuario crea una nota se la asigne al mismo.

Lo haremos en el endpoint para el `post()`, le debemos indicar que cuando se crea una nota también debe recibir el usuario que la está creando.

```
// create note
notesRouter.post('/', async (req, res, next) => {
  const { 
    content, 
    important = false,
    userId
  } = req.body

  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({
      error: 'Note content is missing'
    })
  }

  const newNote = new Note({
    content,
    important,
    date: new Date().toISOString(),
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    // add note to user in db
    user.notes = [...user.notes, savedNote._id]
    await user.save()
    res.json(savedNote)
  } catch(e) {
    next(e)
  }
})
```

Lo primero, recuperamos los valores que necesitamos de la nota, ahora agregamos el `userId`, luego, utilizando el modelo del usuario buscamos el usuario correspondiente mediante el método `findById()`

Al crear la nueva nota en la propiedad `user` le pasaremos el id que encontramos en la base de datos, como lo estamos buscando en la base de datos el id lo debemos citar con `_id`.

Como dijimos, esta información la vamos a tener tanto en las notas, como en el usuario, así que una vez que tenemos la nueva nota y antes de enviar la respuesta, con el usuario que recuperamos de la base de datos accedemos a las notas y le agregamos la nueva nota que creó. De esta manera nos aseguramos que tanto el usuario como las notas etán asignadas a un usuario.

Tenemos un primer relación bidireccional, lo que qeremos ahora es que cuando nos dan info de la nota, no solo nos diga el id del usuario, sino que nos de toda la información del mismo.

En *mongoose* existe un concepto llamado **populate**, es un método que utiliza las referencias que creamos en el modelo y recupera la información para "rellenar" la información, en este caso del usuraio, donde la necesitamos.

Nos vamos al controlador de usuarios, y en el método `get` cuando recuperamos las notas le pasamos el método populate

```
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
})
```

Al método `populate` le decimos que lo que queremos es que nos "rellene" con las info de las `notes`, va así, en minúscula y en plural, de esta forma eso buscará el modelo que creamos (user) y tenía referencia al modelo `Note`, de este forma cuando le decimos que tiene que popular `notes`, lo que hace es buscar el `ObjectId` y se trerá toda la información de las notas.

Ahora si hacemos un get de los usuarios vemos que vendrá con toda la información de las notas.

Es importante saber que lo que hacemos aquí **no es transaccional**, con esto queremos decir que, mientras hacemos estas operaciones no se bloque la escritura de los documentos, esto significa que, podría pasar que mientras recuperamos la data de usuarios, otra persona a la vez lo haya borrado, esto hace que tengamos información de un usuario cuando ya no existe. Esto es algo que ocurre en aplicaciones con mucha escritura, pero es algo que debemos tener en cuenta, pueden ocurrir varias acciones al mismo momento y no se bloquearán.

Otra cosa que debemos ver es la respuesta, nos devuelve cosas que tal vez no todas son necesarias, por ejemplo en el `user.notes` nos devuelve el `userId` esa es una info que no necesitamos ya que la tenemos en el propio objeto user.

Cuando hacemos el `populate` le podemos indicar, como segundo parámetro lo que queremos que añada del objeto, por defecto nos trae todas, pero le podemos indicar cuales queremos.

```
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  res.json(users)
})
```

Con esto le decimos que nos traiga el content y la date, si miramos el objeto que nos devuelve ahora vemos que nos trae solo eso, además también nos trae el `id` de la nota. La siempre nos la traerá a menos que indiquemos lo contrario. Si no quisiéramos el `id` se lo indicaríamos de esta manera `_id: 0`. En nuestro caso tiene sentido el id de la nota.

Ahora haremos lo mismo, pero con el controller de notas. Le pasamos el populate para que nos traiga los datos del usuario que la creó.

```
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  res.json(users)
})
```

En este caso el nombre al que hacemos referencia en el populate es en minúscula y singular ya que la propiedad referencia que está en el modela de notas está escrita de esa manera.

## 🔐 JSON Web Tokens

Con estos tokens conseguiremos que nuestros usuarios tengan sesión, queremos que solo los usuarios autenticados puedan realmente crear una nota. Anteriormente vimos como registrar usuarios, ahora veremos como pueden iniciar sesión y también veremos como mantener esa sesión.

![Users Token Diagram](./img/users-token-diagram.png)

Lo que no explica el *diagrama* es que el usuario pondrá, en un formulario, su usuario y password, luego presionará para enviar los datos, el navegador hará una petición post a nuestra api con el user y el password y nuestro backend debe generarnos un token que identificará al usuario, el token será devuelto al navegador y será guardado (hay diferentes formas de hacerlo) en el cliente. A partir de aquí cuando el usuario cree una nota, debemos enviarle el token en el header para que el backend sepa que usuario fue el que creó la nota. Lo que explica el diagrama es lo que haremos en esta sección.

Para comenzar crearemos nuestra ruta para inicio de sesión. Esto lo hacemos en nuestra carpeta `controllers`. Creamos un nuevo archivo para el login llamado `login.js`.

Necesitaremos `bcrypt` para hashear nuestro password. Luego creamos nuestro `loginRouter` como lo hicimos con los otros routers. También necesitaremos el modelo de usuario así que lo importamos.

Ahora creamos nuestro endpoint que será con el método post, ya que para loggearnos necesitamos que el navegador envíe datos a nuestro servidor. Primero recuperamos el `body` de la request para así, recuperar el usuario y el password. Ahora que tenemos esa info, podemos buscar ese usuario en la base de datos pasandole el método `findOne()` a nuestro modelo de usuario. De esta manera sabremos si el usuario existe.

También evaluamos si el password es correcto, para esto primero, avaluamos si el usuario existe, ya que sería innecesario evaluar si el password es correcto cuando ya sabemos que el usuario no existe, en caso de que el usuario exista, recuperamos el password pasandolo por `bcrypt` ya que nos va a venir hasheado, `bcrypt` tiene un método que nos ayuda a comparar si dos hashes son iguales y es el método `compare()`, los pa´rametros que recibe son, primero el password que nos llega de la petición y segundo el password del usuario que encontramos en la base de datos.

En caso de que el password no sea el correcto devolvemos un status `401` y le decimos que el usuario o la contraseña son inválidos. Es importante no dar pista de que dato es el incorrecto, ya que así prevenimos un posible ataque de hack, sino la persona que está intentando robar un usuario podría tener pista de que es lo que está fallando y no queremos eso. En caso de que el password sea correcto devolvemos el `name` y el `username` del usuario loggeado.

![Users Login Controller](./img/users-login-controller.png)

Una vez terminado debemos poner nuestra ruta en nuestro archivo `index.js` para que funcione. Podemos también crear una petición en nuestros request para el login y probar que nuestro login está funcionando.

Hasta ahora, logramos logearnos con un usuario, pero no seríamos capaces de conservar la sesión del usuario, el sistema más usado para autenticar usuarios es con **JSON Web Tokens**.

Este es un standard de la industria que hace que dos partes se puedan comunicar de forma segura e intercambiar información. Lo interesante es que es agnóstico a la hora de guardar la sesión, una vez que tienes la sesión guardada y tenemos la información podemos indicar dentro del token, el usuario que es, información que necesitemos y tenerla codificada de una forma que es muy difícil desifrarla, porque está firmada digitalmente.

![Users JSON Web Token](./img/users-jwt.png)

Este es un ejemplo de un *JWT*. Se pueden identificar tres partes:
 - **Header** (rojo): Tiene la información sobre el algoritmo y el tipo del token
 - **Payload** (lila): Tiene la información que queremos guardar en el token, en este caso tenemos un objeto donde una de sus propiedades es el `name`, pero podemos tener ahí lo que queramos, siempre y cuando sea algo información que se pueda guardar en formato JSON.
 - **Verify Signature** (celeste): Ayuda a verificar que la firma es correcta con un secreto que nosotros guardamos en nuestro backend.

Este token será el que verifique que la sesión pertenece a un usuario en concreto. No es algo imposible de hakear pero si es muy difícil de hacerlo. Podemos tener varias capas de seguridad, por ej, dentro del backend podríamos mirar la localización que tiene el token, por ej, si una persona inicia sesión desde Montevideo, y luego se usa ese mismo token para iniciar sesión pero desde Ottawa, llamarle la atención al usuario para saber si el inicio de sesión lo realizó el.

Para nuestro caso lo importante será la palabra secreta, que en la img es `your-256-bit-secret`, es muy importante que esta palabra sea secreta, puede ser lo que queramos pero mientras más complicada mejor, ya que ahí es donde radica la imposibilidad de poder decodificar la firma. 

Integramos **JWT** en nuestro backend, para esto debemos instalar el paquete que nos permite utilizarlo `npm i jsonwebtoken`, hay diferentes paquetes que se pueden instalar, pero este es el más utilizado y funciona muy bien. Para utilizarlo lo importamos en nuestro controlador.

Una vez que sabemos que el usuario y el password existen guardamos la información en el jwt, guardamos el `id` del usuario y el `username`. Así que guardamos esos valores como *payload* en la variable `userForToken`, una vez que tenemos esa data, firmamos el token utilizando el módulo `jwt` pasandole el método `sign()`, este recibe dos parámetros, el `payload` y la palabra secreta que firmará nuestro toke, esta última la guardaremos en nuestro archivo `.env` para que sea una variable de entorno y así no tenga acceso nadie a ella.

Ahora en la respuesta podemos, además de devolver el `name` y el `username`, devolver el `token`.

![Users JWT](./img/users-jwt-created.png)

Ahora si probamos utilizando nuestro request para login debería devolvernos el token de la sesión.

Ahora que tenemos el token, limitaremos la creación de notas. Con el podremos evitar que cualquiera pueda crear una nota, queremos tener la seguridad de que sea un usuario el que está creando la nota.

Para lograr esto necesitamos leer el token del usuario, es lo hacemos permitiendo que nuestros `endpoints` reciban esta información por una cabecera `http`, por un `header`. Tenemos una cabecera que nos permite hacer esta funcionalidad, y esta se llama **Authorization**, a travéz de este header enviaremos el token para leerlo y evaluar si el usuario que está creando una nota tiene permisos para hacerlo.

Hay diferentes formas de enviar esta cabecera, tenemos varios *esquemas de autenticación*, utilizaremos el **Bearer** que utiliza tokens de acceso basado en *OAuth 2.0* que es un conjunto de reglas para hacer autenticación y sesiones de usuario de una manera bastante segura.

En la sección de crear notas, en el endpoint `post()`, haremos la validación del jwt. Primero debemos importar el módulo. Lo primero que hacemos al crear la nota, es recuperar el token, como dijimos se lo enviamos a travéz de una cabecera http. Para recuperar una cabecera podemos poner un `req.get('authorization')` en el request, y con eso obtenemos la cabecera de autenticación del request.

Una vez que tenemos la autorización, evaluamos si la misma existe y además la autorización que está intentando utilizar el usuario para crear la nota, es la correcta, o sea, `Bearer`, capturamos el token que nos llega, como sabemos que el token está a partir de los siete caracteres podemos hacerlo con `authorization.substring(7)`, otra cosa que podríamos hacer es transformar ese string a un array y quedarnos con la segunda parte del array con `authorization.split(' ')[1]`.

Una vez que tenemos el token debemos decodificarlo, para esto utilizamos el módulo `jwt` y utilizamos el método `verify()`, el cual recibe como primer parámetro el token y como segundo parámetro la palabra secreta que utilizamos para crear el token.

Antes de seguir adelante verificamos si tenemos no tenemos `token` o no tenemos `decodedToken`, retornaremos un error de acceso.

Ahora si probamos crear una nota sin pasarle token nos debe dar el error que nosotros queremos que de. Ahora debemos solucionar esto y hacer lo lógica para que reciba el token.

En nuestras request debemos pasarle el token para que pueda crear la nota correctamente

```
POST http://localhost:3001/api/notes
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjVlYWNlOGI4MjMzMTE3Y2VhNzM1NiIsInVzZXJuYW1lIjoiSnVrbGkxMjkiLCJpYXQiOjE2MTg4ODIzMTF9.ZEOAL3LwDk1RymIxzw-q4hGmkT1jtNiYqvNWb8ZAu3w

{
  "content": "This is a new note with token authorization",
  "important": false
}
```

Este es un ejemplo de lo que lo podríamos pasar, siempre teniendo en cuenta que el token sea de un usuario logeado.

Importante, a partir de ahora, no necesitamos recibir más el id del usuario desde el payload sino que lo sacamos del token, que para eso lo tenemos. Finalmente nuestro código del post de nuestras notas quedaría de la siguiente manera.

![Users Create Note JWT](./img/users-create-note-jwt.png)

Haremos también que nuestro token a la hora de ser firmado tenga fecha de vencimiento, por ahora lo que haremos es que tenga un vencimiento de 7 días, por lo tanto nuestros usuarios cada 7 días se tendrán que volver a logear. Lo hacemos un nuestro archivo `login.js` en el apartado de firma de token.

```
// Sign Token
const token = jwt.sign(
  userForToken, 
  process.env.SECRET,
  {
    expiresIn: 60 * 60 * 24 * 7
  }  
)
```

IMPORTANTE: El *jwt* debe ser utilizado en páginas con certificado SSL, es decir, páginas que sea `https`, de otra manera, si lo utilizamos, por ej, en páginas `http`, nos podrían obtener el token y cifrarlo.

Haremos un middleware para poder reutilizar la lógica y requerimiento del token en otros endpoints. Haremos algo interesante que es **guardar información en la request**, esto quiere decir que, una vez que una ruta, pasa por un middleware, nosotros podemos guardar en la `request` cierta información. Esto nos viene muy bien porque no tenemos que preocuparnos de sacarla de otro sitio.

Una vez que recuperamos el `id` del usuario en nuestro middleware podemos mutar la request agregandole un elemento a el objeto, sí que con `req.userId = userId` mutamos el valor de esa key pasandole el `userId` que obtuvimos a partir del token.

Para utilizarlo en nuestras rutas, de notas por ej, se lo podemos pasar el middleware como parámetro a la ruta en la que lo queremos utilizar de la siguiente manera

```
notesRouter.post('/', userExtractor, async (req, res, next) => {
  ...
}
```

Ejecutará en orden, irá a la ruta que le indicamos, luego ejecuta el middleware (allí tendremos disponible el user id, a travéz de la request que será ejecutada a continuación), por último ejecuta nuestra *async function*.

Recuperamos el `userId` de la request y quedaría listo. A partir de aquí a cada ruta que le pongamos nuestro middleware quedarán 'protegidas' y ningún usuario sin token podrá tener esas acciones sobre esas rutas.

## ❌ Creando un diccionario para manejar errores

Si quitamos el manejo de error nuestro archivo de creación de notas, y le pasamos un token inválido nos dará un error `500`, esto pasa porque no estamos controlando este tipo de error en nuestro middleware de errors.

Podemos crear un diccionario de errores en nuestro middleware de manejo de errores, de esta forma nos queda un código más refactorizado

![Users Errors Dictionary](./img/users-errors-dictionary.png)

## 🔑 Sesión de Usuario en REACT

Para esta sección volvemos al FrontEnd, lo que haremos aquí es conseguir iniciar sesión, guardaremos el token, o sea, debemos presentar un formulario en el que se iniciará la sesión, una vez tenemos la sesión, recuperamos el token, lo guardamos, de esta forma tendremos la sesión del usuario en el token.

Si abrimos nuestra app del `FrontEnd` debería listarnos las notas que hemos creado en nuestra base de datos. Si quisiéramos crear una nota en este momento no nos dejaría, ya que no tenemos token.

En nuestro componente `App.js` crearemos un estado con `useState` para el usuario y el password que ingresará el usuario. Este estado lo debemos manipular mediente un formulario, así que creamos uno.

![Users React Login Form](./img/users-react-login-form.png)

De esta manera tenemos creada la interfaz para comunicarnos con nuestro backend y poder iniciar sesión.

Ahora debemos crear esta comunicación para enviarle los datos del login a nuestra api, para esto creamos en nuestra carpeta `services` del frontEnd, un archivo llamado `login.js`

```
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
```

Importamos axios para poder trabajar de una manera más sencillas nuestras peticiones, luego la url base será la de nuestro backend local y por último creamos la función que hará el post a nuestro backend con las credenciales que recibirá desde el front.

Ahora en nuestro archivo `App.js` importaremos nuestro servicio para el login y lo ejecutaremos cuando se haga submit al formulario.

Crearemos un nuevo estado llamado `user` para guardar los datos del usuario, una vez que se logea.

![Users Login Services](./img/users-login-services.png)

Como se ve en el código, el manejador `handleLogin` se encargará de guardar los datos en nuestro backend. Primero prevenimos su comportamiento habitual y le decimos que cuando se haga submit haga lo que viene debajo y no utilizar el atributo action de nuestro form. Luego guardamos nuestro usuario, que lo obtenemos de ejecutar nuestro servicio con las credenciales del usuario. Este usuario lo guardaremos en nuestro nuevo estado que creamos `setUser(user)`, ahora reseteamos el valor de los estados `username` y `password`. Por último en el control del error, en caso de que lo haya, seteamos nuestro estado de error con un mensaje y luego de 5 segundos lo quitamos.

De esta forma estamos haciendo que el usuario inicie sesión, pero esta sesión no la estamos haciendo perdurar en el tiempo. En este mometno estamos renderizando el formulario de login y el formulario para crear una nota a la misma vez, lo cual es absurdo porque si el usuario no inició sesión no debería poder crear una nota.

Haremos un renderizado condicional de ambos formularios, lo que determina la impresión de uno u otro es si tenemos usuario o no, por ende haremos un *conditional rendering* para este caso.

Es **importante** no crear componentes dentro de otros componentes, si tenemos algo que se ve igual que un componente, es mejor, hacer uno, separar y tener componentes reutilizables. Ya que al crear componentes dentros de otros podemos tener problemas de performance ya que cada vez que se renderice el componente también se va a renderizar el componentes que creamos dentro y eso no es una buena práctica.

Ahora que tenemos el renderizado condicional de los formularios, debemos habilitar la creación de notas para el usuario logeado, para esto iremos al método `addNote()`, en el método `create` debemos pasar el token como parámetro. Luego debemos ir al servicio de notas y agregar un segundo parámetro `{token}` para poder enviarselo en nuestro `post`.

Como sabemos, el token tiene que ser enviado en el header, así que crearemos una variable `config` y dentro le creamos una key `headers` que dentro tendrá una propiedad `Authorization` y como valor tendrá nuestro token

```
const create = (newObject, {token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}
```

Ahora si quisiéramos crear una nota deberíamos poder y si refrezcamos la página la nota debe estar creada en la base de datos.

## 🛢 Guardar usuario en LocalStorage

Como vemos al recargar no nos mantiene la sesión del usuario, si refrezcamos nos muestra el formulario de login, cuando en realidad el usuario ya se había logeado.

Para que la sesión persista lo que podemos hacer es guardar el token de la sesión en `localStorage`. Lo hacemos nuestro `handleLogin` de la siguiente manera

```
window.localStorage.setItem(
  'loggedNoteAppUser', JSON.stringify(user)
)
```

Utilizamos el método `stringify` para guardarlo como un string ya que localStorage necesita guardarlo de esa forma.

Para leer el localStorage crearemos un efecto con `usseEffect`

```
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    noteService.setToken(user.token)
  }
}, [])
```

Note: ponemos `window.localStorage` y no `localStorage` ya que consideramos buena práctica poner de donde salen los métodos, como localStorage es una propiedad global no tendrá problema en leerlo de cualquiera de las dos maneras, pero puede ser relevante poner de donde sale ese método que en este caso es el objeto `window`.

Entonces, si tenemos el JSON del usuario logeado lo recuperamos parseando el JSON, con el método `JSON.parse()` y una vez tenemos el objeto del usuario hacemos un `setUser()` del mismo y por último con el servicio de notas y su método `setToken()` le decimos el cual es el token del usuario.

Importante es que le pusimos como dependencia, al efecto, un array vacío, por ende solo se ejecutará una vez que cargue la página.

Ahora que tenemos el inicio de sesión podemos también hacer un logout, agregando un botón por deslogearnos y haciendo que manejador tenga el siguiente código

```
const handleLogout = () => {
  setUser(null)
  noteService.setToken(user.token)
  window.localStorage.removeItem('loggedNoteAppUser')
}
```

## 🍪 Cookies

En React no nos debemos preocupar de los ataques de inyecciones de scripts en nuestras aplicaciones. En el caso de nuestro form para crear notas, por ej, si un usuario nos pone `<script>alert('hello')</script>`, React lo detectará como un texto plano y no como un script. Esto es bueno porque previene ataques y agujeros de seguridad en nuestra aplicación.

Las cookies nos permites tener una sesión guardada, al igual que con localStorage, pero de manera más segura. Hay diferentes tipos de cookies.

Para el caso de nuestra apliación, usamos localStorage ya que no será necesaria tanta seguridad.

Lo ideal para apliaciones grandes sería utilizar **cookies**, **http only**, **cookies same site** y que sea **estricto**, esto hace mucho más complicado de desarrollar ya que hablamos de seguiridad.
