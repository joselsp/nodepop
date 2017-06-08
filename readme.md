## Nodepop


App (API) de venta de artículos de segunda mano.

**- Inicialización de base de datos**

Eliminará la base de datos actual, insertará anuncios a través de **anuncios.json** y creará un usuario de pruebas (admin/admin).

```
$ npm run install_db
```


**- Arrancar aplicación**

```
$ npm run dev
```

### Usuarios

#### Registro de usuarios

Podremos registrar usuarios. La clave se guarda en un [hash][].
[hash]: https://www.npmjs.com/package/sha.js 

**URL:**   <https://www.devalphagt.com/apiv2/usuarios>

	Parametros POST
		
		- nombre
		- clave
		- email


### Anuncios

#### Lista de anuncios

Mostrará la lista de anuncios en base a nuestros parámetros introducidos. Será necesario estar autenticado (basicAuth).

**URL:**  <https://www.devalphagt.com/apiv2/anuncios>

	Parametros GET
	
		- nombre. Anuncios que empiecen por el nombre buscado.
		- tag. Anuncios que contengan el tag buscado.
		- venta. Si buscamos anuncio en venta(true) o búsqueda(false).
		- precio. 
			Ejemplo:
				○ 10-50 anuncios con precio incluido entre estos valores.
				○ 10- buscará los que tengan precio mayor o igual que 10.
				○ -50 buscará los que tengan precio menor o igual a 50.
				○ 50 buscará los que tengan precio igual a 50.
		- limit. Número máximo de anuncios devueltos.
		- skip. Saltar los n anuncios indicados.
		- fields. Campos que devolvera la consulta.
		- sort. Campo por el que se ordenarán los anuncios.
		
#### Lista de tags

Mostrará los tags disponibles en base de datos.

**URL:**  <https://www.devalphagt.com/apiv2/anuncios/tags>

#### Contenido estático

Mostrará la imagen de los anuncios en base de datos.

**URL:**  <https://www.devalphagt.com/images/anuncios/<nombreRecurso\>

### URL de despliegue

**URL:** https://www.devalphagt.com

**IP:** http://34.198.166.76/
