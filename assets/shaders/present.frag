#version 330 core
uniform sampler2D u_tex;

// Destination (window) size in pixels (set via set_u_resolution -> u_resolution)
uniform vec2 u_resolution;

// Source (render target) size in pixels
uniform vec2 u_src_resolution;

// 0=fit (letterbox), 1=fill (crop), 2=stretch, 3=pixel (centered, no scaling)
uniform int u_scale_mode;

out vec4 o_color;

void main() {
    vec2 dst = max(u_resolution, vec2(1.0));
    vec2 src = max(u_src_resolution, vec2(1.0));
    vec2 pxy = gl_FragCoord.xy;

    // Default: stretch (back-compat if u_src_resolution isn't set)
    vec2 uv = pxy / dst;

    // If source resolution is provided, do proper aspect handling.
    if (u_src_resolution.x > 0.5 && u_src_resolution.y > 0.5) {
        int mode = u_scale_mode;

        if (mode == 2) {
            // stretch
            uv = pxy / dst;
        } else {
            float s_fit  = min(dst.x / src.x, dst.y / src.y);
            float s_fill = max(dst.x / src.x, dst.y / src.y);
            float s = (mode == 1) ? s_fill : s_fit;

            // pixel (no scaling)
            if (mode == 3) s = 1.0;

            vec2 img = src * s;
            vec2 off = (dst - img) * 0.5;
            vec2 q = (pxy - off) / img; // normalized [0..1] over image

            if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0) {
                o_color = vec4(0.0, 0.0, 0.0, 1.0);
                return;
            }
            uv = q;
        }
    }

    o_color = texture(u_tex, uv);
}
