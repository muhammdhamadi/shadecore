#pragma once

#ifdef _WIN32
  #define SPOUT_API __declspec(dllexport)
#else
  #define SPOUT_API
#endif

extern "C" {

// Returns 1 on success, 0 on failure.
SPOUT_API int spout_init_sender(const char* senderName, int width, int height);

// Send an OpenGL texture (GLuint) via Spout.
// invert = 1 if your texture is upside-down (common with FBOs), else 0.
SPOUT_API int spout_send_gl_texture(unsigned int glTexId, int width, int height, int invert);

// Optional: update sender name at runtime.
SPOUT_API int spout_set_sender_name(const char* senderName);

// Shut down and release resources.
SPOUT_API void spout_shutdown();

}
