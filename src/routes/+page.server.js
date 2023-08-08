import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/cc686403cac0af687772c1c6ab22c323/raw/e3933d5e7b3679708bcac37ea4aea8af52f86949/kleine-ingrepen.csv")
  return { data }
}

