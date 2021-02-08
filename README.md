# Bootcamp Full Stack Open

## 🧾 Índice de Contenido

* [Introducción 💻](#user-content--introducción)
  * [Inspección de una página web 🔎](#user-content--inspección-de-una-página-web)
  * [DOM (Document Object Model) 🏝](#user-content--dom-document-object-model)
  * [CSS (Cascading Style Sheets) 🎨](#user-content-css-cascading-style-sheets)
  * [Peticiones a un servidor ⏳](#user-content--peticiones-a-un-servidor)
  * [Formularios y HTTP Post 📑](#user-content--formularios-y-http-post)
  * [AJAX (Asynchronous JavaScript and XML) 🔃](#user-content--ajax-asynchronous-javascript-and-xml)
  * [Single Page Application (SPA) 🆒](#user-content--single-page-application-spa)
  * [Librerías JavaScript 📒](#user-content--librerías-javascript)
* [HTML (Hypertext Markup Language) 📙](#user-content--html-hypertext-markup-language)
  * [Anatomía de un elemento HTML 💀](#user-content--anatomía-de-un-elemento-html)
  * [Elementos Anidados 🎡](#user-content--elementos-anidados)
  * [Elementos en bloque vs Elementos en línea 🆚](#user-content--elementos-anidados)
  * [Elementos Vacíos 🗑](#user-content--elementos-vacíos)
  * [Atributos ✅](#user-content--atributos)
  * [Atributos Booleanos ✔❌](#user-content--atributos-booleanos)
  * [Omitir comillas entre el valor de los atributos 🚫](#user-content--omitir-comillas-entre-el-valor-de-los-atributos)
  * [Comillas simples o dobles? 🤔](#user-content--comillas-simples-o-dobles)
  * [Anatomía de un documento HTML 💀](#user-content--anatomía-de-un-documento-html)
  * [Espacio en blanco en HTML 🗨](#user-content--espacio-en-blanco-en-html)
  * [Imágenes 🖼](#user-content--imágenes)
  * [Encabezados 🖊](#user-content--encabezados)
  * [Párrafos 📄](#user-content--párrafos)
  * [Listas 📋](#user-content--listas)
  * [Links 🔗](#user-content--links)
  * [Entidades de referencia: Incluyendo caracteres especiales en HTML ⚠](#user-content--entidades-de-referencia-incluyendo-caracteres-especiales-en-html)
  * [Comentarios en HTML 💭](#user-content--comentarios-en-html)


# 💻 Introducción

Antes de comenzar a programar es importante conocer los principios y las partes que tiene el desarrollo de una aplicación web.

Prestamos atención en los siguientes puntos:
* Hacer un request
* Creación del árbol de elmentos y que es el árbol de elementos
* Diferentes lenguajes que componen una página web
* Herramienta que utilizamos para ver esto

## 🔎 Inspección de una página web

Tenemos diferenctes opciones para hacer esto. Tomamos como referencia la siguiente [aplicación web](https://studies.cs.helsinki.fi/exampleapp/).

Para inspeccionar una web tenemos tres métodos diferentes:
* En cualquier lugar de la página presionar click derecho y click en la opción que dice **"Inspeccionar"**
* En opciones del navegador (suele estar marcada con tres puntos uno arriba de otro) -> **Herramientas** -> **Herramientas para desarrolladores**
* Simplemente presionando la tecla F12

Para este apartado nos enfocaremos en dos pestañas, **Consola** y **Network** pero sobre todo en esta última.

En la pestaña network podemos inspeccionar las request que tiene esta web. Las **request** son los recursos que está cargando esta página para funcionar.

![Request image](./1-introduction/img/request.png)

Tenemos varios recursos que estan creando esta página web, el primero es la request principal, es la que cuando entramos a la url nos devuelve la request a la url https://studies.cs.helsinki.fi/exampleapp/, la misma es de tipo GET (tenemos diferentes tipos de peticiones), nos da un código de estado que nos dice que la url respondió bien.
Luego tendremos las cabeceras (Headers) que pueden ser de respuesta (Response Headers), nos da la información de la respuesta a la petición, y las de Request (Request Headers), estas nos dan información de lo que nosotros enviamos al servidor.

![Request headers](./1-introduction/img/request-headers.png)

Lo importante de esto es la pestaña que nos dice la respuesta de este request. Allí podemos ver la primera escencia de la web, el **HTML**, basicamente es el marcado de nuestra página web, este HTML es el que hace que nuestra web tenga información de algún tipo.

![Request response](./1-introduction/img/request-response.png)

En definitiva el HTML es lo que nos devuelve el servidor en el primer request.

También podemos observar otros request como la imágen que tiene la web y el favicon del mismo.

Dentro de la pestaña network también tenemos un checkbox para decirle al navegador si queremos tener activada o desactiva la cache.
La **cache** nos sirve para almacenar datos y que estos no se vuelvan a cargar cuando visitamos un sitio que ya habíamos visitado anteriormente. Esto optimiza la carga de recursos. Para el desarrollo varias veces la tendremos deshabilitada porque queremos tener la última versión del sitio que estamos desarrollando y no que nos queden cosas viejas que queremos cambiar.

Ahora si abrimos el link a notas de nuestra web nos lleva a otra página con nuevos recursos, lo recursos que trae son los básicos que puede contener una página web.

El primero que carga cumple la misma función que el anterior, nos trae el HTML de nuestra web. Pero el segundo que nos trae es la siguiente pata de la web, el **css**.

Es el lenguaje que le da estilo a la web, en este caso son 8 líneas css.

![Request css](./1-introduction/img/request-css.png)

Por otro lado tenemos el javaScript, lo que hace es un petición asíncrona, mediante ajax, al servidor y cuando lo consigue pinta el contenido en la pantalla.

También tenemos un documento en formato JSON (JavaScript Object Notation) que nos trae todas las notas que varemos en la página en formato JSON (formato que suena familiar por el parecido que tiene con los objetos).

## 🏝 DOM (Document Object Model)

Es el árbol de elementos de nuestra página web. Se dice que es un árbol porque tiene una raíz que es el html y luego de allí se desprenden todos los elementos del documento (ramas).

Con el DOM podemos ver, modificar, añadir y/o escuchar eventos, cuando ocurre una acción del usuario.

Si vemos el javascript de la página de notas tenemos un javascript que como dijismos hace una petición asíncrona mediante AJAX.

![DOM ajax](./1-introduction/img/dom-ajax.png)

Dejaremos de lado la petición, pero si observamos la data, vemos que la recorre, luego crea un elemento ``li`` por cada nota recorrida. Además el elemento ``li`` lo agrega al ``ul`` que creó antes del recorrido con la clase **notes**. Al elemento ``li`` le crea un nodo de tipo texto y le agrega el contenido de la nota.

De esta manera es como se manipula el árbol de elementos DOM.

Podemos observar, mediante la **consola**, que cosas tiene el DOM, poniendo ``document.`` nos lista todas las cosas que podemos hacer con el documento.

Otra prueba que podemos hacer es revisar la cantidad de anchors que tenemos en una web, esto lo hacemos con ``document.querySelectorAll('a')`` y nos listará todos los anchor que tiene la página. 

En caso de querer seleccionar un solo elemento lo podemos hacer con ``document.querySelector('a')`` y nos mostrará el primer anchor que tiene la página.

También podemos cambiar el contenido de un elemento html, esto lo hacemos con ``document.querySelector('a').innerHTML = '<strong>Cambiar por esto</strong>'`` esto nos cambia el HTML directamente de lo que había en ese elemento.

En caso de querer cambiar solamente el texto y no todo el contenido html, podemos hacer lo siguiente ``document.querySelector(a).textContent = 'Cambia texto por esto'``.

Como esta hay muchas formas más de modificar el DOM.

## 🎨 CSS (Cascading Style Sheets)

Una de las cosas importantes que nos dan las herramientas de desarrollo es poder modificar el CSS de la página mediante el inspector.

Si miramos los request de nuestra web de notas vemos que tenemos un archivo ``main.css`` que contiene los estilos que tendrá nuestra web.

La pestaña **Elementos** permite ver los atributos de un elemto html.

![CSS](./1-introduction/img/css.png)

Allí se ve como el elemento con la clase ``container`` tiene un relleno de ``10px`` y un border sólido de `1px`.

Ahí mismo donde están definidos los estilos podemos modificar, para hacer pruebas, los estilos nuevos que queremos probar. Una vez recargada la pàgina estos datos se pierden pero es de mucha utilidad cuando queremos probar si una idea funciona antes de llevarla al código.

## ⏳ Peticiones a un servidor

Cuando pedimos un recurso lo que estamos haciendo, como clientes, es hacer una petición a un servidor. En el siguiente esquema tenemos lo que pasa cuando entramos a la página web.

![Server Request](./1-introduction/img/request-to-server.png)

Podemos ver como cuando ingresamos al sitio tenemos la primer request que es la pàgina de notas, llega al servidor y lo que hace este es devolver el código HTML. Luego va a solicitarle al servidor el css, el servidor devuelve el css. Y lo mismo hace con el javascript.

Hasta ahí era el browser el que se encargaba de hacer las peticiones, como el JavaScript tiene la petición de las notas, es este el que se encargará de hacer el pedido de las notas al `data.json`, hace una petición `GET` al servidor. El servidor le devuelve el JSON de las notas, una vez obtenido los datos el javascript pinta los datos en el navegador y es ahí cuando podemos ver las notas.

Las peticiones ocurren algunas en **paralelo** y otras en **cascada**. Una vez que se carga el html podemos ver que el es el que dice que tiene que cargar el css y el js que tiene en el head. Entonces esas dos peticiones si están ocurriendo en paralelo, tanto el css como el js se cargan de esa manera, por más que en el diagrama parezca que no.

![Load](./1-introduction/img/load.png)

Los carga en paralelo porque una vez cargado el html si que ahí sabe cuales son los recursos que va a necesitar, pero hasta entonces tiene que esperar a la request principal. También podemos observar como el json se carga luego que termina de cargar el javascript. 

Por esto es que algunas peticiones serán cargadas de forma paralela y otras en cascada.

Como vemos en la imagen el favicon es un recurso que se carga al final, esto es porque no es un recurso necesario para que el sitio funcione correctamente.

Los recursos tienen diferentes prioridades, podríamos añadir otra pestaña **Priority** para ver la prioridad para cargar que tiene cada recurso. El html y el css son los que tienen la prioridad más alta, ya que son los que hacen que la página se pueda mostrar correctamente, luego le seguirá el javascript.

Como el css afecta al DOM necesitamos que el css sea cargado antes que el javascript, por si queremos cambiar estilos desde javascript, para no cambiar un elemento desde javascript antes de que css sea cargado.

En HTML tenemos diferentes etiquetas para cambiarles la prioridad a un recurso y darle una pista al navegador que recurso es más prioritario. Igualmente el navagador hace este trabajo por nosotros y no necesita que le indiquemos la prioridad de cada elemento.

## 📑 Formularios y HTTP Post

Los formularios son una parte muy importante en el desarrollo web ya que son los que nos permiten enviar información al servidor.

Se vió como con una petición de tipo GET podemos recuperar las notas del servidor, pero si queremos crear una nota? para esto mismo existen los formularios como forma básica de lograr la comunicación con el servidor para crear cosas.

El tipo de petición que utilizamos para crear datos en un servidor se denomina **POST**.

![Form HTTP Post](./1-introduction/img/form-http-post.png)

Como se dijo el formulario nos va a servir para enviar datos a un servidor.

En la etiqueta `<form>` le vamos a indicar la acción que tendrá con el atributo `action=""` y el método que tendrá, que será `method="POST"`. 

La acción será una dirección que el servidor debe comprender de forma que sepa leer lo que le enviamos a travéz del primer `input`  en su atributo `name` que es la nota. Una vez que le llega el recurso lo puede guardar en la base de datos.

Como prueba podemos enviar una nota a travéz del formulario que se encuentra en nuestra web de notas.

Al enviar una nota, se recargará, irá a la página donde crea nuestra nota y luego hará una redirección hacia la página de notas. Veremos que lo primero que se hizo fué una petición de tipo POST y podremos ver cual fue el dato que enviamos a la base de datos. Si miramos el final de las notas veremos nuestra nota creada.

![Post Request](./1-introduction/img/post-request.png)

## 🔃 AJAX (Asynchronous JavaScript and XML)

Son peticiones asíncronas que se hace a un servidor para recuperar o guardar datos, a grandes razgos.

Volviendo al ejemplo de crear una nota podríamos utilizar AJAX para no tener que recargar la página y hacer todo el proceso de crear la nota y recuperar las mismas.

Con AJAX simplemente podríamos hacer que cada vez que se crea una nota javascript se encargue, mediante AJAX de pedir todas las notas, y así nos ahorramos el tiempo de espera que conlleva recargar una página.

Actualmente existen tecnologías más avanzadas que nos permiten hacer estas peticiones de forma más sencilla.

## 🆒 Single Page Application (SPA)

Son páginas que no refrezcan cada vez que se necesita navegar o visualizar contenido diferente.

Lo que hacen es cambiar información que tiene actualmente en el DOM por información nueva. Actualiza la información que hay en DOM sin necesidad de refrezcar nada.

| ![SPA Notes form](./1-introduction/img/spa-notes-form.png) | ![SPA request](./1-introduction/img/spa-request.png) |
| ------ | ------ |

Como se ve, en este caso el formulario no tiene una acción y tampoco un método, sino un `id` con el que va a ser identificado desde javascript.

Lo que ocurre ahora cuando creamos un nota es que no refrezca la página sino que lo crea desde AJAX y recupera todas las notas con el mismo procedimiento.

Con esto evitamos el recargado de la página y con ello el recargado de todos los recursos nuevamente. Con AJAX solo nos traemos un recurso, que es la creación de una nota.

Si revisamos el javascript podemos notar algunos cambios.

| ![JS form](./1-introduction/img/js-form.png) | ![JS request](./1-introduction/img/js-request.png) |
| ------ | ------ |

Podemos ver como se guarda el formulario en una variable para luego saber el momento en el que se hace submit del mismo y poder enviar el contenido de ese form como una nota.

En la segunda imagen se ve el código utilizado para realizar la petición POST y así enviar la nota hacia el servidor mediante el método POST.

## 📒 Librerías JavaScript

Lo que venimos viendo hasta ahora de JavaScript es lo que denominamos **Vanilla JavaScript**, es código nativo del lenguaje, es de mucha utilidad e importancia saberlo pero tenemos herramientas que nos facilitan el uso del lenguaje de programación.

Una de las librerías más utilizadas es **jQuery**. Esta librería ya no es la solución por defecto en la que deberíamos pensar cuando queremos hacer una aplicación con javascript. Es interesante aprenderlo ya que hay muchísimas webs que están hechas con jQuery. Tiene una forma de trabajar bastante antigua pero que en su momento ahorró mucho trabajo y simplificó el desarrollo.

JQuery fue precursor de muchos cambios que hoy podemos ver en el lenguaje JavaScript, un ejemplo claro es el `document.querySelector()` que surge gracias a jQuery. Cambió la forma de manipular el DOM.

Luego de jQuery el front-end fue creciendo cada vez más, de ahí es que aparecen nuevas librerías como **Backbone JS** que nos daba una estructura para crear una aplicación web utilizando un patrón en concreto, también nos daba modelos, vistas, colecciones, controladores, pero backbone no es lo que se utiliza actualmente.

Luego de este último aparecen los Fremeworks modernos como lo son **React JS**, **Vue JS**, **Angular**, **SVELTE**.

⚛ El framework que utilizaremos en el bootcamp es **React JS** ya que actualmente es el más buscado y utilizado. Es el framework por excelencia para construir interfaces de usuario.

# 📙 HTML (Hypertext Markup Language)

**HTML** no es un lenguaje de programación, es un lenguaje de marcado, en el cual se define la **estructura** del contenido de una página web. HTML consiste en una serie de **elementos**, los cuales puodríamos usar para encerrar o envolver diferentes partes del contenido.

Las **etiquetas** pueden hacer de una palabra o una imagen un hipervínculo a otro sitio, podríamos cambiar palabras a cursiva, agandar o achicar la letra. 

Para el siguiente contenido:

`Learning HTML from MDN Web Docs`

Si quisiéramos que la línea esté sola, podríamos especificarle que es un párrafo y envolverlo dentro de una etiqueta de párrafo.

`<p>Learning HTML from MDN Web Docs</p>`

Las etiquetas en HTML son insensibles a las mayúsculas o minúsculas, podríamos escribir la etiqueta `<title>`, como `<title>`, `<TITLE>`, `<Title>`, `<TiTlE>`, etc. y funcionarían. Aunque, como buena práctica escribimos las etiquetas HTML en minúsculas por consistencia, legibilidad y otras razones.

## 💀 Anatomía de un elemento HTML

Exploramos la siguiente imágen extrayendo las partes del elemento HTML párrafo presentado anteriormente.

![HTML Anatomy](./2-html/img/html-anatomy.png)

* **Etiqueta de apertura**: Consiste en el nombre del elemento (en este caso **p**), envuelto en paréntesis angulares (o signos de mayor y menor). Es aquí donde el elemento comienza a tomar efecto, en este caso, donde comienza el párrafo.

* **Etiqueta de cierre**: Este es igual que la etiqueta de apertura, excepto que incluye un *slash* entes del nombre del elemento. Indica la finalización del elemento, en este caso, donde termina el párrafo. No agregar etiqueta de cierre es uno de los errores más comunes cuando comenzamos a trabajar con HTML (incluso con experiencia nos podría pasar 😅), ya que esto puede dar errores extraños.

* **El contenido**: Es el contenido del elemento, en este caso es sólo texto.

* **El elemento**: La etiqueta de apertura, el contenido y la etiqueta de cierre juntos, comprenden el elemento HTML.

## 🎡 Elementos Anidados

Podemos poner elementos dentro de otros elementos, es es conocido como **anidamiento**. Si quisiéramos remarcar que estamos aprendiendo HTML podríamos envolverlo en un elemento `<strong>` lo cual hará que la palabra HTML quede resaltada en negrita.

Debemos tener cuidado, en estos casos, de abrir y cerrar bien nuestros elementos, en este caso el elemento `<p>` será padre del elemento `<strong>` por tanto, el código HTML debe quedar de la siguiente manera

`<p>Learning <strong>HTML</strong> from MDN Docs</p>`

## 🆚 Elementos en bloque vs Elementos en línea

Son dos categorías de elementos que debemos conocer

* **Elementos en bloque:** Forman un bloque visible en una página. Estos aparecen en una nueva línea del elemento que les precede. Cualquier contenido de bloque que le sigue a un elemento también aparece en una nueva línea. Son los elementos estructurales de la página, por ejemplo, un elemento de bloque podría estar representado por `headings`, `paragraphs`, `lists`, `navigation menus`, o `footers`. Un elementos de bloque, no puede estar anidado dentro de un bloque en línea, pero si podría estar anidado dentro de un elemento de bloque.

* **Elementos en línea:** Están contenidos dentro de un elemento de bloque y se encuentran en pequeñas partes del contenido de una página. Un elemento en línea no aparece en una nueva línea. Suele utilizarse con texto, por ejemplo, un elemento `<a>` para crear un link, y elementos como `<em>` o `<strong>` para crear énfasis.

En el siguiente código

```
<em>first</em><em>second</em><em>third</em>

<p>fourth</p><p>fifth</p><p>sixth</p>
```

`<em>` es un elemento en línea. Como se puede ver los primeros tres elementos estarán en la misma línea, sin espacio entre ellos. Por otra parte, `<p>`, que es un elemento de bloque, aparecerá en una nueva línea, con espacio debajo de ellos (el espacio se debe al estilo *CSS* asignado por el navegador a los párrafos).

Esto renderizará nuestro navegador

***

*fistsecondthird*

fourth

fifth

sixth

***

Visite [Elementos en Bloque](\\https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) para ver la lista de elementos en bloque o [Elementos en línea](\\https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements) para ver la lista de todos los elementos en línea.

## 🗑 Elementos Vacíos

Algunos elementos no tienen contenido, estos son llamados **elementos vacíos**. Uno de los ejemplos básicos es una imagen

`<img src="img/test-image.png alt="My test image"`

Contiene dos atributos, pero este elementos no se cierra, esto es porque una imagen no tendrá contenido el cual pueda ser encerrado, ya que lo que se quiere renderizar será una imagen.

## ✅ Atributos

Los elementos también pueden tener **atributos** que lucen de la siguiente manera

![HTML Attribute](./2-html/img/html-attribute.png)

Los atributos son contenido extra que contienen información sobre el elemento que no queremos que aparezca como contenido.

Aquí `class` es el nombre del atributo y `editor-note` es el valor del atributo.

El atributo clase puede ser utilizado para darle un identificador al elemento, que NO será único (otros elementos pueden tener la misma clase como valor), la cual se puede utilizar, por ejemplo, para darle un estilo al elemento, además de otras cosas.

## ✔❌ Atributos Booleanos

A veces veremos atributos escritos que no tienen valor. Estos son llamados *booleanos*. Estos atributos pueden tener un solo valor, el cual, generalmente, tiene el mismo valor que el nombre del atributo. Consideremos el atributo `disabled`, el cual puedes asignar a un elemento `input` dentro de un form. Utilizamos este atributo para deshabilitar los elementos `input` y que el usuario no pueda realizar un entrada en el mismo (no puede escribir)

`<input type="text" disabled="disabled">`

Como forma de abreviar esto, también es aceptado escribirlo de la siguiente manera

```
<!-- usar el atributo disabled para hacer que el usuario no pueda escribir en el input -->
<input type="text" disabled>

<!-- Escribir en el input está permitido ya que no está el atributo disabled -->
<input type="text">
```

Este HTML reproduce el siguiente resultado

![HTML Boolean Attr](./2-html/img/html-boolean-attr.png)

## 🚫 Omitir comillas entre el valor de los atributos

Omitir comillas dentro del valor del atributo está permitido en algunos casos, pero puede, también, romper nuestro markup, en otros casos. Es por esto que como buena práctica siempre deberíamos escribir el valor de nuestros atributos entre comillas, para ahorrarnos problemas en el futuro. Esto es bueno tenerlo en cuenta ya que en algún momento podríamos ver una página con atributos que no estén entre `""`.

## 🤔 Comillas simples o dobles?

Hasta ahora hemos puesto siempre el valor de los atributos entre comillas dobles. Aunque podríamos ver otros códigos HTML escritos con comillas simples `''`. Esto es cuestión de estilo, podemos elegir la que nos siente mejor. Ambas son equivalentes.

```
<a href="http://www.example.com">A link to my example.</a>

<a href='http://www.example.com'>A link to my example.</a>
```

**NO** se pueden mezclar comillas dobles con comillas simples.

Sin embargo, si usamos un tipo de comillas, podemos incluir otro tipo de comillas dentro del valor del atributo

`<a href="http://www.example.com" title="Isn't this fun?">A link to my example.</a>`

Para usar comillas del mismo tipo dentro de comillas debemos usar [Entidades HTML](#) como en el ejemplo siguiente

`<a href='http://www.example.com' title='Isn&apos;t this fun?'>A link to my example.</a>`

## 💀 Anatomía de un documento HTML

Los elementos no son útiles por si solos, debemos convinarlos para formar una página HTML. Aquí tenemos un ejemplo de un documento HTML básico.

![HTML Document Anatomy](./2-html/img/html-document-anatomy.png)

Entonces, aquí vemos lo siguiente:

* `<!DOCTYPE html>` - Es la apertura obligatoria. En estos tiempos no hace mucho, aunque es necesario para asegurarnos de que el documento se comporte de manera correcta.

* `<html></html>` - Es el elemento que envolverá todo el contenido de la página y a veces se lo conoce como el elemento root de la misma.

* `<head></head>` - Este elemento actúa como contenedor de todo lo que queremos incluir en el HTML pero que a su vez no será visto como contenido del mismo. Incluye cosas como keywords, descripción de la página (como tú quieres que aparezca la página en los motores de búsqueda), CSS para darle estilo al contenido, seteo de declaración de caracteres y más.

* `<meta charset="utf-8">` - Este elemento define el conjunto de caracteres que debe usar nuestro documento, UTF-8, que incluye la mayoría de los caracteres de la gran mayoría de los idiomas escritos. De esta forma no tendremos problemas con nuestro contenido escrito.

* `<title></title>` - Define el título de nuestra página, el cual aparecerá en el tab de nuestro navegador.

* `<body></body>` - Es el contenedor de *todo* el contenido visible por los usuarios cuando visitan nuestra página.

## 🗨 Espacio en blanco en HTML

Como se puede notar en los ejemplos que venimos manejando, el espacio en blanco se encuantra en varias partes del código. Esto es opcional, los siguientes dos códigos son equivalentes

```
<p>Dogs are silly.</p>

<p>Dogs        are
         silly.</p>
```

No importa cuanto espacio en blanco uses dentro del contenido de un elemento HTML (el cual puede tener uno o más espacios de caracteres y también saltos de línea), el HTML parseado reduce la secuencia de espacios en blanco a un espacio en blanco cuando renderiza el código.

El espacio en blanco, entonces, lo utilizamos por legibilidad. Es más fácil de entender nuestro código si está mejor formateado.

En nuestro HTML tenemos cada elemento anidado con un *indentado* de dos espacios más que el de fuera.

## 🖼 Imágenes

`<img src="img/test-image.png alt="My test image">`

Este elemento incrusta una imagen dentro de nuestra página en la posición que queramos. Esto lo hacemos mediante el atributo `src` (*source*), el cual contiene el path de nuestro archivo de imagen.

Incluímos también, el tributo `alt` (*alternative*). Es una muy buena práctica utilizarlo, principalmente por accesibilidad para los usuarios. Este atributo tiene como valor un texto para los usuarios que no pueden visualizar nuestra imagen, esto se puede dar por las siguientes razones

1. Tienen discapacidad visual. Los usuarios con discapacidad visual, suelen utilizar herramientas para leer el texto alternativo.

2. Algo salió mal y la imagen no se mostró. Porque su path no es el correcto o la imagen no fue encontrada en el servidor.

Es importante tener un buen texto alternativo en nuestras imágenes, que le explique correctamente al usuario de que se trata la misma.

## 🖊 Encabezados

Los elementos de encabezado permiten especificar que cierto contenido de nuestra página es un título o sub-título. HTML contiene **seis** niveles de encabezado, `<h1>`-`<h6>`.

```
<h1>My main title</h1>
<h2>My top level heading</h2>
<h3>My subheading</h3>
<h4>My sub-subheading</h4>
```

A tener en cuenta. No usar el nivel uno de heading para hacer que los textos se vean más grandes o resaltados, ya que estos son usados para *accesibilidad* y *otras razones como SEO*. Hay que tener una secuencia coherente de títulos en nuestra página, sin saltarnos niveles.

## 📄 Párrafos

Estos elementos nos sirven para contener párrafos de texto, los usamos con frecuencia cuando queremos poner texto normal como contenido

`<p>This is a single paragraph</p>`

## 📋 Listas

Los tipos de listas más comunes son las **listas ordenadas** (ordered lists - *ol*) y las **listas desordenadas** (unordered lists - *ul*)

1. **Unordered lists** las utilizamos cuando el orden de los elementos no nos importa. Son representadas con el elemento `<ul>`

2. **Ordered lists** las usamos cuando nos importa el orden de los elementos. Son representadas con el elemento `<ol>`

```
<p>At Mozilla, we`re a global community of</p>

<ul>
  <li>technologists</li>
  <li>thinkers</li>
  <li>builders</li>
</ul>

<p>working together...</p>
```

## 🔗 Links

Los links son muy importantes, estos hacen que la web sea web. Para agregar un link utilizamos el elemento `<a>` (anchor). Para hacer que el texto de un párrafo sea un link hacemos lo siguiente

1. Elegimos algún texto, elegiremos el texto "Click me to go to google"

2. Encierra ese texto dentro de un elemento `<a>`

`<a>Click me to go to google</a>`

3. Ponle al elemento `a` un atributo `href`

`<a href="">Click me to go to google</a>`

4. Pon el valor del atributo con la dirección web que quieras que el link lleve.

`<a href="https://www.google.com">Click me to go to google</a>`

Luego de crear el link hagamos click en el para asegurarnos que nos lleva al sitio donde queremos ir.

Se le llama `href` al atributo porque viene de **h**ypertext **ref**erence (refrencia de hipertexto).

## ⚠ Entidades de referencia: Incluyendo caracteres especiales en HTML

En HTML, `<`, `>`, `"`, `'` y `&` son caracteres especiales. Ellos son parte de la sintáxis HTML. Si quisiéramos utilizar un ampersand o un signo de menor-que, utilizamos los códigos especiales que hacen referencia a los caracteres especiales. Cada referencia de caracter comienza con un ampersand (*&*) y termina con punto y coma (*;*)

| Literal character | Character reference equivalent |
| ----------------- | :----------------------------: |
| <                 | `&lt;`                         |
| >                 | `&gt;`                         |
| "                 | `&quot;`                       |
| '                 | `&apos;`                       |
| &                 | `&amp;`                        |

El caracter de referencia equivalente podríamos recordarlo fácilmente ya que el texto usado es una abreviación de su nombre (en inglés). Puedes leer más sobre entidades HTML y la lista de cada una de las entidades [aquí](\\https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references).

En el siguiente ejemplo tenemos dos párrafos

```
<p>In HTML, you define a paragraph using the <p> element.</p>

<p>In HTML, you define a paragraph using the &lt;p&gt; element.</p>
```

En output de este código vemos como en el primer caso nuestro código se rompe, el navegador interpreta que un nuevo elemento párrafo está comenzando, por lo tanto (como vimos antes de elementos en bloque vs en línea), la segunda parte del texto queda debajo de este haciendo que renderice algo que no queremos.

```
In HTML, you define a paragraph using the

element.

In HTML, you define a paragraph using the <p> element.
```

Este es un muy buen caso de uso de una *entidad HTML*.

## 💭 Comentarios en HTML

HTML tiene un mecanismo para escribir comentario en nuestro código. El navegador ignora los comentarios y definitivamente, los comentarios no son visibles por el usuario.

El propósito de los comentarios es que tú, como desarrollador, incluyas notas en el código explicando tu lógica o código. Esto es muy útil para nosotros cuando estamos mucho tiempo sin trabajar en un proyecto y regrasamos, observamos los comentarios y recordamos de manera mucho más fácil porque hicimos lo que hicimos y se hace mucho más sencillo de mantener. También los comentarios son muy importantes cuando son varias las personas que trabajan con un mismo código.

Para escribir un comentario HTML, encierras el contenido en estos marcadores especiales `<!--` y `-->`

```
<p>I'm not inside a comment</p>

<!-- <p>I am!</p> -->
```

En este caso solo veremos en pantalla el párrafo que contiene `I'm not inside a comment`.
