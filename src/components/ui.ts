// Classes Tailwind repetidas em mais de uma tela.
export const eyebrow =
  'mb-[5px] text-xs font-extrabold tracking-[.12em] text-primary-dark'

export const errorBanner =
  'mb-[13px] flex items-center justify-between gap-3 rounded-[10px] border border-[#f1cecc] bg-[#fff1f0] px-3.5 py-3 text-[#7c3432]'

export const card =
  'rounded-[20px] border border-line bg-white px-[17px] py-5 shadow-[0_8px_30px_rgba(47,75,65,.05)] xs:p-[clamp(22px,5vw,42px)]'

export const backLink =
  'mb-[22px] inline-flex items-center gap-[7px] font-extrabold text-primary-dark'

export const fieldLabel = 'mb-[7px] block font-extrabold'

export const fieldInput =
  'w-full rounded-[10px] border border-[#cfdcd7] bg-white px-[13px] py-3 text-ink outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(88,123,109,.13)] aria-[invalid=true]:border-danger'

export const fieldError = 'mt-[5px] block text-[.82rem] font-bold text-danger'

const button =
  'inline-flex items-center justify-center gap-2 rounded-[11px] px-[17px] py-[11px] font-extrabold transition duration-200'

export const primaryButton = `${button} bg-primary text-white hover:-translate-y-px hover:bg-primary-dark disabled:cursor-wait disabled:opacity-65`

export const secondaryButton = `${button} border border-line bg-white text-primary-dark`
