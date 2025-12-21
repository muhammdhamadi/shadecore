---
title: Overview
order: 10
---

<p align="center">
  <img width="45%" height="45%" src="https://github.com/schwwaaa/shadecore/blob/main/media/shadecore-logo.png?raw=true"/>  
</p>

<p align="center"><em>A native, high-performance GLSL rendering engine written in Rust, designed for real-time shader experimentation, hardware control, and live video routing.</em></p>

`shadecore` is intentionally **minimal, explicit, and opinionated**.

It does not try to be a framework.  
It does not hide the GPU.

It exists to give you **direct ownership of the rendering pipeline** and let the software grow into whatever tool you need. What you write in GLSL is what runs.

The engine is intentionally **low-level and explicit**:

- No GUI framework
- No WebView
- No runtime abstraction layer between your shader and the GPU

## What is it though?
- a **foundation** for custom shader-based tools,
- a **bridge** between GLSL and external control systems,
- a **standalone binary**, not a plugin locked into another host.

It is equally suited for live performance, installations, research tools, and experimental pipelines.

## Supported Output Formats
- Local window preview (always on)
- **Syphon** (macOS)
- **Spout2** (Windows)
- **FFmpeg streaming** (RTSP / RTMP)
- **NDI** (separate execution mode)

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

# Roadmap Ideas
- Shader hot-reloading
- Multi-pass rendering / feedback buffers
- `.app` / `.exe` packaging
- OSC / network control
- Expanded NDI configuration options

## License

MIT License.

If you use `shadecore` in a project, performance, installation, or tool,
attribution is appreciated but not required.
