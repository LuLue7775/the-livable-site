
module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/components/**/*.js',
    './pages/**/*.js'
  ],
  theme: {
    textFillColor: theme => theme('borderColor'),
    textStrokeWidth: theme => theme('borderWidth'),
    textStrokeColor: theme => theme('borderColor'),

    extend: {
      colors : {
        'subcat-bg0': '#e2e4e0',
        'subcat-bg1': '#e0cfc4',
        'subcat-bg2': '#cedae2',
      },
      fontFamily: {
        'serif-ch':["'Noto Serif TC', 'ui-serif', 'Georgia',  serif"],
        'serif':["'Playfair Display', 'ui-serif', 'Georgia',  serif"],
        'body': ["'Cormorant Garamond', 'ui-serif', serif "],
        'minor':["'Josefin Slab', 'ui-monospace', 'SFMono-Regular' "]
       },
      maxHeight:{
        '160px': '160px',
        '60px': '60px',
        '3/2':'150vh'
      },
      maxWidth:{
        'xxs':'6rem',
        '300px': '300px',
        '150px': '150px',
        '1/2': '50vw',
        'reset-screen': 'calc(100vw - (100vw - 100%))',

      },
      height: {
        '0':'0px',
        '64px': '64px',
        '100px':'100px',
        '160px':'160px',
        'almost-screen': 'calc(-16rem + 100vh)',
        '308px': '19.25rem',
        '300px':'300px',
        '302px':'302px',
        '400px':'400px',
        '502px':'502px',
        '600px':'600px',
        '700px':'700px',
        '1/4': '25vh',
        '1/3': '33vh',
        '1/2': '50vh',
        'reset-screen': 'calc(100vh - (100vh - 100%))',
        '3/5': '60vh',
        '4/5':'80vh'
      },
      width: {
        '64px': '64px',
        '100px': '100px',
        '120px': '120px',
        '160px': '160px',
        '200px': '200px',
        '300px': '300px',
        '308px': '19.25rem',
        '600px': '37.5rem',
        '400px': '400px',
        '450px': '450px',
        '550px': '550px',
        '600px': '600px',
        '700px': '700px',
        '900px': '900px',
        '1/5': '20vw',
        '1/4': '25vw',
        '1/3': '33vw',
        '1/2': '50vw',
        '60':'15rem',
        '4/5':'80vw',
        '5/4': '125vw',
        '200vw': '200vw',
        '500vw': '500vw',
        '900vw': '900vw',
        '1000vw': '1000vw',
        'reset-screen': 'calc(100vw - (100vw - 100%))',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
       '3': '3px',
        '4': '4px',
      },
      margin: {
        '60': '15rem',
       },
      fontSize: {
        'xs': ['0.7rem', {letterSpacing: '0.08em', lineHeight: '1.2rem', }],
        'sm':  ['0.7rem', {letterSpacing: '0.07em', lineHeight: '1.7rem', }],
        'base': ['1rem', {letterSpacing: '0.07em', lineHeight: '1.8rem', }],
        'lg': ['1.125rem', {letterSpacing: '0.05em', lineHeight: '2rem', }],
        'xl': ['1.5rem', {letterSpacing: '0.06em', lineHeight: '2rem' }],
        '2xl': ['2rem', {letterSpacing: '0.06em', lineHeight: '3rem' }],
        '2.5xl': ['2rem' ],
        '3xl': ['2.5rem', {letterSpacing: '0.1em', lineHeight: '4rem' }],
        '6.5xl': ['3rem', {letterSpacing: '0.09em', lineHeight: '5rem' }],
        '6.5xl': ['4rem', {letterSpacing: '0.09em', lineHeight: '5rem' }],
        '7xl': '5rem',
        '8xl': ['6rem', {letterSpacing: '0.1em', lineHeight: '8rem' }],
        '9xl': ['8rem', {letterSpacing: '0.1em', lineHeight: '8rem' }],    
        '9.5xl': ['8rem', {letterSpacing: '0.01em', lineHeight: '6rem' }],    
        '10xl': ['10rem', {letterSpacing: '0.01em', lineHeight: '6rem' }],    
        '12xl': ['14rem', {letterSpacing: '0.01em', lineHeight: '6rem' }],    

      },
      inset: {
          'sub': '-9rem',
          'sub-sm': '-6rem',
          'cart': 'calc(-9rem + 100vh)',
          '1/2screen':'50vw',
          '1/10': '10%', 
          '1/7': '14.2%', 
          '1/5': '20%',
          '1/4': '25%',  
          '3/10': '30%',  
          '1/3': '33.333333%',
          '2/5': '40%',
          '9/20': '45%',
          '-1/2': '-50%',        
          '1/2': '50%',
          '3/5': '60%',
          '1/6': '66.666667%',
          '3/4': '75%',
          '4/5': '80%',
          '-full':'-100%',
          'full':'100%',
          '-4': '-1rem',
          '-16': '-4rem',
          px: '1px',
          '100px':'100px',
          0: '0',
          0.5: '0.125rem',
          1: '0.25rem',
          1.5: '0.375rem',
          2: '0.5rem',
          2.5: '0.625rem',
          3: '0.75rem',
          3.5: '0.875rem',
          4: '1rem',
          5: '1.25rem',
          6: '1.5rem',
          7: '1.75rem',
          8: '2rem',
          9: '2.25rem',
          10: '2.5rem',
          11: '2.75rem',
          12: '3rem',
          14: '3.5rem',
          16: '4rem',
          20: '5rem',
          24: '6rem',
          28: '7rem',
          32: '8rem',
          36: '9rem',
          40: '10rem',
          44: '11rem',
          48: '12rem',
          52: '13rem',
          56: '14rem',
          60: '15rem',
          64: '16rem',
          72: '18rem',
          80: '20rem',
          96: '24rem',    
      },
      opacity: {
        '0': '0',
       '25': '.25',
       '50': '.5',
       '75': '.75',
       '10': '.1',
       '20': '.2',
       '30': '.3',
       '40': '.4',
       '50': '.5',
       '60': '.6',
       '70': '.7',
       '80': '.8',
       '90': '.9',
        '100': '1',
      },
      zIndex : {
        '60' : 60,
        '70' : 70,
        '80' : 80,
        '-10': '-10',
      },

      gridTemplateColumns: {
        'input': 'repeat(4, minmax(0, 50px))',
        'cart': 'repeat(3, minmax(200px, 300px))',
      },
      transitionProperty: {
        'translate':'translate',
        'height': 'height',
        'spacing': 'margin, padding',
        'rounded-none':'rounded-none',
        'rounded-tl-full':'rounded-tl-full',

       },
       translate: {
        '1/4': '25%;',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '3/2': '150%',
       }
       
    },
  },
  variants: { 
    fontFamily: ['hover', 'focus'],
    opacity: ['hover','active'],
    backgroundImage: [ 'hover', 'focus'],
    backgroundOpacity: ['group-hover', 'hover', 'focus'],
    isolation: ['hover', 'focus'],
    mixBlendMode: ['hover', 'focus'],
    textDecoration: ['active'],
    textStrokeColor: ['responsive','group-hover','hover'],
    textStrokeWidth: ['responsive','group-hover','hover'],
    textFillColor: ['responsive','group-hover','hover'],
    textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    
    divideColor: ['group-hover'],
    borderColor: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textColor: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    justifyContent: ['hover', 'focus'],
    borderRadius: ['hover', 'focus'],
    objectFit: ['hover', 'focus'],
    borderStyle: ['hover', 'focus'],
    borderWidth: ['hover', 'focus'],
    transitionProperty: ['hover', 'focus'],
    fontSize: ['responsive', 'hover'],
    objectPosition: ['responsive'],
    position: ['hover', 'focus','responsive'],
    zIndex: ['hover', 'active'],
    
    animation: ['group-hover', 'hover', 'responsive', 'motion-safe', 'motion-reduce'],
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    transitionDelay: ['responsive'],
    transitionDuration: ['responsive'],
    transitionProperty: ['responsive'],
    transitionTimingFunction: ['responsive'],
    translate: ['responsive', 'active', 'group-hover', 'hover', 'focus'],
    wordBreak: ['hover', 'focus'],
    overflow: ['hover', 'focus'],
  },
  plugins: [
    require( 'tailwindcss' ),
    require( 'precss' ),
    require( 'autoprefixer' ),
    require('tailwindcss-text-fill-stroke')(), // no options to configure

  ]
}
