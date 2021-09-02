import { csvParse, autoType } from 'd3-dsv';

export async function getData(url) {
  let response = await fetch(url);
  let string = await response.text();
	let data = await csvParse(string, autoType);
  return data;
}

export function suffixer(int) {
  let mod = Math.round(int) % 10;
  return mod == 1 ? 'st' : mod == 2 ? 'nd' : mod == 3 ? 'rd' : 'th';
}

export function changeClass(val) {
  return val > 0 ? 'increase' : val < 0 ? 'decrease' : 'nochange';
}

export function changeStr(val, suffix = '', decimals = 0) {
  return val != 0 ? Math.abs(val).toFixed(decimals) + suffix : suffix == 'pp' ? 'n/c' : 'no change';
}

export function adjectify(count, rank, words = ['higher', 'lower']) {
  let breaks = [
    count * 0.2,
    count * 0.4,
    count * 0.6,
    count * 0.8
  ];
  if (rank < breaks[0]) {
    return `Much ${words[0]} than`;
  } else if (rank < breaks[1]) {
    return `Slightly ${words[0]} than`;
  } else if (rank < breaks[2]) {
    return `Close to`;
  } else if (rank < breaks[3]) {
    return `Slightly ${words[1]} than`;
  } else {
    return `Much ${words[1]} than`;
  }
}