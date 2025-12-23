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

vec2 hash22(vec2 p){
    // cheap 2D hash
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return fract(sin(p)*43758.5453);
}

float voronoi(vec2 x, out vec2 cell, out float edge){
    vec2 n = floor(x);
    vec2 f = fract(x);

    float md = 1e9;
    float md2 = 1e9;
    vec2  mr = vec2(0.0);

    for(int j=-1;j<=1;j++){
        for(int i=-1;i<=1;i++){
            vec2 g = vec2(i,j);
            vec2 o = hash22(n + g);
            // animate points a bit
            o = 0.5 + 0.5*sin(6.2831853*(o + 0.12*u_time));
            vec2 r = g + o - f;
            float d = dot(r,r);
            if(d < md){
                md2 = md;
                md = d;
                mr = r;
            } else if(d < md2){
                md2 = d;
            }
        }
    }

    cell = mr;
    edge = md2 - md; // distance to edge-ish
    return md;
}

void main(){
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;
    uv.x *= res.x / res.y;

    uv *= (1.0 / max(u_zoom, 0.0001));
    uv = rot(u_spin) * uv;

    float k = clamp(u_gain, 0.0, 1.0);

    // scale up for cells
    vec2 p = uv * 3.0;
    vec2 cell;
    float edge;
    float d = voronoi(p, cell, edge);

    float dist = sqrt(d);
    float e = clamp(edge*6.0, 0.0, 1.0);

    // cell interior pattern using cell vector
    float interior = 0.5 + 0.5*sin(8.0*dot(cell, vec2(1.2, -0.9)) + u_time*2.0);

    // outlines
    float outline = smoothstep(0.02, 0.12, e);
    outline = 1.0 - outline;

    vec3 a = vec3(0.08, 0.10, 0.14);
    vec3 b = vec3(0.25 + 0.75*interior, 0.20 + 0.80*(1.0-dist), 0.35 + 0.65*(1.0-interior));
    vec3 c = vec3(0.95, 0.35, 0.10);

    vec3 col = mix(a, b, 0.85);
    col = mix(col, c, outline * (0.2 + 0.8*k));
    col *= (0.7 + 0.3*(1.0 - dist));
    col += 0.15 * outline;

    o_color = vec4(col, 1.0);
}
