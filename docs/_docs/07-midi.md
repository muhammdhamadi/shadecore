---
title: MIDI
order: 60
---

# MIDI 

Parameters are defined declaratively in JSON.

```json
{
  "version": 1,
  "params": [
    {
      "name": "speed",
      "ty": "float",
      "min": 0.0,
      "max": 5.0,
      "default": 1.0,
      "midi_cc": 1
    }
  ]
}
```

Behavior:

- MIDI CC values (0–127) are normalized
- Values are mapped into parameter ranges
- Parameters update every frame
- No hidden smoothing or automation

Controller layouts are portable and reproducible.
