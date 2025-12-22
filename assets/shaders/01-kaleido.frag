#version 330 core
uniform float u_time;
uniform vec2  u_resolution;

uniform float u_gain; // 0..1 (use as intensity)
uniform float u_zoom; // 0.25..4
uniform float u_spin; // -pi..pi

out vec4 o_color;

mat2 rot(float a){
    float s = sin(a), c = cos(a);
    return mat2(c,-s,s,c);
}

float hash21(vec2 p){
    p = fract(p*vec2(123.34, 456.21));
    p += dot(p, p+45.32);
    return fract(p.x*p.y);
}

float vnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i+vec2(1,0));
    float c = hash21(i+vec2(0,1));
    float d = hash21(i+vec2(1,1));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

void main(){
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;
    uv.x *= res.x / res.y;

    uv *= (1.0 / max(u_zoom, 0.0001));
    uv = rot(u_spin) * uv;

    // Kaleidoscope fold
    float t = u_time;
    float ang = atan(uv.y, uv.x);
    float r = length(uv);
    float n = 6.0;                       // number of wedges
    float sector = 6.2831853 / n;
    ang = abs(mod(ang + sector*0.5, sector) - sector*0.5);

    vec2 ku = vec2(cos(ang), sin(ang)) * r;

    // Domain-warped stripes
    float warp = vnoise(ku*2.5 + t*0.3) * 0.8;
    float stripes = 0.5 + 0.5 * sin(10.0*ku.x + 8.0*warp - t*2.0);

    float glow = exp(-2.5*r);
    float k = clamp(u_gain, 0.0, 1.0);

    vec3 base = vec3(0.10, 0.12, 0.16);
    vec3 colA = vec3(0.20 + 0.80*stripes, 0.35 + 0.65*glow, 0.55 + 0.45*(1.0-stripes));
    vec3 colB = vec3(0.90*glow, 0.25 + 0.75*stripes, 0.15 + 0.85*glow);

    vec3 col = mix(base + colA, colB, k);
    col += 0.25 * glow * k;

    o_color = vec4(col, 1.0);
}
