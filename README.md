# Juego de Emparejamiento - Arquitectura de Computadores

Este proyecto consiste en un juego interactivo de emparejamiento (matching) donde los usuarios deben relacionar conceptos de arquitectura de computadores con sus definiciones correctas mediante la funcionalidad de arrastrar y soltar (drag and drop).

## Características

- Interfaz moderna, "bubbly" y responsive que se adapta a diferentes tamaños de pantalla
- Funcionalidad de arrastrar y soltar (drag and drop) para emparejar conceptos
- Sistema de puntuación que registra respuestas correctas e incorrectas
- Temporizador de 180 segundos (3 minutos)
- Retroalimentación detallada al finalizar el juego
- 11 conceptos clave de arquitectura de computadores

## Cómo jugar

1. Haz clic en el botón "Comenzar Juego"
2. Arrastra cada concepto desde la columna izquierda hasta su definición correcta en la columna derecha
3. Intenta emparejar todos los conceptos correctamente antes de que se acabe el tiempo
4. Al finalizar, recibirás retroalimentación sobre tus respuestas incorrectas

## Tecnologías utilizadas

- HTML5
- CSS3 (con diseño responsive)
- JavaScript vanilla (sin frameworks)
- API de Drag and Drop de HTML5

## Despliegue

### Opción 1: GitHub Pages

1. Crea un repositorio en GitHub
2. Sube los archivos del proyecto al repositorio
3. Ve a "Settings" > "Pages"
4. Selecciona la rama "main" o "master" como origen
5. Guarda la configuración y espera unos minutos

### Opción 2: Vercel

1. Crea una cuenta en [Vercel](https://vercel.com/)
2. Conecta tu repositorio de GitHub
3. Importa el proyecto y despliégalo automáticamente

### Opción 3: Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Arrastra y suelta la carpeta del proyecto en el área designada de Netlify
3. Tu sitio se desplegará automáticamente

## Ejecución local

Para ejecutar el proyecto localmente, simplemente abre el archivo `index.html` en tu navegador o utiliza un servidor web local.

Ejemplo con Python:
```
python -m http.server 8080
```

Luego abre tu navegador y visita `http://localhost:8080`

## Personalización

Puedes personalizar los conceptos y definiciones editando el array `concepts` en el archivo `script.js`.

## Autor

Este proyecto fue desarrollado como parte de una actividad complementaria sobre arquitectura de computadores.
