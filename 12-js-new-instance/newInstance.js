export default function newInstance(constructor, args) {
  const instance = Object.create(constructor.prototype);
  let constructorReturnValue = constructor.apply(instance, args);

  if (typeof constructorReturnValue !== 'object' && constructorReturnValue !== 'function') {
    constructorReturnValue = false;
  }

  return constructorReturnValue || instance;
}
