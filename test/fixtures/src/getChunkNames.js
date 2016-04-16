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
  if (location.pathname.split('/')[2] === 'peanut') {
    chunkNames.push('peanut');
  }
  return chunkNames;
}

export default getChunkNames;
