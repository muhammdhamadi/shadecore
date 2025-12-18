// native/spout_bridge/spout_bridge.cpp
#include "spout_bridge.h"

// Spout2 SDK header (vendored into this repo)
// Expected path:
//   native/spout2/SPOUTSDK/SpoutGL/SpoutSender.h
#include "SpoutSender.h"

static SpoutSender g_sender;
static bool g_inited = false;

extern "C" {

int spout_init_sender(const char* senderName, int width, int height) {
  if (!senderName || width <= 0 || height <= 0) return 0;
  g_inited = g_sender.CreateSender(senderName, width, height);
  return g_inited ? 1 : 0;
}

int spout_set_sender_name(const char* senderName) {
  if (!g_inited || !senderName) return 0;

  // Some Spout2 SDK versions expose SetSenderName.
  // If yours does not, replace this implementation with:
  //   g_sender.ReleaseSender();
  //   g_inited = g_sender.CreateSender(senderName, currentW, currentH);
  return g_sender.SetSenderName(senderName) ? 1 : 0;
}

int spout_send_gl_texture(unsigned int glTexId, int width, int height, int invert) {
  if (!g_inited || glTexId == 0 || width <= 0 || height <= 0) return 0;

  // GL_TEXTURE_2D = 0x0DE1
  const unsigned int GL_TEXTURE_2D = 0x0DE1;

  bool ok = g_sender.SendTexture(
    glTexId,
    GL_TEXTURE_2D,
    (unsigned int)width,
    (unsigned int)height,
    invert != 0
  );

  return ok ? 1 : 0;
}

void spout_shutdown() {
  if (g_inited) {
    g_sender.ReleaseSender();
    g_inited = false;
  }
}

} // extern "C"
