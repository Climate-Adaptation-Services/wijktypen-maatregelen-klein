import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/cc686403cac0af687772c1c6ab22c323/raw/8a00e9156c2e01878e90aafd5dd4347a65fc3fbb/kleine-ingrepen.csv")
  return { data }
}

