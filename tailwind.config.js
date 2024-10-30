export const content = ['./src/**/*.{js,ts,jsx,tsx}'];

export const theme = {
  extend: {
    fontFamily: {
      primary: '',
      secondary: 'Merriweather Sans Light',
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['Open Sans'],
      temperature: ['Gotham'],
    },
    colors: {
      primary: {
        deepBlue: '#1c4f7e',
        azureBlue: '#1d91e8',
        yellowEffect: '#f7f7f7',
        pinkEffect: '#eef0ff',
        whiteEffect: '#f8f8ff',
      },
      secondary: {
        coralPink: '#ff5984',
        lemonYellow: '#ffd023',
      },
      gradientCustom:
        'radial-gradient(ellipse at 47% 0%, #000000 0%, #000000 66%, #0D83B5 76%, #00BCF4 84%, #0FC8FF 91%, #00F6FF 100%)',
    },
    boxShadow: {
      whiteShadow: '-5px -1px 34px 18px #E4E4E4',
      fullShadow: '0 0 27.36px 0 rgba(0, 0, 0, 0.3)',
      primary:
        'inset -50px 100px 100px 66px #ffffff24, 0px 100px 100px -80px #000000',
    },
    animation: {
      aurora: 'aurora 60s linear infinite',
      'meteor-effect': 'meteor 5s linear infinite',
      'caret-blink': 'caret-blink 1.25s ease-out infinite',
    },
    keyframes: {
      aurora: {
        from: {
          backgroundPosition: '50% 50%, 50% 50%',
        },
        to: {
          backgroundPosition: '350% 50%, 350% 50%',
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      meteor: {
        '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
        '70%': { opacity: '1' },
        '100%': {
          transform: 'rotate(215deg) translateX(-500px)',
          opacity: '0',
        },
      },
    },
  },
};

export const plugins = [];
