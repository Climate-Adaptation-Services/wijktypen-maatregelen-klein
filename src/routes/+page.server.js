import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/cc686403cac0af687772c1c6ab22c323/raw/835faddd2292e41e535108816a771862151e23c3/kleine-ingrepen.csv")
  return { data }
}

