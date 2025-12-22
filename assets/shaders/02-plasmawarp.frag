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

float fbm(vec2 p){
    float v = 0.0;
    float a = 0.9;
    for(int i=0;i<5;i++){
        v += a * sin(p.x)*cos(p.y);
        p = p*1.9 + vec2(1.7, -2.3);
        a *= 0.55;
    }
    return v;
}

void main(){
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;
    uv.x *= res.x / res.y;

    uv *= (1.0 / max(u_zoom, 0.0001));
    uv = rot(u_spin) * uv;

    float t = u_time;
    float k = clamp(u_gain, 0.0, 1.0);

    // domain warp
    vec2 p = uv * 2.0;
    float n1 = fbm(p + vec2(t*0.25, -t*0.18));
    float n2 = fbm(p.yx + vec2(-t*0.21, t*0.23));
    p += (0.35 + 0.65*k) * vec2(n1, n2);

    float v = 0.0;
    v += sin(p.x*2.2 + t*1.3);
    v += sin(p.y*2.0 - t*1.1);
    v += sin((p.x+p.y)*1.6 + t*0.9);
    v /= 3.0;

    float m = 0.5 + 0.5*v;
    m = pow(clamp(m,0.0,1.0), mix(1.6, 0.75, k));

    vec3 colA = vec3(0.05, 0.08, 0.12);
    vec3 colB = vec3(0.20 + 0.80*m, 0.10 + 0.90*(1.0-m), 0.25 + 0.75*sin(t*0.4 + m*3.0)*0.5 + 0.5);

    vec3 col = mix(colA, colB, 0.92);
    col += 0.15 * k * (0.5 + 0.5*sin(6.2831853*m + t));

    o_color = vec4(col, 1.0);
}
