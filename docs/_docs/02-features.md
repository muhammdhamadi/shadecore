---
title: Features
order: 30
---

# Features

The engine is intentionally **low-level and explicit**:

- No GUI framework
- No WebView
- No runtime abstraction layer between your shader and the GPU

## What is it though?
- a **foundation** for custom shader-based tools,
- a **bridge** between GLSL and external control systems,
- a **standalone binary**, not a plugin locked into another host.

It is equally suited for live performance, installations, research tools, and experimental pipelines.

## Native features
- Native OpenGL rendering (via `glow`)
- Fullscreen GLSL fragment shader pipeline
- JSON-defined parameter schema
- MIDI control (CoreMIDI on macOS, cross-platform via `midir`)
- **Syphon server output** (macOS)
- **Spout2 sender output** (Windows)
- **FFmpeg streaming output** (RTSP / RTMP)
- **NDI output (separate run mode)**
- Vendored native dependencies (no system installs required)
- Deterministic build & runtime behavior

# Use Cases
- Live shader performance
- Visual instruments
- Generative installations
- Feedback-based video systems
- Custom GPU tools for OBS, Resolume, TouchDesigner pipelines
