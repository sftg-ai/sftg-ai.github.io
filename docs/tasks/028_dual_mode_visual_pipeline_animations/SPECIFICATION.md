# Task 028: Technical Specification — Dual-Mode Visual Pipeline

## 1. Архитектура компонентов

Создается отдельный подкомпонент или встроенная секция визуализации в `src/components/HeroScenarioAnalyzer.jsx`:
- `ProcessOscilloscope` — SVG-компонент бегущей волны импульсов.
- `TopologyCircuit` — SVG-компонент сетевой топологии узлов.

В состоянии `HeroScenarioAnalyzer`:
```javascript
const [visualMode, setVisualMode] = useState('oscilloscope'); // 'oscilloscope' | 'topology'
```
При запуске `handleRunAnalysis`:
```javascript
setVisualMode(Math.random() > 0.5 ? 'oscilloscope' : 'topology');
```

---

## 2. Спецификация Режима 1: `ProcessOscilloscope` (Осциллограф)
- **Контейнер:** Высота 56–64px, `w-full max-w-sm mx-auto`.
- **SVG ViewBox:** `0 0 360 60`.
- **Базовая ось:** Горизонтальная линия сетки `y = 30`, цвет `stroke-slate-200`, штриховка `strokeDasharray="4 4"`.
- **Сигнальная линия:** `path` с динамическим ЭКГ-паттерном:
  - В фазе сбора данных (шаги 0–2): ритмичный пульс с умеренной амплитудой.
  - В фазе вычислений (шаги 3–11): учащенный пульс с технологическими всплесками и высокой скоростью сдвига (`animation: pulseWave 1s linear infinite`).
  - На конце импульса — яркая точка сканирования `circle r="3" fill="#0284C7"`.

---

## 3. Спецификация Режима 2: `TopologyCircuit` (Сетевая топология)
- **Контейнер:** Высота 56–64px, `w-full max-w-sm mx-auto`.
- **4 узла на оси `y = 30`:**
  1. `x = 40`: Источник / Сайт (`Globe` / `Building`)
  2. `x = 130`: Реестры и данные (`Database` / `Layers`)
  3. `x = 220`: Учет и CRM (`1С / CRM` / `Cpu`)
  4. `x = 310`: Контур решений (`CheckCircle` / `Sparkles`)
- **Соединительные трассы:**
  - Отрезки между узлами: `stroke-slate-200 stroke-2`.
  - Активная линия соединений анимируется с заполнением `stroke-sky-600` по мере роста `analysisStep`:
    * Шаги 0–2: активен узел 1 и трасса 1 ➔ 2.
    * Шаги 3–6: активен узел 2 и трасса 2 ➔ 3.
    * Шаги 7–11: активен узел 3 и трасса 3 ➔ 4. Все узлы светятся и пульсируют.

---

## 4. UI/UX интеграция
- Заменяет собой вращающуюся иконку `Loader2` и полоску прогресс-бара.
- Под анимацией остается плавный текстовый лейбл с текущим действием:
  `{ANALYSIS_STEPS[analysisStep]?.text}`.
- Прогресс-бар заменяется на технологичный микроиндикатор процентов или тонкую подложку.
