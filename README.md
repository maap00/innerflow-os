# 🚀 InnerFlow OS

**Convertí tu disciplina en resultados medibles.**

InnerFlow OS es una app móvil enfocada en productividad, foco profundo y construcción de hábitos basada en datos reales de comportamiento.

---

# 🧠 Filosofía del producto

InnerFlow OS transforma:

* ⏱️ tiempo → en foco real
* 🎯 foco → en progreso medible
* 📊 progreso → en motivación y consistencia

No es un timer.
Es un sistema de comportamiento.

---

# ✨ Features actuales (MVP - Día 1 a Día 11)

## ⏱️ Timer inteligente (tipo Pomodoro flexible)

* Inicio de sesión ligado a hábito
* Duración dinámica (no fija)
* Auto-complete al alcanzar objetivo
* Auto-stop de sesión
* Pausa y reanudación real
* Control completo:

  * Iniciar
  * Pausar
  * Reanudar
  * Finalizar

---

## 🎯 Sistema de hábitos

* Crear hábitos con duración objetivo
* Seleccionar hábito activo
* Eliminar hábitos
* Asociación de sesiones a hábitos
* Progreso por hábito en tiempo real

---

## 🔥 Streaks

* Streak global
* Streak por hábito
* Incremento solo si se cumple objetivo
* Visualización en dashboard

---

## 📊 Dashboard inteligente

Resumen del día:

* ⏱️ Tiempo total enfocado hoy
* 🎯 Objetivo total diario
* 📈 % de progreso
* 🔥 Streak actual
* 💰 Puntos acumulados

---

## 🧾 Historial avanzado

* Sesiones agrupadas por día
* Orden descendente (más reciente primero)
* Fechas legibles
* Duración formateada
* Asociación con hábito

---

## 💰 Sistema de recompensa (base)

* Puntos por sesión real
* 1 punto = 1 minuto de foco
* No se premian sesiones cortas irrelevantes
* Persistencia de puntos
* Visualización en UI

---

## 💾 Persistencia local

Implementado con AsyncStorage:

* sesiones
* hábitos
* streak
* puntos

---

## 🧠 Arquitectura

* Estado global: Zustand
* UI: React Native + React Native Paper
* Persistencia: AsyncStorage
* Estructura modular:

src/

* components/
* screens/
* store/
* helpers/

---

## 🧩 Componentes clave

* Timer
* Dashboard
* Habit Card
* Session List

---

## 🧪 Estado actual

✔ MVP funcional
✔ UX usable
✔ lógica consistente
✔ base lista para escalar

---

# 🗺️ Roadmap

## 🔜 Próximos pasos

* Día 12 — Validación de hábito (anti-trampa)
* Sistema de verificación de sesiones
* Recompensas reales (cupones / beneficios)
* Backend (sync multi-device)
* Analytics avanzados
* Sistema de niveles
* Social / accountability

---

# 💡 Propuesta de valor

InnerFlow OS no mide productividad.

👉 La construye.

---

# 🛠️ Instalación

```bash
npm install
npx expo start
```

---

# 📦 Stack

* React Native (Expo)
* Zustand
* React Native Paper
* AsyncStorage

---

# 👨‍💻 Autor

Proyecto en desarrollo — InnerFlow OS

---

# ⚠️ Nota

Este proyecto está en fase MVP activa.
La arquitectura y features evolucionan diariamente.

---

# 🔥 Visión

Crear un sistema donde:

👉 el foco sea medible
👉 la disciplina sea visible
👉 el progreso sea inevitable
