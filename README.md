# Bsale-Pipedrive Backend

Este proyecto es un middleware desarrollado en **NestJS** y **TypeScript** que integra y sincroniza datos entre los sistemas Bsale y Pipedrive, facilitando la gestión de clientes y personas en ambas plataformas.

---

## 🚀 Características principales

- **Sincronización automática** de clientes desde Bsale y personas en Pipedrive.
- **Persistencia de datos** en MongoDB usando Mongoose.
- **Estructura modular** y escalable basada en NestJS.
- **Tareas programadas (cron)** para mantener los datos actualizados sin intervención manual.
- **Logs detallados** para monitoreo y depuración.

---

## 📁 Estructura del proyecto

- `src/client`: Lógica y entidades relacionadas con clientes de Bsale.
- `src/people`: Lógica y entidades relacionadas con personas y su sincronización con Pipedrive.
- `src/shared`: Servicios compartidos (ej: integración con APIs externas).
- `src/job/schedules`: Tareas programadas para sincronización automática.

---

## ⚙️ Instalación

```bash
# Clona el repositorio
git clone <url-del-repositorio>
cd Bsale-Pipedrive-Backend

# Instala dependencias (elige uno)
pnpm install
# o
yarn install
```

---

## 🛠️ Configuración

1. Copia el archivo de ejemplo de variables de entorno y edítalo según tus credenciales:

```bash
cp .env.example .env
```

2. Completa los valores necesarios en `.env` para la conexión a MongoDB.

> ⚠️ **Importante:**  
> Los tokens de acceso para Bsale y Pipedrive **no se configuran en el archivo `.env`**, sino que se almacenan y gestionan directamente en la base de datos.  
> El sistema obtiene estos tokens automáticamente según sea necesario.

---

## ▶️ Uso

### Desarrollo

```bash
pnpm start:dev
# o
yarn start:dev
```

### Producción

```bash
pnpm start:prod
# o
yarn start:prod
```

---

### 🔄 Sincronización automática

El sistema incluye tareas programadas (`cron`) que sincronizan automáticamente los datos entre Bsale y Pipedrive cada día a medianoche.

---

## 🧰 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Pipedrive API](https://developers.pipedrive.com/docs/api/v1/)
- [Bsale API](https://api-docs.bsale.cl/)

---

## 🗂️ Estructura de Colecciones

- **clients**: Clientes provenientes de Bsale.
- **people**: Personas sincronizadas con Pipedrive (nombre pluralizado automáticamente por Mongoose).

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!  
Por favor abre un issue o un pull request para sugerencias, mejoras o reportar errores.

---

## 📄 Licencia
> Proyecto desarrollado por Elianny Katiuska Bello Manzo