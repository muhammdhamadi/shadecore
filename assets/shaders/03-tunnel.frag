#version 330 core
uniform float u_time;
uniform vec2  u_resolution;

uniform float u_gain;
uniform float u_zoom;
uniform float u_spin;

out vec4 o_color;

mat2 rot(float a){
    float s = sin(a), c = cos(a);
    return mat2(c,-s,s,c);
}

void main(){
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;
    uv.x *= res.x / res.y;

    // camera-ish controls via zoom/spin
    uv *= (1.0 / max(u_zoom, 0.0001));
    uv = rot(u_spin) * uv;

    float t = u_time;

    float r = length(uv);
    float a = atan(uv.y, uv.x);

    // Tunnel coordinates
    float z = 1.0 / max(r, 0.001);
    float bands = 0.5 + 0.5*sin(8.0*log(z) - t*2.5);
    float rings = 0.5 + 0.5*sin(16.0*r + t*1.8);
    float twist = 0.5 + 0.5*sin(6.0*a + t*1.3);

    float k = clamp(u_gain, 0.0, 1.0);
    float pat = mix(bands, bands*rings, 0.6) * mix(1.0, twist, 0.75);

    // Depth shading
    float vign = smoothstep(1.2, 0.2, r);
    float depth = clamp(z * 0.15, 0.0, 1.0);

    vec3 col1 = vec3(0.10, 0.15, 0.22);
    vec3 col2 = vec3(0.20 + 0.80*pat, 0.20 + 0.70*depth, 0.30 + 0.70*(1.0-pat));
    vec3 col3 = vec3(0.85*pat, 0.25 + 0.75*pat, 0.05 + 0.95*depth);

    vec3 col = mix(col1, mix(col2, col3, k), vign);
    col *= (0.65 + 0.35*vign);
    col += 0.15 * depth * k;

    o_color = vec4(col, 1.0);
}
