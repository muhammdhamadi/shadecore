#version 330 core

uniform vec2  uResolution;
uniform vec2  uMouse;
uniform float uTime;

out vec4 FragColor;

#define PI 3.14159265359

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.02, pct, st.y) -
           smoothstep(pct, pct + 0.02, st.y);
}

uniform float u_gain;
uniform float u_zoom;
uniform float u_spin;

void main() {
    // Use provided resolution; fall back if unset.
    vec2 res = uResolution;
    if (res.x <= 0.0 || res.y <= 0.0) {
        res = vec2(640.0, 480.0);
    }

    vec2 st = gl_FragCoord.xy / res;
    st -= 0.5;
    st *= 12.0;

    float pct2 = distance(st, vec2(0.5));

    float y3 = sin(cos((st.y) * (0.10))) - sin(st.x + st.y * 2.2);

    float y = smoothstep(
                10.2 - (sin(y3) * (cos(pct2 / -2.2))),
                0.5,
                st.x
              )
            - smoothstep(0.5, 0.1, (st.x * 0.2)) * (sin(st.x - (uTime * 0.0412)*u_gain));

    float y2 = smoothstep(0.91, 3.5, st.y + st.x)
             - smoothstep(0.1, 0.18, st.y);

    vec3 colorA = vec3(y * y2) * (y3 - 0.14) * (sin(st.x - (uTime * 0.0412)*u_zoom));
    colorA = (1.0) * colorA * vec3(
        0.20 * (sin((y3 - y)) * (cos(pct2 / -2.2))),
        0.20,
        (0.0 + sin(y3))
    );

    float y4 = cos(cos((st.x) * (0.13) * sin(0.3)));
    float y5 = smoothstep(0.2, 0.5, 0.3) - smoothstep(0.25, 0.31, (st.y * 2.12));
    float y6 = smoothstep(0.1, 0.15, st.y + cos(st.y))
             - smoothstep(0.141, 0.91, st.x + st.y) * (sin(st.x - (uTime * 0.0512)));

    vec3 colorB = vec3(y4 + y5) - (y3 * 0.13) * (sin(st.x - (uTime * 0.0692)));
    colorB = (1.0) * colorB * vec3(3.920, 0.030, (0.20 - y6)) * (sin(st.x - (uTime * 0.0412)*u_spin));

    vec2 bl = step(vec2(0.5), st);
    float pct = bl.x * bl.y;

    vec3 colorMix = mix(colorA, colorB + 0.92, (sin((y6 - y2)) * (cos(pct2 / -2.2))));

    FragColor = vec4(colorMix, 1.0);
}
