const env = process.features;

/**
 *
 *
 * @param {NodeJS.Process['features']} env
 * @return {*} 
 */
function main(env) {
  // skipcq: JS-0002
  console.dir(env);
  return;
}

main(env);
