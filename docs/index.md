---
layout: default
title: shadecore Documentation
---

<p align="center">
  <img width="45%" height="45%" src="https://github.com/schwwaaa/shadecore/blob/main/media/shadecore-logo.png?raw=true"/>  
</p>

<p align="center"><em>A native, high-performance GLSL rendering engine written in Rust, designed for real-time shader experimentation, hardware control, and live video routing.</em></p>

# Supported outputs
- **FBO texture** (local window)
- **Syphon** (macOS)
- **Spout2** (Windows)
- **FFmpeg streaming** (RTSP / RTMP)
- **NDI** (separate execution mode)

# Project Structure
---
```text
shadecore/
├─ src/
│  └─ main.rs              # Core engine loop
├─ native/
│  ├─ spout_bridge/        # C++ Spout2 bridge (Windows)
│  ├─ syphon_bridge.m      # Objective-C Syphon bridge (macOS)
│  └─ syphon_bridge.h
├─ vendor/
│  └─ Syphon.framework     # Vendored macOS framework
├─ assets/
│  ├─ params.json          # Parameters + MIDI schema
│  ├─ output.json          # Output routing & hotkeys
│  ├─ output_ndi.json      # NDI-specific configuration
│  └─ shaders/
│     ├─ default.frag
│     └─ present.frag
├─ build.rs                # Native linking & platform logic
└─ Cargo.toml
```

