export const GA_MEASUREMENT_ID = 'G-2Z63VV01ES' // Replace with your GA ID

declare global {
    interface Window {
        gtag: any
    }
}

export const pageview = (url:string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}