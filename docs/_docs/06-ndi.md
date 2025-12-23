---
title: NDI
order: 50
---

# NDI

NDI is **not enabled in the default execution path**. This is intentional.

## Why NDI Is Separate

NDI requires:

- a different runtime lifecycle,
- different threading assumptions,
- tighter timing guarantees.

Rather than complicate the core render loop, NDI runs in a **dedicated execution mode**.

## Running with NDI

Depending on the active build configuration:

```bash
cargo run --features ndi
```

or

```bash
cargo run --bin shadecore-ndi
```

Check `Cargo.toml` for the active NDI configuration.

## Notes

- NDI output is discoverable by OBS, Resolume, and other NDI-capable software
- Local preview still runs unless explicitly disabled
- NDI uses its own output configuration file

This separation is **by design**, not a limitation.
