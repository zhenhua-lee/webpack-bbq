const hash = require('./hash');

const getChunkNames = (location) => {
  const route = hash.get(location.pathname);
  const chunkNames = [];
  if (route.src === '/web/*') {
    chunkNames.push('web');
  }
  if (route.src === '/m/*') {
    chunkNames.push('m');
  }
  if (route.src === '/hare/*') {
    chunkNames.push('hare');
  }
  const peanut = location.pathname.split('/')[2];
  if (peanut === 'peanut' || peanut === 'peanut.html') {
    chunkNames.push('peanut');
  }
  return chunkNames;
}

export default getChunkNames;
