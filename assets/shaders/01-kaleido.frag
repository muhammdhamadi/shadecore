#version 330 core

uniform vec2  uResolution;
uniform vec2  uMouse;

// Time variants (host might be setting one of these instead of uTime)
uniform float uTime;
uniform float u_time;
uniform float iTime;
uniform float time;

uniform float u_gain;
uniform float u_zoom;
uniform float u_spin;

out vec4 FragColor;

#define PI 3.14159265359

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.02, pct, st.y) -
           smoothstep(pct, pct + 0.02, st.y);
}

float getTime() {
    // Pick whichever is non-zero. If *all* are zero, time is not being uploaded at all.
    return max(max(uTime, u_time), max(iTime, time));
}

void main() {
    vec2 res = uResolution;
    if (res.x <= 0.0 || res.y <= 0.0) res = vec2(640.0, 480.0);

    float t = getTime();

    vec2 st = gl_FragCoord.xy / res;

    st -= 0.5 * cos(0.32);
    st *= 12.0;

    float pct2 = distance(st, vec2(0.5));

    float y3 = sin(cos((st.y) * (5.10))) * -sin(st.x * 3.12)
             - sin(-cos((-st.x) * (-2.10))) * sin(st.x * -0.12);

    float y  = smoothstep(1.2, 0.5, st.x);
    float y2 = smoothstep(1.1, 0.5, st.x);

    vec3 colorA = vec3(y * y2) * (y3 * (sin(t * 0.030)));
    colorA = (1.0) * colorA * vec3(0.290, 0.920, (1.0 + sin(y3 + sin(t * 0.0))));

    float y4 = cos(cos((st.y + -st.x) * (sin(t * 0.0)) * cos(0.43 * st.x + st.y)));

    float y5 = smoothstep(0.9, 0.295, (st.x += st.y + cos(st.x * -st.y))) *
               smoothstep(0.4, 0.1, st.x * st.y);

    float y6 = (smoothstep(0.1, 0.8915, -st.y * cos((-st.x * st.y))) *
                smoothstep(0.4, 0.091, st.y - st.x)) *
               smoothstep(0.151, 0.915, st.y / cos(st.x * st.y))
             - smoothstep(0.14, 0.91, (st.y += st.x));

    vec3 colorB = (vec3((y4 + y5) * st.y + st.x)) +
                  (y3 * 0.913) * (vec3(-y4 - y5) * (-y3 + (0.23 + (st.y * st.x))));

    vec3 term1 = colorB * vec3(0.4755, 0.347, (-1.20 + (y6 + (st.y * st.x))));
    st.y = -st.x; // preserve original embedded assignment side-effect
    vec3 term2 = colorB * vec3(-0.15, -0.147, (1.20 - (-y6 - st.y)));
    colorB = term1 - term2;

    float y7 = (cos(cos(st.x * y2)) * cos(cos(-st.x * y2)) -
                (cos(cos(st.y * -y2)) * cos(cos(-st.y * y2))));

    vec2 bl = step(vec2(0.5), (st + y7)) * step(vec2(-0.5), (-st - y7));
    float pct = bl.x * bl.y;

    vec3 colorMix = mix(
        colorA + sin(t * 0.010),
        colorB + sin(t * 0.0300),
        (sin(
            ((y6 * y2 + (st.y * st.x)) * 0.0174) -
            sin(0.540 + ((-y6 * y2 + (st.y += st.x)) * 3.74)) +
            sin(cos((pct2 * -0.92) + st.x * st.y) * 0.0041)
        )) *
        (-sin(
            0.20 -
            ((-y6 * y2 * (-st.y * st.x)) * -0.174) +
            sin(((y6 - y2 - st.y) * -0.74)) +
            sin(cos(-pct2 * 0.92))
        ))
    );

    FragColor = vec4(colorMix, 1.0);
}
