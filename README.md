# Bsale-Pipedrive Backend

Este proyecto es un middleware desarrollado en **NestJS** y **TypeScript** que integra y sincroniza datos entre los sistemas Bsale y Pipedrive, facilitando la gestión de clientes y personas en ambas plataformas.

## Características principales

- **Sincronización de clientes** desde Bsale y almacenamiento en MongoDB.
- **Sincronización de personas** con Pipedrive, creando o actualizando registros según corresponda.
- **Persistencia de datos** en MongoDB usando Mongoose.
- **Estructura modular** y escalable basada en NestJS.

## Estructura del proyecto

- `src/client`: Lógica y entidades relacionadas con clientes de Bsale.
- `src/people`: Lógica y entidades relacionadas con personas y su sincronización con Pipedrive.
- `src/shared`: Servicios compartidos (ej: integración con APIs externas).
- `src/job/schedules`: Tareas programadas para sincronización automática.

## Instalación

```bash
# Clona el repositorio
git clone <url-del-repositorio>
cd Bsale-Pipedrive-Backend

# Instala dependencias
pnpm install
```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno y edítalo según tus credenciales:

```bash
cp .env.example .env
```

2. Completa los valores necesarios en `.env` para MongoDB, Bsale y Pipedrive.

## Uso

### Desarrollo

```bash
pnpm start:dev
```

### Producción

```bash
pnpm start:prod
```

### Sincronización manual

Puedes exponer endpoints o usar las tareas programadas para sincronizar clientes y personas.

### Sincronización automática

El sistema incluye tareas programadas (`cron`) que sincronizan automáticamente los datos entre Bsale y Pipedrive cada minuto.

## Pruebas

```bash
yarn test
```

## Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Pipedrive API](https://developers.pipedrive.com/docs/api/v1/)
- [Bsale API](https://api-docs.bsale.cl/)

## Estructura de Colecciones

- **clients**: Clientes provenientes de Bsale.
- **people**: Personas sincronizadas con Pipedrive (nombre pluralizado automáticamente por Mongoose).

## Contribuir

¡Las contribuciones son bienvenidas! Por favor abre un issue o un pull request.

## Licencia

> Proyecto desarrollado por Elianny Katiuska Bello Manzo 