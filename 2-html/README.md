# 📙 HTML (Hypertext Markup Language)

Es un lenguaje de marcado, en el cual se define la **estructura** del contenido de una página web. HTML consiste en una serie de **elementos**, los cuales puodríamos usar para encerrar o envolver diferentes partes del contenido.

Las **etiquetas** de encierre puede hacer de una palabra o una imagen un hipervínculo a otro sitio, podríamos cambiar palabras a cursive, agandar o achicar la letra. Para el siguiente contenido:

`Learning HTML from MDN Web Docs`

Si quisiéramos que la línea esté sola, podríamos especificarle que es un párrafo y envolverlo dentro de una etiqueta de párrafo.

`<p>Learning HTML from MDN Web Docs</p>`

## 💀 Anatomía de un elemento HTML

Exploramos la siguiente imágen extrayendo las partes del elemento HTML párrafo presentado anteriormente.

![HTML Anatomy](./img/html-anatomy.png)

* **Etiqueta de apertura**: Consiste en el nombre del elemento (en este caso **p**), envuelto en paréntesis angulares (o signos de mayor y menor). Es aquí donde el elemento comienza a tomar efecto, en este caso, donde comienza el párrafo.

* **Etiqueta de cierre**: Este es igual que la etiqueta de cierre, excepto que incluye un *slash* entes del nombre del elemento. Indica la finalización del elemento, en este caso, donde termina el párrafo. No agregar etiqueta de cierre es uno de los errores más comunes cuando comenzamos a trabajar con HTML (incluso con experiencia nos podría pasar 😅), ya que esto puede dar errores extraños.

* **El contenido**: Es el contenido del elemento, en este caso es sólo texto.

* **El elemento**: La etiqueta de apertura, el contenido y la etiqueta de cierre juntos, comprenden el elemento HTML.

Los elementos también pueden tener **atributos** que lucen de la siguiente manera

![HTML Attribute](./img/html-attribute.png)

Los atributos son contenido extra que contienen información sobre el elemento que no queremos que aparezca como contenido.

Aquí `class` es el nombre del atributo y `editor-note` es el valor del atributo.

El atributo clase puede ser utilizado para darle un identificador al elemento, que NO será único (otros elementos pueden tener la misma clase como valor), la cual se puede utilizar, por ejemplo, para darle un estilo al elemento, además de otras cosas.

## 🎡 Elementos Anidados

Podemos poner elementos dentro de otros elementos, es es conocido como **anidamiento**. Si quisiéramos remarcar que estamos aprendiendo HTML podrámos envolverlo en un elemento `<strong>` lo cual herá que la palabra HTML quede resaltada en negrita.

Debemos tener cuidado, en estos casos, de abrir y cerrar bien nuestros elemntos, en este caso el elemtnos `<p>` será padre del elemento `<strong>` por tanto, el código HTML debe quedar de la siguiente manera

`<p>Learning <strong>HTML</strong> from MDN Docs</p>`

## 🗑 Elementos Vacíos

Algunos elementos no tienen contenido, estos son llamados **elementos vecíos**. Uno de los ejemplos básicos es una imagen

`<img src="img/test-image.png alt="My test image"`

Contiene dos atributos, pero este elementos no se cierra, esto es porque una imagen no tendrá contenido el cual pueda ser encerrado, ya que lo que se quiere poner en esa etiqueta va a ser una imagen.

## Anatomía de un documento HTML

Los elementos no son útiles por si solos, debemos convinarlos para formar una página HTML. Aquí tenemos un ejemplo de un documento HTML básico.

![HTML Document Anatomy](./img/html-document-anatomy.png)

Entonces, aquí vemos lo siguiente:

* `<!DOCTYPE html>` - Es la apertura obligatoria. En estos tiempos no hace mucho aunque es necesario para asegurarnos de que el documento se comporte de manera correcta.

* `<html></html>` - Es el elemento que envolverá todo el contenido de la página y a veces se lo conoce como el elemento root de la página.

* `<head></head>` - Este elemento actúa como contenedor de todo lo que queremos incluir en el HTML pero que a su vez no será visto como contenido del mismo. Incluye cosas como keywords, descripción de la página (como tú quieres que aparezca la página en los motores de búsqueda), CSS para darle estilo al contenido, seteo de declaración de caracteres y más.

* `<meta carset="utf-8">` - Este elemento define el conjunto de caracteres que debe usar nuestro documento, UTF-8, que incluye la mayoría de los caracteres de la gran mayoría de los idiomas escritos. De esta forma no tendremos problemas con nuestro contenido escrito.

* `<title></title>` - Define el título de nuestra página, el cual aparecerá en el tab de nuestro navegaodr.

* `<body></body>` - Es el contenedor de *todo* el contenido visible por los usuarios cuando visitan nuestra página.

## 🖼 Imágenes

`<img src="img/test-image.png alt="My test image">`

Este elemento incrusta una imagen dentro de nuestra página en la posición que queramos. Esto lo hacemos mediante el atributo `src` (*source*), el cual contiene el path de nuestro archivo de imagen.

Incluímos también, el tributo `alt` (*alternative*). Es una muy buena práctica utilizarlo, principalmente por accesibilidad para los usuarios. Este atributo tiene como valor un texto para los usuarios que no pueden visualizar nuestra imagen, esto se puede dar por las siguientes razones

1. Tienen discapacidad visual. Los usuarios con discapacidad visual, suelen utilizar herramientas para leer el texto alternativo.

2. Algo salió mal y la imagen no se mostró. Porque su path no es el correcto o la imagen no fue encontrada en el servidor.

Es importante tener un buen texto alternativo en nuestras imágenes, que le explique correctamente al usuario de que se trata la misma.

## 🖊 Encabezados

Los elemtnos de encabezado permiten especificar que cierto contenido de nuestra página es un título o sub-título. HTML contiene **seis** niveles de encabezado, `<h1>`-`<h6>`.

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
