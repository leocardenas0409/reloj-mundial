# Reloj Mundial

Aplicación web que muestra la hora actual en las ciudades más emblemáticas de cada región del mundo: América, Europa, Asia, África y Oceanía.

Proyecto del curso Ingeniería de Software, desarrollado con control de versiones en Git y GitHub.

## Características

- 28 ciudades agrupadas por región.
- Hora, fecha y diferencia respecto a UTC, actualizadas cada segundo.
- Indicador de día o noche en cada ciudad.
- Filtro por región y búsqueda por nombre de ciudad o país.
- Cambio entre formato de 24 y 12 horas.
- Tema claro u oscuro según la preferencia del sistema.
- Horario de verano resuelto automáticamente por el navegador.

## Tecnologías

- HTML, CSS y JavaScript, sin librerías externas.
- API `Intl.DateTimeFormat` para zonas horarias.

## Cómo ejecutarlo

1. Clona el repositorio:

   ```bash
   git clone https://github.com/leocardenas0409/reloj-mundial.git
   ```

2. Abre la carpeta `reloj-mundial`.
3. Abre `index.html` en el navegador. No requiere instalación.

## Estructura

```
reloj-mundial/
├── index.html
├── src/
│   ├── cities.js   # Datos: regiones y ciudades
│   ├── app.js      # Lógica del reloj
│   └── style.css   # Estilos
├── README.md
├── LICENSE
└── .gitignore
```

## Cómo agregar una ciudad

Abre `src/cities.js` y añade una línea en la región correspondiente:

```js
{ name: "Bogotá", country: "Colombia", tz: "America/Bogota" }
```

La lista de zonas válidas está en la base de datos IANA de zonas horarias.

## Autores

- Leonardo Cardenas Carrasco
- [Segundo integrante]

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE`.
