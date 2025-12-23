---
title: Live Coding Model
order: 45
---

# Live Coding Model

`shadecore` supports a form of **contained live coding**.

Rather than embedding a text editor or visual node graph, the system is built
around three ideas:

1. **Shaders define structure**
2. **JSON defines intent**
3. **MIDI defines performance**

---

## Pre-declared Control Space

Parameters and MIDI bindings are declared ahead of time, even if they are not
immediately used.

This allows a performer to:

- run a shader with unused controls ready
- connect or reinterpret MIDI mappings mid-performance
- reshape behavior without restarting the engine

---

## Playing the Shader

Once running, a shader is not static:

- values are continuously mutable
- routing can change at runtime
- outputs can be reconfigured live
- the system behaves like an instrument, not a render job

This makes `shadecore` suitable for:

- live shader improvisation
- exploratory performance
- recorded sessions driven by real-time interaction

---

## Why This Is Still “Coding”

Although code edits happen outside the engine, the **structure of the system**
is manipulated live.

In this sense, `shadecore` treats live coding as:

> *the real-time negotiation of structure, behavior, and control — not only text input*
