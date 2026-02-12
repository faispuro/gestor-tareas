# 📋 Gestor de Tareas – ToDo App

Aplicación web desarrollada con HTML5, CSS3 y JavaScript puro para gestionar tareas con validaciones, filtros, ordenamiento y persistencia en localStorage.

---

## 🚀 Funcionalidades

✔ Crear tarea con:
- Título (mínimo 3 caracteres)
- Prioridad obligatoria (Baja / Media / Alta)
- Fecha límite opcional (no permite fechas pasadas)
- Descripción opcional

✔ Validaciones manuales en JavaScript  
✔ Fecha mínima automática (no permite elegir fechas anteriores a hoy)  
✔ Marcar tarea como completada  
✔ No permite editar tareas completadas  
✔ Editar título, prioridad, fecha y descripción  
✔ Validación de formato de fecha al editar (YYYY-MM-DD)  
✔ Eliminar tarea con confirmación  
✔ Filtros dinámicos:
  - Todas
  - Pendientes
  - Completadas
    
✔ Botón activo visual en el filtro seleccionado  
✔ Mensajes dinámicos cuando no hay tareas  
✔ Contadores automáticos (Total / Completadas / Pendientes)  
✔ Ordenamiento por fecha (Ascendente / Descendente)  
✔ Persistencia en localStorage  

---

## 🎨 Sistema de Prioridades

Las tareas cambian visualmente según prioridad:

- 🟢 Baja → Verde  
- 🟡 Media → Amarillo  
- 🔴 Alta → Rojo  

Las clases se asignan dinámicamente desde JavaScript.

---

## 🛠 Tecnologías utilizadas

- HTML5 semántico (header, main, section, footer)
- CSS3 responsive
- JavaScript (DOM, eventos y validaciones)
- LocalStorage

---

## 📂 Estructura del Proyecto

- index.html  
- styles.css  
- app.js  

---

## ⚙ Instalación y uso

### Opción 1 – Descargando el proyecto
1. Descargar el repositorio en formato ZIP.
2. Extraer los archivos.
3. Abrir `index.html` en el navegador.

### Opción 2 – Clonando con Git
1. Clonar el repositorio:
   git clone https://github.com/faispuro/gestor-tareas.git

2. Ingresar a la carpeta del proyecto:
   cd TU-REPOSITORIO

3. Abrir `index.html` en el navegador.

No requiere instalación de dependencias ni servidor.

---

## 🌐 Deploy

La aplicación puede desplegarse en:
- GitHub Pages
- Vercel

---

## 👨‍💻 Autor

Francisco
"# gestor-tareas" 
