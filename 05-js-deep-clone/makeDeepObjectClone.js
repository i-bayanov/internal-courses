export default function makeDeepObjectClone(obj) {
  const clone = Object.create(Object.getPrototypeOf(obj));

  Reflect.ownKeys(obj).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);

    if (typeof (descriptor.value) === 'object') {
      descriptor.value = makeDeepObjectClone(obj[key]);
    }

    if (typeof (descriptor.value) === 'function') {
      const keys = Reflect.ownKeys(descriptor.value);
      const methodDescriptors = Object.fromEntries(keys.map((item) => (
        [item, Object.getOwnPropertyDescriptor(descriptor.value, item)]
      )));

      Object.defineProperties(descriptor.value, methodDescriptors);
    }

    Object.defineProperty(clone, key, descriptor);
  });

  return clone;
}
