// Logo Import
import logo from '@src/assets/images/logo/logo.svg'

// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: 'Panta',
    //logo
    appLogoImage: logo
  },
  layout: {
    isRTL: true,
    skin: 'light', // light, dark, bordered, semi-dark
    type: 'horizontal', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    
    menu: {
      isHidden: false,
      isCollapsed: true
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'static', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc],
      
    },
    footer: {
      type: 'static' // static, sticky, hidden
    },
    customizer: true,
    scrollTop: true, // Enable scroll to top button
    toastPosition: 'top-right' // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  }
}

export default themeConfig
