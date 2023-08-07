import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/1debcfcdee82f11b6875ed2f3acbe94d/raw/8e307d4729de2639263e6fee808b5cf68250387a/wijktypentabel.csv")
  return { data }
}

