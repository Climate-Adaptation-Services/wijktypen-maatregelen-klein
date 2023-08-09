import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/cc686403cac0af687772c1c6ab22c323/raw/1fcb5d2bb81f9813bfaabf80d49b12074b978972/kleine-ingrepen.csv")
  return { data }
}

