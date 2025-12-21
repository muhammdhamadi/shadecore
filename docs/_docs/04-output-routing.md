---
title: Output Routing
order: 40
---


# Output Routing

`shadecore` always renders into an offscreen framebuffer (FBO). That framebuffer texture is:

- drawn to the local preview window (always on)
- optionally published or streamed via the selected output mode

The active output mode is controlled by `assets/output.json` (or an alternate output configuration file).

---

## Runtime Hotkeys (Default)

### `1` — Texture Only (Preview)

**What it does**
- Disables all external routing.
- Only the local preview window is active.

**When to use it**
- Debugging shaders and uniforms
- Verifying render correctness
- Performance testing
- Running without Syphon / Spout / FFmpeg / NDI dependencies

**Expected behavior**
- Lowest overhead
- Most deterministic execution
- No external consumers receive frames

---

### `2` — Syphon (macOS)

**What it does**
- Publishes the rendered OpenGL texture to a Syphon server.

**When to use it**
- Routing video into OBS (Syphon input)
- macOS-based visual tools such as Resolume, MadMapper, TouchDesigner, or VDMX
- Local, zero-copy GPU workflows

**Expected behavior**
- Very low latency
- GPU texture sharing (no encode, no network)
- macOS only

**Notes**
- Syphon server name is configurable in the output config.
- Local preview remains active.

---

### `3` — Spout2 (Windows)

**What it does**
- Publishes the rendered texture as a Spout2 sender.

**When to use it**
- OBS on Windows (Spout2 plugin)
- TouchDesigner, Resolume, or other Windows-based visual tools
- Local low-latency routing without encoding

**Expected behavior**
- Very low latency
- GPU texture sharing
- Windows only

**Notes**
- Sender name is configurable.
- Preview remains active.

---

### `4` — Stream (FFmpeg RTSP / RTMP)

**What it does**
- Spawns an FFmpeg process.
- Frames are encoded and streamed to a network endpoint.

**When to use it**
- Sending video to another machine
- Feeding RTSP/RTMP servers (e.g., mediamtx)
- Remote or headless workflows
- Software that expects a network stream

**Expected behavior**
- Higher CPU/GPU load due to encoding
- Higher latency than texture-sharing outputs
- Network-visible stream

**Common configuration fields**
- `stream.ffmpeg_path`
- `stream.url`
- codec, bitrate, preset, framerate, resolution

**Notes**
- Many encoders (e.g. H.264) require even-numbered frame dimensions.
- Preview remains active.

---

### `6` — NDI (Dedicated Mode)

**What it does**
- Sends frames to an NDI sender discoverable on the local network.

**Why NDI is separate**
- Requires a different runtime lifecycle
- Different threading and timing constraints
- Kept out of the core render loop intentionally

**When to use it**
- OBS NDI input workflows
- LAN-based video routing with automatic discovery
- Multi-machine studio setups

**Expected behavior**
- Network-based video transport
- Higher overhead than Syphon/Spout
- Easier discovery than RTSP in many setups

**Notes**
- Typically run via a dedicated feature or binary.
- Uses its own output configuration (e.g. `output_ndi.json`).
- Preview behavior depends on NDI mode configuration.

---

## Hotkey Configuration

Hotkeys are defined in the output configuration JSON. This allows:

- Rebinding keys without recompiling
- Platform-specific key maps
- Separate configs per output mode

This design keeps routing logic declarative and reproducible.
