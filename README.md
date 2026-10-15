# Finanzas

App móvil de finanzas personales (`com.financeapp.mobile`, v1.0.0) hecha con **React + Capacitor**.
Maneja cuentas, categorías con presupuesto, movimientos, ahorros, transferencias, PIN, respaldo/restauración y gráficos. Moneda por defecto: COP.

> ⚠️ **Este repositorio fue reconstruido a partir del APK**, no del proyecto original.
> Un APK no contiene el código fuente (TypeScript/JSX, CSS por módulos, `package.json`, etc.); contiene el resultado compilado y minificado por Vite.
> Aquí está todo lo que se puede recuperar de él.

## Estructura

| Ruta | Qué es |
|---|---|
| `www/` | App web **completa y funcional** tal como va dentro del APK (HTML, JS minificado, CSS, fuentes, icono). Es lo que Capacitor empaqueta. |
| `recuperado/logica-app.js` | Lógica de tu app (modelos, categorías por defecto, store, validación de respaldos, fechas, formato de moneda), des-minificada y formateada. |
| `recuperado/interfaz-app.js` | Pantallas y componentes React (JSX compilado a `d.jsx(...)`), gráficos y login por PIN, formateados. |
| `recuperado/completo/` | Bundles completos formateados (incluye librerías: React, framer-motion, Chart.js, lucide). Solo de consulta. |
| `capacitor.config.json` | Config original de Capacitor (`webDir` ajustado a `www`). |
| `package.json` | Dependencias de Capacitor reconstruidas desde `capacitor.plugins.json` del APK. |

Lo recuperado en `recuperado/` es **solo de lectura/referencia**: los nombres de variables locales quedaron acortados (`e`, `t`, `s`…), pero conserva propiedades, textos en español y la estructura.

## Ejecutar / generar el APK de nuevo

```bash
npm install
npx cap add android      # genera el proyecto Android (carpeta android/)
npx cap sync android     # copia www/ dentro de Android
npx cap open android     # abre Android Studio -> Build > Build APK
```

Probar en navegador: `npm run serve`.

Plugins nativos usados: App, Filesystem, Haptics, Preferences, Share, Splash Screen, Status Bar.
Permisos Android: `INTERNET`, `VIBRATE`.

## Si tienes el proyecto original

Si aún conservas la carpeta del proyecto (con `src/`, `vite.config.ts`, `android/`) en tu computador, **sube esa** en lugar de este repositorio: es el código real, legible y mantenible.
